import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { Account } from "./account.entity";
import { AuthModule } from "src/auth/auth.module";
import { AuthGuard } from "src/auth/auth.guard";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [TypeOrmModule.forFeature([Account]),JwtModule],
    controllers: [AccountController],
    providers: [AccountService],
    exports:[AccountService]
})

export class AccountModule { }