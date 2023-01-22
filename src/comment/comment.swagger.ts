import {DocumentBuilder} from "@nestjs/swagger";

import {setupSwaggerDocument} from "../common/swagger";

export default setupSwaggerDocument(
  "comment",
  new DocumentBuilder()
    .setTitle("Comment Docs")
    .setDescription("Basic user post features")
    .setVersion("1.0")
    .setBasePath("api")
    .addTag("comment")
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: process.env.DEFAULT_TOKEN || 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build(),
);
