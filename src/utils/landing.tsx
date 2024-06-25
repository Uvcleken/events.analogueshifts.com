import Image from "next/image";
import Music from "@/assets/images/event-types/music.webp";
import Art from "@/assets/images/event-types/arts.png";
import GamePad from "@/assets/images/event-types/gamepad.png";
import FoodAndDrink from "@/assets/images/event-types/food-drink.png";
import Business from "@/assets/images/event-types/business.png";

export const EventTypes = [
  {
    title: "Musics",
    icon: <Image alt="" src={Music} className="w-8 h-max" />,
  },

  {
    title: "Performing & Visual Arts",
    icon: <Image alt="" src={Art} className="w-10 h-max" />,
  },
  {
    title: "Hobbies",
    icon: <Image alt="" src={GamePad} className="w-8 h-max" />,
  },
  {
    title: "Nightlife",
    icon: <Image alt="" src={Music} className="w-8 h-max" />,
  },
  {
    title: "Food & Drink",
    icon: <Image alt="" src={FoodAndDrink} className="w-8 h-max" />,
  },
  {
    title: "Business",
    icon: <Image alt="" src={Business} className="w-9 h-max" />,
  },
];
