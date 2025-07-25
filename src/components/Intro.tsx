import React from "react";
import scooterGuy from "@/assets/scooterGuy.png";

import { Clock, MapPin, Phone, Instagram, type LucideIcon } from "lucide-react";

import { useTranslation } from 'react-i18next'

interface Description {
  key: string;
  text: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>> | LucideIcon; // Тип для React-компонента иконки
  color: string; 
  // action?: () => void; //
}

const Intro: React.FC = () => {

  const { t } = useTranslation()

  const descriptions: Description[] = [
    {
      key: "worktime",
      text: t('worktime'),
      icon: Clock,
      color: "primary",
    },
    {
      key: "address",
      text: t('adress'),
      icon: MapPin,
      color: "destructive",
    },
    {
      key: "phonenumber",
      text: "+99361234567",
      icon: Phone,
      color: "chart-2",
    },
    {
      key: "instagram",
      text: "@someInstAccount",
      icon: Instagram,
      color: "destructive",
    },
  ];

  return (
    <div className="container pt-8 flex justify-center flex-wrap items-center xs:justify-between xs:flex-nowrap ">
      <img className="w-3/4 max-h-110 order-1 xs:order-2" src={scooterGuy} alt="" />

      <div className="w-full order-2 xs:order-1">
        <h2 className="text-center font-medium mt-8 mb-4 xs:text-lg md:text-2xl">
          Boom<span className="text-primary">Burger</span> {t('introDescription')}
        </h2>
        {descriptions.map((item) => (
          <div className="group mb-4 xs:text-lg md:w-2/3" key={item.key}>
            <p
              className={`flex items-center gap-2 pb-0.5 mb-1 transition-all duration-200 group-hover:text-${item.color}`}
            >
              <span className="w-6 h-6">
                {<item.icon className={`text-${item.color}`} />}
              </span>
              <span>{item.text}</span>
            </p>
            <div
              className={`w-0 h-0.5 transition-all duration-200 group-hover:w-full bg-${item.color}`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Intro;
