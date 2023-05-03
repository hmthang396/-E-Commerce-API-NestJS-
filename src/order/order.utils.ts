import { ProductService } from "src/product/product.service";

export class UtilsService {
    constructor(private productService: ProductService) { }

    async calTotalOrder(param:any){
        
        return 0;
    }

    async generatorCode(length : number) {
        let result: string = '';
        let characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength: number = characters.length;
        for (let i: number = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }
}