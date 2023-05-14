export function parseFormWithPromise(multerRequestHandler, req, res) {
  return new Promise((resolve, reject) => {
    multerRequestHandler(req, res, (err) => {
      console.log("umlter finished")
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export default {
  parseFormWithPromise,
};
