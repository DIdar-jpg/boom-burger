import React from "react";
import { SelectSeparator } from "@/components/ui/select";
import { Mail, MapPin, Phone, Instagram, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface FooterDescription {
   key: string;
   text: string;
   icon: React.FC<React.SVGProps<SVGSVGElement>> | LucideIcon;
}

const Footer: React.FC = () => {

   const { t } = useTranslation()
   const descriptions: FooterDescription[] = [
      {
         key: "mail",
         text: "some@gmail.com",
         icon: Mail,
      },
      {
         key: "phonenumber",
         text: "+99361234567",
         icon: Phone,
      },
      {
         key: "address",
         text: t('adress'),
         icon: MapPin,
      },

      {
         key: "instagram",
         text: "someInstAccount",
         icon: Instagram,
      },
   ];
   return (
      <footer className="mb-4">
         <div className="container text-xs md:text-lg">
            <h2 className="text-xl font-medium mb-1 sm:mb-4 md:text-3xl">
               <span className="text-orange-500">Boom</span>Burger
            </h2>
            <div className="w-full sm:flex sm:gap-2.5 md:justify-between">
               {descriptions.map((description) => {
                  return (
                     <a 
                        href="###"
                        key={description.key}
                        className="flex items-center gap-1 mb-2"
                     >
                        <description.icon size={18} className="flex-shrink-0" /> {description.text}
                     </a>
                  );
               })}
            </div>
            <SelectSeparator className="my-3" />
            <span className="block w-full text-center">© 2025 DFood - All rights reserved.</span>
         </div>
      </footer>
   );
};
export default Footer;
