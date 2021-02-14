export interface CartModel {
    id:Number;
    userId:Number;
    date:Date;
    products:{productId:Number,quantity:Number}[];
    __v:number;
}