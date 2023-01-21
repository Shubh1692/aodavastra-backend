import {DocumentBuilder} from "@nestjs/swagger";
import {setupSwaggerDocument} from "../common/swagger";

export default setupSwaggerDocument(
  "wishList",
  new DocumentBuilder()
    .setTitle("WishList Docs")
    .setDescription("Basic user follow features")
    .setVersion("1.0")
    .setBasePath("api")
    .addTag("wishList")
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build(),
);
