import ApiError from "./ApiError";

export default class FormError extends ApiError {

  field=""
  multerCode=""
  constructor(message, multerError) {
    super(400, message);
    this.multerCode = multerError.code;
    this.field = multerError.field;
  }

  toJSON() {
    return {
      error: {
        code: this.code,
        message: this.message,
        field: this.field,
        multerCode: this.multerCode,
      },
    };
  }
}