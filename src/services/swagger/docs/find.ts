import { HttpStatus } from '@nestjs/common'
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse
} from '@nestjs/swagger'

export function findApiDecorator(ApiResponseEntity: any): MethodDecorator {
  const decorators = [
    ApiResponse({ type: ApiResponseEntity, status: HttpStatus.OK }),
    ApiNotFoundResponse({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                example: 'Not Found'
              }
            }
          }
        }
      }
    }),
    ApiInternalServerErrorResponse({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                example: 'Internal Server Error'
              }
            }
          }
        }
      }
    })
  ]

  return (
    // eslint-disable-next-line @typescript-eslint/ban-types
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    for (const decorator of decorators) {
      decorator(target, propertyKey, descriptor)
    }
  }
}
