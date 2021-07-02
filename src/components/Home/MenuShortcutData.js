import { FaStar, FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { IoIceCreamSharp } from "react-icons/io5";
import { BiCoffeeTogo, BiDish } from "react-icons/bi";

export const MenuShortcutData = [
  {
    img: "/Diavola-0.jpg",
    title: "Pizzas",
    icon: <FaPizzaSlice />,
    url: "/menu?category=pizza",
  },
  {
    img: "/hawaiian-0.jpg",
    title: "Burgers",
    icon: <FaHamburger />,
    url: "/menu?category=burger",
  },
  {
    img: "/pomodoro-0.jpg",
    title: "Spaghetti",
    icon: <BiDish />,
    url: "/menu?category=spaghetti",
  },
  {
    img: "/crab-2.jpg",
    title: "Rice",
    icon: <FaStar />,
    url: "/menu?category=rice",
  },
  {
    img: "/lava-0.jpg",
    title: "Desserts",
    icon: <IoIceCreamSharp />,
    url: "/menu?category=dessert",
  },

  {
    img: "/shakecream-1.jpg",
    title: "Drinks",
    icon: <BiCoffeeTogo />,
    url: "/menu?category=drink",
  },
];
