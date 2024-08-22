// src/files/files.module.ts
import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { CloudinaryConfig } from 'src/config/cloudinary'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entitites/products.entity';
import { FilesRepository } from './files.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Product])],
  providers: [FilesService,  CloudinaryConfig, FilesRepository],
  controllers: [FilesController],
  
})
export class FilesModule {}
