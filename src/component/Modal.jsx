import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';

import { userInfo } from '../store/atom/loginInfo'

import "../css/modal-style.css"
import InsertButton from './InsertButton';

import { resultList } from "../store/mainContents"


export const Modal = (props) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, scheduleData, today, compareDate } = props;

    const [resultArray, setResultArray] = useRecoilState(resultList);
    const [userInfoSet, setUserInfoSet] = useRecoilState(userInfo);

    let selectDate;
    let selectDateMonth;
    let selectDateDay;
    let rendering;

    function deleteFunction(scheduleNo, yyyyMMdd) {
        fetch("http://aiueo.iptime.org:8080/api/v1/calendars/delete-schedule/", {
            method: "POST",
            cors: 'no-cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "scheduleNo": scheduleNo,
                "selectMonth": yyyyMMdd,
                "memberNo": userInfoSet
            }),
        }).then((response) => {
            return response.json();
        }).then((response) => {
            setResultArray(response)
            setTimeout(function () {
                window.location.reload();
            }, 1000);
        })
    }

    if (scheduleData !== undefined) {
        selectDateMonth = Number(scheduleData.date.substring(4, 6));
        selectDateDay = Number(scheduleData.date.substring(6));
        selectDate = selectDateMonth + "월 " + selectDateDay + "일 ";

        if (scheduleData.scheduleList.length === 0) {
            rendering = (
                <div className='flex justify-center align-middle w-full h-48'>
                    <h3>아직 일정이 추가되지 않았어요.</h3>
                </div>
            )

        }
        else {
            rendering = scheduleData.scheduleList.map((items, i) => {
                const hour = items.time.substring(0, 2);
                const minute = items.time.substring(2);
                if (today > compareDate) {
                    return (
                        <div key={i} id="content" className='border h-11 rounded-xl m-1 px-1' >
                            <input type="hidden" value={items.scheduleData} />
                            <span>{hour + ":" + minute}</span>
                            <span className='w-80 text-center'>{items.contents}</span>
                            <div className='h-12 w-12 mx-2'></div>
                        </div>
                    )
                }
                else {
                    return (
                        <div key={i} id="content" className='border h-11 rounded-xl m-1 px-1'>
                            <input type="hidden" value={items.scheduleNo} />
                            <span>{hour + ":" + minute}</span>
                            <span className='w-80 text-center'>{items.contents}</span>
                            {/* <button id='updateButton' className="text-xs h-6 w-6 mx-1" onClick={() => {
                            </button> */}
                            <button id='deleteButton' className="text-xs h-6 w-6 mx-1" onClick={() => {
                                if(window.confirm("삭제하시겠습니까?")){
                                    deleteFunction(items.scheduleNo, items.yyyyMM);
                                    alert("삭제되었습니다.")
                                }
                            }}>
                                <img src="images/delete2.png" alt="" className='h-full w-full hover:scale-110' />
                            </button>
                        </div>
                    )
                }
            })
        }
    }

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={open ? 'openModal modal' : 'modal'}>
            {open ? (
                <section className=''>
                    <header className="font-['jalnan']" >
                        {selectDate}
                        <button className="close font-['jalnan']" onClick={close}>
                            &times;
                        </button>
                    </header>
                    <main className="font-['jalnan'] ">
                        {rendering}
                    </main>
                    {/* 이부분을 span으로 담아야함 */}
                    <InsertButton today={today} scheduleData={scheduleData}></InsertButton>
                    <footer>
                        <button className="close font-['jalnan']" onClick={close}>
                            close
                        </button>
                    </footer>
                </section >
            ) : null}
        </div >
    );
};