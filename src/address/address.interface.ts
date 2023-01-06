import {
  IsEmail,
  MinLength,
  MaxLength,
  IsUUID,
  IsString,
  IsOptional,
  IsBoolean,
  IsNotEmpty,
  IsObject,
} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Document} from "mongoose";

export type AddressPublicData = Readonly<{
  id: string;
  userId: string;
  isActive: boolean;
  pinCode: string;
  city: string;
  state: string;
  address: {
    address1: string;
    address2: string;
  };
  name: string;
  phoneNo: string;
  isDefault: Boolean;
}>;

export type AddressMethods = {
  getPublicData: () => AddressPublicData;
};

export type Address = Readonly<{
  userId: string;
  id: string;
  pinCode: string;
  isActive: boolean;
  city: string;
  state: string;
  address: {
    address1: string;
    address2: string;
  };
  name: string;
  phoneNo: string;
  isDefault: Boolean;
}> &
  AddressMethods &
  Document;

export class AddressLineDto {
  @ApiProperty({example: "Address 1"})
  readonly address1!: string;

  @ApiProperty({example: "Address 2"})
  @IsOptional()
  readonly address2!: string;
}

export class AddressDto {
  @ApiProperty({example: "Jon"})
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @ApiProperty({example: true})
  @IsBoolean()
  readonly isDefault!: boolean;

  @ApiProperty({example: "302039"})
  @IsString()
  @IsNotEmpty()
  readonly pinCode!: string;

  @ApiProperty({example: "Jaipur"})
  @IsString()
  @IsNotEmpty()
  readonly city!: string;

  @ApiProperty({example: "Rajasthan"})
  @IsString()
  @IsNotEmpty()
  readonly state!: string;

  @ApiProperty({
    example: {
      address1: "Address 1",
      address2: "Address 2",
    },
  })
  @IsObject()
  readonly address!: AddressLineDto;

  @ApiProperty({example: "phoneNo"})
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly phoneNo!: string;
}
