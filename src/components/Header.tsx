import React, { useState } from "react";
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import type { LngRet } from "@/entities";
import { _toUpperCase } from "zod/v4/core";
import { useTranslation } from "react-i18next";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
   const { i18n } = useTranslation()
   const lngs: LngRet = {
      EN: { nativeName: 'English'},
      DE: { nativeName: 'Deutsch'},
      RU: { nativeName: 'Русский'},
   }
   const [language, setLanguage] = useState(`${i18n.language[0]}${i18n.language[1]}`.toUpperCase());
   const handleLanguageChange = (lng: string) => {
      i18n.changeLanguage(lng.toLowerCase())
      setLanguage(lng);
   };
   return (
      <header className="container flex justify-between items-center py-4 text-2xl ">
         <h1 className="font-medium"><span className="text-orange-500">Boom</span>Burger</h1>
         <Select onValueChange={handleLanguageChange} defaultValue={language}>
            <SelectTrigger className="w-fit bg-primary cursor-pointer text-accent focus:outline-none ">
               <SelectValue placeholder={language} />
            </SelectTrigger>
            <SelectContent>
               <SelectGroup>
                  {Object.keys(lngs).map( (lng) => <SelectItem value={lng.toUpperCase()} key={lng} >{lng.toUpperCase()}</SelectItem>)}
               </SelectGroup>
            </SelectContent>
         </Select>
      </header>
   );
};

export default Header;
