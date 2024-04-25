import { HttpException } from "@nestjs/common";

export function GenerateException(error: any) {
    throw new HttpException(error.message, error.status)
}