import ApiError from "@/scripts/ApiError";
import { NFTStorage, File } from "nft.storage";
import { Buffer } from "buffer";
import getRawBody from "raw-body";

const sizeLimitMegabytes = 15;
const nftStorageClient = new NFTStorage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA0YzczMzNEMmQ2NkNjRTU0OTA0ZUZkNEViM0ZFMTMwZTFDYUUwNzAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4MzQ3NDEyOTM2MSwibmFtZSI6ImJsb2NrY2hhaW4tY29udGVzdCJ9.gfu0s7CUmfWI2blu9SZ-TvlLY0Wvt7y7vtd3vV1jqL0",
});

export const config = {
  api: {
    bodyParser: false,
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    await postHandler(req, res);
  } else {
    //wrong method
    res.status(405).json(new ApiError(405, "Method not allowed"));
  }
}

async function postHandler(req, res) {
  //check for Contet-Type for valid jpeg/png file

  let contentType = req.headers["content-type"];
  if (
    contentType !== "image/jpeg" &&
    contentType !== "image/png"
  ) {
    res
      .status(400)
      .json(
        new ApiError(
          400,
          "Invalid Content-Type, image must be either jpeg or png!"
        )
      );
    return;
  }

  let fileBuffer = await getRawBody(
    req,
    {
      length: req.headers["content-length"],
      limit: `${sizeLimitMegabytes}mb`,
    },
  )

  let fileObj;
  let fileName;
  if (contentType === "image/jpeg") {
    fileName = "nft.jpg";
    fileObj = new File([fileBuffer], fileName, {
      type: "image/jpg",
    });
  } else {
    fileName = "nft.png";
    fileObj = new File([fileBuffer], fileName, {
      type: "image/png",
    });
  }


  try {
    let result = await nftStorageClient.store({
      name: "nft",
      description: "Nft from Minted",
      image: fileObj,
    });
    res.status(200).json({
      ...result,
      imageUrl: `ipfs://${result.ipnft}/image/${fileName}`
    });
  } catch (e) {
    console.log(e);
    res.status(500).json(new ApiError(500, "Internal server error"));
  }

}
