import { atom } from 'recoil'

export const divStyle = atom({
    key: "divStyle",
    default: "login-container container sm px-4 border-solid border-sky-500 border-2 h-80 rounded-3xl flex justify-around flex-col"
});

export const inputStyle = atom({
    key: "inputStyle",
    default: "m-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-50 rounded-md sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none"
});

export const headerStyle = atom({
    key: "headerStyle",
    default: " text-center text-4xl text-black"
})

export const fontStyle = atom({
    key: "fontStyle",
    default: "font-['Jalnan'] "
})

export const loginButtonStyle = atom({
    key: "loginButtonStyle",
    default: "m-3 px-4 py-2 font-semibold text-sm bg-sky-500 text-white rounded-md shadow-sm hover:scale-110 ease-in-out duration-300"
})