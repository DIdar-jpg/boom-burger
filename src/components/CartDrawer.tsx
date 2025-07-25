import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, selectIsCartEmpty, selectTotalPrice } from "@/store/slices/cartSlice";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import {
   SheetTrigger,
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetDescription,
} from "./ui/sheet";
import FormOfOrder from "./FormOfOrder";
import { useTranslation } from "react-i18next";

interface CartDrawerProps {
   cartTable?: React.ReactNode;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ cartTable }) => {

   const { t } = useTranslation()
   const totalPrice = useSelector(selectTotalPrice);
   const isCartEmpty = useSelector(selectIsCartEmpty); 

   const dispatch = useDispatch();
   
   return (
      <Drawer>
         <DrawerTrigger asChild>
            <Button
               variant="default"
               className="h-16 fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 text-ms shadow-lg rounded-full bg-primary text-accent transition hover:bg-accent hover:text-primary"
            >
               <ShoppingCart className="!w-8 !h-8" />
               <span>{totalPrice > 0 ? `${totalPrice} TMT` : t('cart')}</span>
            </Button>
         </DrawerTrigger>
         <DrawerContent className="p-4">
            <h2 className="text-lg xs:text-xl font-bold mb-4">{t('cartTitle')}</h2>
            {!isCartEmpty ? (
               <div>
                  {cartTable}
                  <div className="w-full flex justify-center gap-5 mt-4">
                     <Button
                        className="w-5/12 text-sm xs:text-base text-primary border-2 border-primary hover:text-primary"
                        variant="outline"
                        onClick={() => {
                           dispatch(clearCart());
                        }}
                     >
                        {t('cleanCart')}
                     </Button>
                     <Sheet>
                        <SheetTrigger asChild>
                           <Button className="w-5/12 text-sm xs:text-base">{t('placeAnOrder')}</Button>
                        </SheetTrigger>
                        <SheetContent className="w-11/12 md:w-3/5" onOpenAutoFocus={(event) => event.preventDefault()}>
                           <SheetHeader>
                              <SheetTitle className="text-xl">{t('sheetTitle')}</SheetTitle>
                              <SheetDescription>
                                 {t('sheetDescription')}
                              </SheetDescription>
                           </SheetHeader>
                           <FormOfOrder />
                        </SheetContent>
                     </Sheet>
                  </div>
               </div>
            ) : (
               <p className="text-sm text-muted-foreground">
                  {t('emptyCart')}
               </p>
            )}
         </DrawerContent>
      </Drawer>
   );
};

export default CartDrawer;
