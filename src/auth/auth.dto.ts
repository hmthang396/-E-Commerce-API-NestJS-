import { Expose } from "class-transformer"
import { AccountPosition } from "src/account/account.entity"

export class AuthDto {
    @Expose()
    id:number

    @Expose()
    fullname: string

    @Expose()
    email: string

    @Expose()
    position: AccountPosition

    @Expose()
    pic: string

    @Expose()
    access_token: string

    @Expose()
    refresh_token: string
}