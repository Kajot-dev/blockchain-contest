import ApiError from "@/scripts/ApiError";
import { NFTStorage } from "nft.storage";
import { File } from "buffer";

const sizeLimitMegabytes = 15;
const nftStorageClient = new NFTStorage({
  token: process.env.NFT_STORAGE_API_KEY,
});

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
  //check for Content-Length not exceeding 15mb
  let contentLength = parseInt(req.headers["content-length"]);

  if (Number.isNaN(contentLength)) {
    res
      .status(400)
      .json(new ApiError(400, "Invalid Content-Length header value!"));
    return;
  }

  if (contentLength > sizeLimitMegabytes * 1024 * 1024) {
    res.status(413).json(new ApiError(413, "Image size exceeds 15mb limit!"));
    return;
  }

  //load image from request body to File
  //req is readable stream

  let data = []
  let totalBytes = 0;
  
  req.on("data", (chunk) => {
    totalBytes += chunk.length;
    if (totalBytes > sizeLimitMegabytes * 1024 * 1024) {
      res.status(413).json(new ApiError(413, "Image size exceeds 15mb limit!"));
      req.destroy();
      return;
    }
    data.push(chunk);
  });

  req.on("end", async () => {
    let fileBuffer = Buffer.concat(data);
    data = null;
    //upload to nft.storage
    let fileObj;
    if (contentType === "image/jpeg") {
      fileObj = new File([fileBuffer], "nft.jpg", {
        type: "image/jpeg",
      });
    } else {
      fileObj = new File([fileBuffer], "nft.png", {
        type: "image/png",
      }); 
    }

    try {
      let result = await nftStorageClient.store({
        name: "nft",
        description: "Nft from Minted",
        image: fileObj,
      });
      res.status(200).json(result);
    } catch (e) {
      res.status(500).json(new ApiError(500, "Internal server error"));
    }

  });
  

  req.on("error", (err) => {
    res.status(500).json(new ApiError(500, "Internal server error"));
  });
}
