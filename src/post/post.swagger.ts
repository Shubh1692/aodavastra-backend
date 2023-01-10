import {DocumentBuilder} from "@nestjs/swagger";
import {setupSwaggerDocument} from "../common/swagger";

export default setupSwaggerDocument(
  "post",
  new DocumentBuilder()
    .setTitle("Post Docs")
    .setDescription("Basic user post features")
    .setVersion("1.0")
    .setBasePath("api")
    .addTag("post")
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



