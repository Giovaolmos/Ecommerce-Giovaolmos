import { Controller, FileTypeValidator, Param, ParseFilePipe, ParseUUIDPipe, UploadedFile, UseInterceptors, MaxFileSizeValidator, Post, UseGuards } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../users/roles.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('files')
@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService){}

    @ApiBearerAuth()
    @Post('uploadImage/:id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @UseInterceptors(FileInterceptor('file'))  //* intercepto el formulario del Body del Request.
    uploadImage(
        @Param('id', ParseUUIDPipe) productId: string,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({fileType: /(jpg|jpeg|png|webp|svg|ico)/}),
                    new MaxFileSizeValidator({
                        maxSize: 200000,
                        message: 'The file must be less than 200kb',
                    }),
                ],
            }),
        )
        file: Express.Multer.File,
    ){
        return this.filesService.uploadImage(productId, file)
    }
}
