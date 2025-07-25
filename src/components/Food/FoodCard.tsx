import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

import { useDispatch } from "react-redux";
import { addItem } from '@/store/slices/cartSlice'
import { type FoodItem } from "@/entities";


const FoodCard: React.FC<FoodItem> = ({ name, price, id, quantity, weight, imageUrl }) => {
   
   const dispatch = useDispatch()
   
   return (
      <Dialog>
         <DialogTrigger asChild>
            <Card className="w-full cursor-pointer transition-transform hover:scale-105 rounded-tl-[64px] xs:w-[48%] md:w-[30%]">
               <div className="relative w-full overflow-hidden rounded-md">
                  <img
                     src={imageUrl}
                     alt={name}
                     className="object-cover w-full h-full rounded-tl-[64px]"
                  />
               </div>
               <CardContent className="p-4 pt-2">
                  <div className="flex justify-between items-center mb-2 font-medium">
                     <h3 className="text-lg">{name}</h3>
                     <span className="">${price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-md font-light">{weight} gr</span>
                     <div
                        className="bg-primary text-accent py-1.5 px-7 rounded-t-full rounded-bl-full"
                        onClick={(e) => {
                           e.stopPropagation();
                           dispatch(addItem({name, price, id, quantity}))
                        }}
                     >
                        <Plus className="w-6 h-6" />
                     </div>
                  </div>
               </CardContent>
            </Card>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle className="text-xl">{name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
               <img
                  src={imageUrl}
                  alt={name}
                  className="object-cover w-full rounded-md aspect-square"
               />
               <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Voluptatibus repellat quaerat, perspiciatis perferendis sequi
               </p>

               <div className="flex justify-between font-medium">
                  <span>Масса: {weight} gr</span>
                  <span>Цена: {price} TMT</span>
               </div>

               {/* Сюда можно добавить больше деталей */}
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default FoodCard;
