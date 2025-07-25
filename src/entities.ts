export type FoodItem = {
   name: string;
   description: string,
   category: string;
   id: string;
   price: number;
   weight: number;
   quantity: number;
   imageUrl: string;
}
export type CartItem = {
   id: string;
   name: string;
   price: number;
   quantity: number;
};
export type Client = {
   name: string,
   number: string,
   adress: string,
   note?: string | undefined
};
export type Order = {
   totalPrice : number,
   client: Client,
   cart: CartItem[],
   id: string
};

export type LngRet = { [lng: string]: { nativeName: string }}


































