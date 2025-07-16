import { isAxiosError } from 'axios'

export const responseErrorHandler = (error: unknown): string => {
  let errorMessage = 'Some error occurred'

  if (isAxiosError(error)) {
    if (error.status === 404) {
      errorMessage = error.response?.data.error || 'Not found'
    } else {
      errorMessage = error.message
    }
  }
  return errorMessage
}
