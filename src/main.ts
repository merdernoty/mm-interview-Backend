import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
  const app = await NestFactory.create(AppModule);
app.setGlobalPrefix('/api');
  const PORT = 5000;
  app.enableCors({
    origin: true,
  });
  const config = new DocumentBuilder()
    .setTitle("mm-interview")
    .setDescription("igor and milan Gpt interview")
    .setVersion("1.0")
    .setLicense("MIT", "https://opensource.org/licenses/MIT")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  await app.listen(PORT, async () => {
    console.log(`Server run on ${await app.getUrl()}`);
    console.log(`Docs run on ${await app.getUrl()}/api/docs`);
  });
}

start();
