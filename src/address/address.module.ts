import { Module } from "@nestjs/common";

import { AddressModel } from "./address.model";

@Module({
  imports: [AddressModel],
  providers: [],
  exports: [],
})
export class AddressModule { }
