import { HttpStatus } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse
} from '@nestjs/swagger'

export function updateApiDecorator(apiBodyDto: any, apiResponseEntity: any): MethodDecorator {
  const decorators = [
    ApiBody({ type: apiBodyDto }),
    ApiResponse({ type: apiResponseEntity, status: HttpStatus.ACCEPTED }),
    ApiBadRequestResponse({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                example: 'Bad Request'
              }
            }
          }
        }
      }
    }),
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
