export class BadRequestError extends Error {
  constructor(message = 'Bad Request') {
    super(message)
  }
}
