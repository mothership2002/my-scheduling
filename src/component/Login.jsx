import React, { useState } from 'react'
import { inputStyle, divStyle, headerStyle, fontStyle, loginButtonStyle } from "../store/atom/StyleAtom/LoginStyle"
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from "react-router-dom";
import { loginResult } from "../store/atom/loginResult"
import { userInfo } from "../store/atom/loginInfo"
import { useEffect } from 'react';

import Calendar from '../views/Calendar';

function Login() {

    const [inputSet, setInputSet] = useRecoilState(inputStyle);
    const [divSet, setDivSet] = useRecoilState(divStyle);
    const [headerSet, setHeaderSet] = useRecoilState(headerStyle);
    const [fontSet, setFontSet] = useRecoilState(fontStyle);
    const [loginButtonSet, setLoginButtonSet] = useRecoilState(loginButtonStyle);
    const [loginResultSet, setLoginResultSet] = useRecoilState(loginResult);
    const [userInfoSet, setUserInfoSet] = useRecoilState(userInfo);

    const [inputID, setInputID] = useState("");
    const [inputPW, setInputPW] = useState("");

    useEffect(() => {
        if(localStorage.getItem("userInfo") !== null || localStorage.getItem("userInfo") !== undefined){
            setUserInfoSet(JSON.parse(localStorage.getItem("userInfo")));
        }
    })

    if (!userInfoSet) {
        return (
            <div className='flex justify-center align-middle h-96 w-96 m-28'>
                <div className={divSet}>
                    <header className={fontSet + headerSet}>CALENDAR</header>
                    <div className="flex justify-center align-middle flex-col">

                        <input type="text" value={inputID} onChange={
                            (e) => {
                                setInputID(e.target.value);
                            }} name="ID" id="inputID" className={inputSet} placeholder="ID" />

                        <input type="password" value={inputPW} onChange={
                            (e) => {
                                setInputPW(e.target.value);
                            }} name="PW" id="inputPW" className={inputSet} placeholder="PW" />

                        <button type="button" className={loginButtonSet} onClick={
                            () => {

                                if (inputID == "" || inputPW == "") {
                                    alert("입력 값 제대로 넣어주세요.");
                                    return;
                                }
                                else {
                                    fetch("http://localhost:8080/api/v1/calendars/login", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                            "inputID": inputID,
                                            "inputPW": inputPW,
                                        }),
                                    }).then((response) => {
                                        setLoginResultSet(response.status === 200 ? true : false)
                                        return response.json();
                                    }).then((response) => {
                                        localStorage.setItem('userInfo', JSON.stringify(response));
                                        setUserInfoSet(JSON.parse(localStorage.getItem('userInfo')))

                                        if (loginResultSet) { <Calendar /> }
                                    })
                                }
                            }
                        }>Login</button>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return <Calendar />;
    }
}

export default Login