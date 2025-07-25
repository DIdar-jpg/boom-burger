import React from "react";

import { type ColumnDef } from "@tanstack/react-table";
import { type CartItem } from "@/entities";
import { increaseQuantity, decreaseQuantity, selectCartItems } from "@/store/slices/cartSlice";

import CartTable from "./CartTable";
import { useSelector, useDispatch } from "react-redux";
import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";


const CartTableWrapper: React.FC = () => {
   const { t } = useTranslation()
   const cartItems = useSelector(selectCartItems);
   
   const dispatch = useDispatch();
   const columns: ColumnDef<CartItem>[] = [
      {
         accessorKey: "name",
         header: t('tableFoodName'),
      },
      {
         accessorKey: "quantity",
         header: t('tableQuantity'),
         cell: ({ row }) => { 
            const item = row.original
            return (
            <div className="flex items-center">
               <Button variant="outline" size="icon" onClick={() => dispatch(decreaseQuantity(item.id))}>
                  <Minus className="w-4 h-4" />
               </Button>

               <Button variant="outline" size="icon" onClick={() => dispatch(increaseQuantity(item.id))}>
                  <Plus className="w-4 h-4" />
               </Button>

               <span className="ml-4">{item.quantity}</span>
            </div>
         )}
      },
      {
         accessorKey: "price",
         header: t("tablePrice"),
         cell: ({ row }) => { 
            const item = row.original
            return <span>{item.price * item.quantity} TMT</span>
         }
      },
   ];
   return (
      <>
         <CartTable columns={columns} data={cartItems} />
      </>
   );
};
export default CartTableWrapper;
