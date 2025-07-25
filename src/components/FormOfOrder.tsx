import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "./ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { MapPin } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalPrice } from "@/store/slices/cartSlice";
import { setClient } from "@/store/slices/clientSlice";
import OpenStreetMapModal from "./MapModal";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";
import { useTranslation } from "react-i18next";

const phoneRegex = /^\+?[0-9\s\-()]{6,20}$/; // Позволяет + и цифры, пробелы, дефисы, скобки, от 6 до 20 символов

function createRangeStringField(min: number, max: number, message: string) {
   return z.string().min(min, { message }).max(max, { message });
}
const formSchema = z.object({
   name: createRangeStringField(2, 50, "Количество символов от 2 до 50"),
   number: z
      .string()
      .min(6)
      .max(50)
      .regex(phoneRegex, "Используйте только цифры, +, -, (), пробелы."),
   adress: createRangeStringField(2, 1000, "Количество символов от 2 до 50"),
   note: z.string().max(1000).optional(),
});

const FormOfOrder: React.FC = () => {
   const { t } = useTranslation()
   const totalPrice = useSelector(selectTotalPrice);
   const dispatch = useDispatch();

   const [isMapModalOpen, setIsMapModalOpen] = useState(false); // Изначально карта закрыта
   // ...
   const openMap = () => {
      setIsMapModalOpen(true); // Устанавливаем в true, чтобы открыть модалку
   };
   const closeMap = () => {
      setIsMapModalOpen(false); // Устанавливаем в false, чтобы закрыть модалку
   };

   // В FormOfOrder:
   const handleLocationSelected = (
      address: string,
      lat: number,
      lng: number
   ) => {
      form.setValue("adress", address, { shouldValidate: true }); // Обновляем поле "adress" в форме
      // Здесь можно сохранить lat и lng, если они нужны
   };
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: "",
         number: "",
         adress: "",
         note: undefined,
      },
   });

   function onSubmit(values: z.infer<typeof formSchema>) {
      dispatch(setClient(values));
      toast(t('toastTitle'), {
         position: "top-center",
         duration: 500000,
         description: t('toastDescription', {name: values.name, totalPrice: totalPrice, number: values.number}),
         action: {
            label: t('good'),
            onClick: () => {},
         },
         className: "my-custom-toast-container !bg-background !block",
         // classNames: Применяется к внутренним элементам
         classNames: {
            content: "!mb-4",
            title: "!text-xl !text-center !font-bold", // Классы для заголовка
            description: "!text-lg !text-foreground", // Классы для описания
            actionButton: "!font-bold !bg-primary !h-9 !px-6 !py-4 !text-lg",
         },
      });
   }
   return (
      <>
         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="space-y-8 px-4"
            >
               <div className="w-full flex items-start justify-between gap-3">
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem className="w-[45%]">
                           <FormLabel className="xs:text-lg">{t('clientName')}</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder={t('clientNameExample')}
                                 {...field}
                                 autoComplete="off"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="number"
                     render={({ field }) => (
                        <FormItem className="w-[45%]">
                           <FormLabel className="xs:text-lg">
                              {t('clientNumber')}
                           </FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="+99361234567"
                                 {...field}
                                 autoComplete="off"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <FormField
                  control={form.control}
                  name="adress"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel className="xs:text-lg">{t('clientAdress')}</FormLabel>
                        <FormControl>
                           <div className="flex gap-3">
                              <Input
                                 placeholder={t('clientAdressExample')}
                                 {...field}
                                 autoComplete="off"
                              />
                              <Button
                                 type="button"
                                 onClick={openMap}
                                 size="icon"
                                 aria-label={t('openMap')}
                                 className="bg-primary hover:text-foreground hover:bg-accent"
                              >
                                 <MapPin className="w-4 h-4" />
                              </Button>
                           </div>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel className="xs:text-lg">
                           {t('orderNote')}
                        </FormLabel>
                        <FormControl>
                           <Input {...field} autoComplete="off" />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <div className="w-full flex items-center justify-between">
                  <span>{t('totalPrice')} {totalPrice} ТМТ</span>
                  <Button type="submit">{t('arrangement')}</Button>
               </div>
            </form>
         </Form>
         <OpenStreetMapModal
            isOpen={isMapModalOpen}
            onClose={closeMap}
            onLocationSelect={handleLocationSelected}
         />
         <Toaster />
      </>
   );
};
export default FormOfOrder;
