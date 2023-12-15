export class ApiError extends Error {
  public statusCode: number;
  public messages: string[];
  public error?: string;

  constructor(statusCode: number, error: string, message: string | string[]) {
    super(JSON.stringify(message));
    this.statusCode = statusCode;
    let messages: string[] = [];
    if (Array.isArray(message)) messages = message;
    else messages.push(message);
    this.messages = messages;
    this.error = error ?? this.message;

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
