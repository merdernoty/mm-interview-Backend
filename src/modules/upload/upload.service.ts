import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v2 as cloudinary } from "cloudinary";

@Injectable()
export class UploadService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>("CLOUDINARY_NAME"),
      api_key: this.configService.get<string>("CLOUDINARY_API"),
      api_secret: this.configService.get<string>("CLOUDINARY_SECRET"),
    });
  }
  async uploadFile(file: any): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "image" }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        })
        .end(file.buffer);
    });
  }
}
