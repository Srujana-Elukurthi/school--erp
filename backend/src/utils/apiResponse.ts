export class ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  error: any | null;

  constructor(success: boolean, message: string, data: T | null = null, error: any | null = null) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.error = error;
  }

  static success<T>(data: T, message: string = 'Success') {
    return new ApiResponse(true, message, data, null);
  }

  static error(message: string, error: any = null) {
    return new ApiResponse(false, message, null, error);
  }
}
