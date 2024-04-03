export class Exception extends Error {
  catchMe = true;
  name = 'Exception';
  textKey?: string;

  constructor(message: string, options?: { textKey?: string }) {
    super(message);
    this.textKey = options?.textKey;
  }
}
