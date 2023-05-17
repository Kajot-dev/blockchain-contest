import ApiError from "@/scripts/ApiError";
import FormError from "@/scripts/FormError";
import { NFTStorage, File } from "nft.storage";
import multer, { MulterError } from "multer";
import { createRouter, expressWrapper } from "next-connect";

const acceptedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
const nftStorageClient = new NFTStorage({
  token: process.env.NFT_STORAGE_API_KEY,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const multerUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB
  },
  fileFilter: (req, file, cb) => {
    if (!acceptedMimeTypes.includes(file.mimetype)) {
      cb(new FormError("image", "Invalid file type"));
    } else {
      cb(null, true);
    }
  },
});

const router = createRouter();

router.post(expressWrapper(multerUpload.single("image")));

/**
 * Needed fields for FormData:
 * - name -> text
 * - symbol -> text
 * - image -> file
 */
const validTextFields = ["name", "symbol", "variant"];

router.post(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "No file uploaded! File must be named 'image'");
  }

  if (!req.body) {
    throw new ApiError(400, "No form data!");
  }

  //validate form fields
  for (const fieldName in req.body) {
    if (!validTextFields.includes(fieldName)) {
      throw new FormError("Invalid field", fieldName);
    } else if (req.body[fieldName].length > 100) {
      throw new FormError("Field too long", fieldName);
    } else if (req.body[fieldName].length < 2) {
      throw new FormError("Field too short", fieldName);
    }
  }

  //we have checked that no other fields than the ones we want are present
  //se we can only check for total number of fields
  if (Object.keys(req.body).length !== validTextFields.length) {
    throw new ApiError(
      400,
      `Some text fields are missing. Valid fields are: ${validTextFields.join(
        ", "
      )}`
    );
  }
  //determine image extension based on mimetype
  const imageExtension = req.file.mimetype.split("/")[1];

  const metadata = await nftStorageClient.store({
    name: req.body.symbol,
    description: req.body.name,
    image: new File([req.file.buffer], `nft.${imageExtension}`, {
      type: req.file.mimetype,
    }),
    properties: {
      variant: req.body.variant,
    },
  });

  let resObj = {
    metadataURL: metadata.url,
    name: metadata.data.name,
    description: metadata.data.description,
    imageURL: metadata.data.image.href,
  };

  res.status(201).json({ success: true, data: resObj });
});

export default router.handler({
  onNoMatch: (req, res) => {
    res.status(405).json(new ApiError(405, "Method not allowed"));
  },
  onError: (err, req, res) => {
    if (err instanceof MulterError) {
      res.status(400).json(new FormError("Error parsing Form", err));
    } else if (err instanceof FormError) {
      res.status(400).json(err);
    } else if (err instanceof ApiError) {
      res.status(err.code).json(err);
    } else {
      res
        .status(err.code || 500)
        .json(new ApiError(err.code || 500, err.message));
    }
  },
});
