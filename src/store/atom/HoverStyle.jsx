import { atom } from "recoil";

export const hoverStyle = atom({
    key: "hoverStyle",
    default: "border-slate-300 hover:duration-300 hover:scale-110 ease-in-out hover:outline-none hover:shadow-lx ",
})