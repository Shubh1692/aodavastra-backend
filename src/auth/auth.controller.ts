import {
  Controller,
  Get,
  Post,
  Req,
  Param,
  UseGuards,
  Body,
  Put,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {Request} from "express";

import {
  ActivateParams,
  ForgottenPasswordDto,
  ResetPasswordDto,
  SignUpDto,
  LoginDto,
  UserUpdateDto,
  ChangePasswordDto,
  UserCreatorDto,
} from "./auth.interface";
import {AuthService} from "./auth.service";
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";
import {User} from "../user/user.interface";
import {FileInterceptor} from "@nestjs/platform-express";
import {imageFileFilter, multerStorage} from "../common/multer";
@ApiTags("auth")
@Controller("user")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("activate/:userId/:activationToken")
  activate(@Param() params: ActivateParams, @Param("userId") userId: string) {
    return this.authService.activate(params);
  }

  @UseGuards(AuthGuard("local"))
  @Post("login")
  login(@Req() req: Request, @Body() loginDto: LoginDto) {
    // TODO: remove loginDto, swagger should find it somehow by exploring the AuthGuard
    return this.authService.login(req.user as User);
  }

  @Post("signup")
  async signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signUpUser(signUpDto);
  }

  @UseGuards(AuthGuard())
  @Get("me")
  @ApiBearerAuth("JWT-auth")
  getProfile(@Req() req: Request) {
    const user = req.user as User;
    return this.authService.getUserProfile(user);
  }
  

  @UseGuards(AuthGuard())
  @Get("relogin")
  relogin(@Req() req: Request) {
    return this.authService.login(req.user as User);
  }

  @Post("forgotten-password")
  forgottenPassword(@Body() body: ForgottenPasswordDto) {
    return this.authService.forgottenPassword(body);
  }

  @Post("reset-password")
  resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(body);
  }


  @Put("")
  @UseGuards(AuthGuard())
  @ApiBearerAuth("JWT-auth")
  update(@Body() body: UserUpdateDto, @Req() req: Request) {
    const user = req.user as User;
    return this.authService.update(user._id, body);
  }

  @Put("become-creator")
  @UseGuards(AuthGuard())
  @ApiBearerAuth("JWT-auth")
  becomeCreator(@Body() body: UserCreatorDto, @Req() req: Request) {
    const user = req.user as User;
    return this.authService.becomeCreator(user._id, body);
  }


  @UseGuards(AuthGuard())
  @Put("change-password")
  @ApiBearerAuth("JWT-auth")
  changePassword(@Body() body: ChangePasswordDto, @Req() req: Request) {
    const user = req.user as User;
    return this.authService.changePassword(body, user._id);
  }
  
  @Put("profile-picture")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor("file", {
      storage: multerStorage,
      fileFilter: imageFileFilter,
    }),
  )

  @Put("profile-picture")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor("file", {
      storage: multerStorage,
      fileFilter: imageFileFilter,
    }),
  )
  @UseGuards(AuthGuard())
  @ApiConsumes("multipart/form-data")
  @ApiBearerAuth("JWT-auth")
  async updateProfilePicture(
    @UploadedFile("file") file: Express.Multer.File,
    @Req() req: Request,
  ) {
    return this.authService.updatePicture((req.user as User)._id, file, null);
  }

  @Put("cover-picture")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor("file", {
      storage: multerStorage,
      fileFilter: imageFileFilter,
    }),
  )
  @UseGuards(AuthGuard())
  @ApiConsumes("multipart/form-data")
  @ApiBearerAuth("JWT-auth")
  async updateCoverPicture(
    @UploadedFile("file") file: Express.Multer.File,
    @Req() req: Request,
  ) {
    return this.authService.updatePicture((req.user as User)._id, null, file);
  }
}
