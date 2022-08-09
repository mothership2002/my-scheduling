import { atom } from "recoil";

export const buttonStyle = atom({
    key: "buttonStyle",
    default: "hover:duration-300 hover:scale-125 ease-in-out hover:shadow-lx text-lime-300 hover:text-lime-500 ",
});