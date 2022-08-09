import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { tableStyle } from '../store/atom/TableStyle';
import { mainStyle } from "../store/atom/ElementStyle"
import { paramStyle } from "../store/atom/ParamaterStyle"
import { hoverStyle } from "../store/atom/HoverStyle"
import { titleStyle } from "../store/atom/TitleStyle"
import { buttonStyle } from "../store/atom/ButtonStyle"

import { scheduleAlert } from "../common/ScheduleAlert"
import { Modal } from "../component/Modal"
import Swal from 'sweetalert2'

function Calendar() {

    const [dateArr, setDateArr] = useState([]);
    const [time, setTime] = useState();
    const [monthName, setMonthName] = useState();
    const [currentYear, setCurrentYear] = useState();
    const [currentMonth, setCurrentMonth] = useState();
    const [today, setToday] = useState();

    const [modalOpen, setModalOpen] = useState();
    const [scheduleData, setScheduleData] = useState();
    const [compareDate, setCompareDate] = useState();

    function openModal() {
        setModalOpen(true);
    };
    function closeModal() {
        setModalOpen(false);
    };

    function mainContent(yearNo, monthNo, actionType, scheduleData) {
        let date = new Date();
        let month;
        let year;

        if (yearNo === undefined && monthNo === undefined) {
            year = date.getFullYear();
            month = date.getMonth();
        }
        else {
            date.setFullYear(yearNo);
            date.setMonth(monthNo);
            if (actionType === 'prev') {
                date.setMonth(date.getMonth() - 1);
            }
            else if (actionType === 'next') {
                date.setMonth(date.getMonth() + 1);
            }
            year = date.getFullYear();
            month = date.getMonth();
        }
        // let month = date.setMonth(monthNo);

        setCurrentMonth(month);
        setCurrentYear(year);

        month = month + 1;
        let startDateStr = year + '' + (month < 10 ? '0' + month : month.toString()) + '01';

        switch (month) {
            case 1: setMonthName("Jan."); break;
            case 2: setMonthName("Feb."); break;
            case 3: setMonthName("Mar."); break;
            case 4: setMonthName("Apr."); break;
            case 5: setMonthName("May."); break;
            case 6: setMonthName("Jun."); break;
            case 7: setMonthName("Jul."); break;
            case 8: setMonthName("Aug."); break;
            case 9: setMonthName("Sep."); break;
            case 10: setMonthName("Oct."); break;
            case 11: setMonthName("Nov."); break;
            case 12: setMonthName("Dec."); break;
        }

        // 날짜 로직
        date.setDate(1);
        let firstDay = date.getDay();

        let nextMonthDate = new Date(0);
        nextMonthDate.setFullYear(year);
        nextMonthDate.setMonth(month);
        nextMonthDate.setDate(1);
        nextMonthDate.setDate(nextMonthDate.getDate() - 1);

        let endYear = nextMonthDate.getFullYear();
        let endMonth = nextMonthDate.getMonth() + 1;
        let endDate = nextMonthDate.getDate();

        let endDateStr = endYear + '' + (endMonth < 10 ? '0' + endMonth : endMonth.toString()) + (endDate < 10 ? '0' + endDate : endDate.toString());

        let startIndex = 0;

        let prefixStart = startDateStr.substring(0, 6);
        let startDateNumber = Number(startDateStr.substring(6, 8));
        let endDateNumber = Number(endDateStr.substring(6, 8));

        let arr = [];

        // 일자 객체 배열
        let dayIndex = firstDay;

        while (true) {

            if (startIndex < firstDay) {
                // setDateArr([...dateArr, {date: ''}]);
                arr.push({ date: '', });
                startIndex++;
            }
            else if (startDateNumber <= endDateNumber) {
                // setDateArr([...dateArr, {date: prefixStart + (startDateNumber < 10 ? '0' + startDateNumber : startDateNumber.toString())}]);
                arr.push({
                    date: prefixStart + (startDateNumber < 10 ? '0' + startDateNumber : startDateNumber.toString()),
                    day: dayIndex % 7,
                });
                startDateNumber++;
                dayIndex++;
            }
            else {
                break;
            }
        }
        if (scheduleData) {
            for (let i = 0; i < arr.length; i++) {
                let tempList = new Array();
                for (let j = 0; j < scheduleData.length; j++) {

                    const compareNo = scheduleData[j].scheduleDate.substring(0, 8);

                    if (arr[i].date === compareNo) {
                        let tempObj = {};
                        tempObj["contents"] = scheduleData[j].contents;
                        tempObj["time"] = scheduleData[j].scheduleDate.substring(8, 12);
                        tempList.push(tempObj);
                    }
                }
                arr[i]["scheduleList"] = tempList;
            }
        }

        let lineQty = Math.ceil(arr.length / 7);
        let targetLength = lineQty * 7;

        while (arr.length < targetLength) {
            arr.push({ date: '' });
        }

        // let resultList = [[], [], [], [], []];
        // for (let i = 0; i < arr.length; i++) {
        //     resultList[Math.floor(i / 7)].push(arr[i]);
        // }

        // setDateArr([...dateArr]);
        setDateArr(arr);
    }

    function convertIndexToDayString(dayIndex) {
        let result = '';
        switch (dayIndex) {
            case 0: result = '일';
                break;
            case 1: result = '월';
                break;
            case 2: result = '화';
                break;
            case 3: result = '수';
                break;
            case 4: result = '목';
                break;
            case 5: result = '금';
                break;
            case 6: result = '토';
                break;
        }
        return result;
    }

    function current() {
        let timeDate = new Date();
        let nowYear = timeDate.getFullYear();
        let nowMonth = timeDate.getMonth() + 1;
        let nowDate = timeDate.getDate();
        let formattedNowDate = nowYear + '' + (nowMonth < 10 ? '0' + nowMonth : nowMonth.toString()) + (nowDate < 10 ? '0' + nowDate : nowDate.toString());
        setToday(formattedNowDate);
        let hour = timeDate.getHours();
        let minute = timeDate.getMinutes();
        let second = timeDate.getSeconds();

        if (hour < 12) {
            if (hour < 10) {
                hour = "0" + hour;
            }
            hour = "오전 " + hour;
        }
        else {
            hour = hour - 12
            if (hour < 10) {
                hour = "0" + hour;
            }
            hour = "오후 " + hour;
        }

        if (minute < 10) {
            minute = "0" + minute;
        }

        if (second < 10) {
            second = "0" + second;
        }

        let currentTime = hour + ":" + minute + ":" + second;
        return currentTime;
    }

    // onMount
    useEffect(() => {

        let selectMonth = new Date();
        let nowYear = selectMonth.getFullYear();
        let nowMonth = selectMonth.getMonth() + 1;
        if (Number(nowMonth) < 10) nowMonth = '0' + nowMonth;
        selectMonth = nowYear + nowMonth;
        nowMonth--;

        let userInfoStr = localStorage.getItem('userInfo');
        let userInfoObject = JSON.parse(userInfoStr);

        //모듈화 해야하나
        fetch("http://localhost:8080/api/v1/calendars/selectMonthSchedule/", {
            method: "POST",
            cors: 'no-cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "memberNo": userInfoObject.memberNo,
                "selectMonth": selectMonth,
            }),
        }).then((response) => {
            return response.json();
        }).then((response) => {
            mainContent(nowYear, nowMonth, null, response);
            console.log(response);
        })

        setTime(current());
        setInterval(() => {
            setTime(current());
        }, 1000);

    }, []);

    // const makeDay = dateArr.map((item, i) => {
    //     return <div key={i}>{Number(item.date.substring(6,8))}</div>
    // })

    // const makeTd = (trItem) => {
    //     return trItem.map((tdItem, i) => {
    //         if (Number(tdItem.date.substring(6, 8)) === 0) {
    //             return <td key={i}></td>;
    //         }
    //         else {
    //             return <td key={i} onClick={() => {
    //                 console.log('td click');
    //             }}>{Number(tdItem.date.substring(6, 8))}</td>;
    //         }
    //     });
    // }
    const [titleSet, setTitleSet] = useRecoilState(titleStyle);
    const [buttonSet, setButtonSet] = useRecoilState(buttonStyle)

    const [tableSet, setTableSet] = useRecoilState(tableStyle);

    const [mainSet, setMainSet] = useRecoilState(mainStyle);
    const [paramSet, setParamSet] = useRecoilState(paramStyle);
    const [hoverSet, setHoverSet] = useRecoilState(hoverStyle);

    function scheduleList(item, today) {
        if (item.scheduleList.length !== 0) {
            return scheduleAlert(today);
        }
    }

    const makeDay = dateArr.map((item, i) => {
        // console.log(item);
        // 여기서 today 데이터 이용해서 과거는 연하게 가능할지도.
        let todayStyle = '';
        if (item.date === today) {
            todayStyle = 'outline-none ring ring-offset-2 ring-blue-500 font-semibold '
        }
        if (item.day === undefined) {
            return <div className={mainSet} key={i}></div>;
        }
        else if (item.day === 6) {
            if (today <= item.date) {
                return <div key={i}>
                    <button key={i} className={mainSet + paramSet + hoverSet
                        + "bg-cyan-50 hover:bg-cyan-100 text-cyan-400 hover:text-cyan-600 "
                        + todayStyle}
                        onClick={() => {
                            openModal()
                            setScheduleData(item)
                            setCompareDate(item.date.substring(0, 8))
                        }}><span>{Number(item.date.substring(6, 8))}</span>{scheduleList(item)}
                    </button>
                </div>
            }
            else {
                return <div key={i}>
                    <button key={i} className={mainSet + paramSet + hoverSet
                        + "bg-cyan-50 hover:bg-cyan-50 text-cyan-300 hover:text-cyan-300 "
                        + todayStyle}
                        onClick={() => {
                            openModal();
                            setScheduleData(item);
                            setCompareDate(item.date.substring(0, 8));
                        }}><span>{Number(item.date.substring(6, 8))}</span>{scheduleList(item, today)}
                    </button>
                </div>
            }
        }
        else if (item.day === 0) {
            if (today <= item.date) {
                return <div key={i}>
                    <button key={i} className={mainSet + paramSet + hoverSet + todayStyle
                        + "bg-red-100 hover:bg-red-200 text-red-400 hover:text-red-600"}
                        onClick={() => {
                            openModal();
                            setScheduleData(item);
                            setCompareDate(item.date.substring(0, 8));
                        }}><span>{Number(item.date.substring(6, 8))}</span>{scheduleList(item)}
                    </button>
                </div>
            }
            else {
                return <div key={i}>
                    <button key={i} className={mainSet + paramSet + hoverSet + todayStyle
                        + "bg-red-100 hover:bg-red-200 text-red-200 hover:text-red-300"}
                        onClick={() => {
                            openModal();
                            setScheduleData(item);
                            setCompareDate(item.date.substring(0, 8));
                        }}><span>{Number(item.date.substring(6, 8))}</span>{scheduleList(item, today)}
                    </button>
                </div>
            }
        }
        else {
            if (today <= item.date) {
                return <div key={i}>
                    <button key={i} className={mainSet + paramSet + hoverSet + todayStyle
                        + "bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-gray-600"}
                        onClick={() => {
                            openModal();
                            setScheduleData(item);
                            setCompareDate(item.date.substring(0, 8));
                        }}><span>{Number(item.date.substring(6, 8))}</span>{scheduleList(item)}
                    </button>
                </div>
            }
            else {
                return <div key={i}>
                    <button key={i} className={mainSet + paramSet + hoverSet + todayStyle
                        + "bg-slate-100 hover:bg-slate-200 text-slate-300 hover:text-gray-300"}
                        onClick={() => {
                            openModal();
                            setScheduleData(item);
                            setCompareDate(item.date.substring(0, 8));
                        }}><span>{Number(item.date.substring(6, 8))}</span>{scheduleList(item, today)}
                    </button>
                </div>
            }
        }
    });

    return (
        <>
            <h1 className={titleSet + "m-5 text-3xl text-indigo-600"}>Calendar</h1>
            <h3 className={titleSet + 'text-indigo-700'}>{currentYear}년</h3>
            <div id='time' className={titleSet + "text-blue-700"}>{time}</div>

            <div id='sub-title'>
                <button id='before' className={buttonSet} onClick={() => {
                    mainContent(currentYear, Number(currentMonth), 'prev')
                }}>◀</button>
                <div className={titleSet + "month"}>{monthName}</div>

                <button id='next' className={buttonSet} onClick={() => {
                    mainContent(currentYear, Number(currentMonth), 'next')
                }}>▶</button>
            </div>

            <div id="table" className={tableSet}>
                <div className='font-mono text-red-600'>Sun.</div>
                <div className='font-mono text-gray-600'>Mon.</div>
                <div className='font-mono text-gray-600'>Tue.</div>
                <div className='font-mono text-gray-600'>Wed.</div>
                <div className='font-mono text-gray-600'>Thu.</div>
                <div className='font-mono text-gray-600'>Fri.</div>
                <div className='font-mono text-cyan-600'>Sat.</div>
                {makeDay}
            </div>
            <Modal open={modalOpen} close={closeModal} scheduleData={scheduleData} today={today} compareDate={compareDate}></Modal>
        </>
    )
}

export default Calendar