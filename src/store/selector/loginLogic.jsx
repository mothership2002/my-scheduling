import { selector, useRecoilState } from "recoil";
import { userInfo, ID, PW } from "../atom/loginInfo"
import { loginResult } from '../atom/loginResult'

// export const infoData = selector({
//     key: 'infoData',
//     get: ({ get }) => {
//         const memberNo = get(userInfo);
//         return memberNo;
//     },
// })

export const loginFetch = selector({
    key: 'loginFetch',
    get: async ({ get }) => {
        const inputID = get(ID);
        const inputPW = get(PW);
        if(inputID == null || inputPW == null){

            const response = await fetch("http://localhost:8080/api/v1/calendars/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "inputID": inputID,
                    "inputPW": inputPW,
                }),
            });
            const responseObj = await response.json();
            localStorage.setItem('userInfo', JSON.stringify(responseObj));
            console.log(12);
            return 1;
        }
        return 2;
    }
})