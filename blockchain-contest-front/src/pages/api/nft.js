import ApiError from "@/scripts/ApiError";
import FormError from "@/scripts/FormError";
import { NFTStorage, File } from "nft.storage";
import connectBusboy from "connect-busboy";
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

const router = createRouter();

router.post(expressWrapper(connectBusboy({ immediate: true })));

/**
 * Needed fields for FormData:
 * - name
 * - symbol
 * - image.[jpg|jpeg|png|gif]
 */
router.post(async (req, res) => {
  req.busboy.on('field', (fieldname, val) => {
    console.log(`Field [${fieldname}]: value: ${val}`);
  });
  req.busboy.on('finish', () => {
    console.log('Done parsing form!');
    res.end();
  });
});

export default router.handler();
