import fs from "fs";
import path from "path";

function sendError(res, statusCode, message) {
  res.status(statusCode).json({ error: message });
}

export default function handler(req, res) {
  try {
    const partnersDir = path.join(process.cwd(), "public", "partners");

    fs.readdir(partnersDir, (err, fileNames) => {
      if (err) {
        sendError(res, 500, "Unable to read the partners directory.");
        return;
      }

      const partnerSvgs = fileNames.filter((fileName) => fileName.endsWith(".svg"));
      res.status(200).json({ partnerSvgs });
    });
  } catch (error) {
    sendError(res, 500, "An error occurred while processing your request.");
  }
}
