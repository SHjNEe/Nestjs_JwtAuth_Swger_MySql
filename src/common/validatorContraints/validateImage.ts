import { BadRequestException, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe } from "@nestjs/common";

export const validateImage = () => {
    const limitFileSize = 3* 1024 * 1024;
    return new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({ maxSize: limitFileSize }),
            new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }),
        ],
        exceptionFactory(error) {
            return new BadRequestException(error);
        }
    })
}
