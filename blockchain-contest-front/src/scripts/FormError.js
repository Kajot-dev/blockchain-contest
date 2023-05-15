import ApiError from "./ApiError";

export default class FormError extends ApiError {
  field = "";
  multerCode = "";
  constructor(message, multerError) {
    super(400, message);
    if (typeof multerError === "string") {
      this.field = multerError;
      return;
    }
    this.multerCode = multerError.code;
    this.field = multerError.field;
  }

  toJSON() {
    let errObj = {
      code: this.code,
      message: this.message,
      field: this.field,
    };

    if (this.multerCode) {
      errObj.multerCode = this.multerCode;
    }

    return {
      error: errObj,
    };
  }
}
