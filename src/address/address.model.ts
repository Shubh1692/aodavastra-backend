import { MongooseModule } from "@nestjs/mongoose";
import { AddressSchema } from "./address.schema";

export const AddressModel = MongooseModule.forFeature([
  { name: "Address", schema: AddressSchema },
]);
