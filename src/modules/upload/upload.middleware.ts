import { Injectable } from "@nestjs/common";
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from "@nestjs/platform-express";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from 'cloudinary'


@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    const storage = new CloudinaryStorage({
      cloudinary: cloudinary,
    });

    return { storage: storage };
  }
}
