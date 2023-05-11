export default class ApiError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  toJSON() {
    return {
      error: {
        code: this.code,
        message: this.message,
      },
    };
  }
}
