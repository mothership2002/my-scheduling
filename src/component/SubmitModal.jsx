import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import { userInfo } from '../store/atom/loginInfo'
import "../css/modal-style.css"

import { resultList } from "../store/mainContents"

export const SubmitModal = (props) => {
    const { addDate, memberNo, subModalOpen, close } = props;

    const [hourData, setHourData] = useState();
    const [minuteData, setMinuteData] = useState();
    const [contentsData, setContentsData] = useState();
    const [userInfoSet, setUserInfoSet] = useRecoilState(userInfo);
    const [resultArray, setResultArray] = useRecoilState(resultList);

    return (
        <div className={(subModalOpen ? 'openModal modal' : 'modal') + " subModal"}>
            {subModalOpen ? (
                <section id="subSection">
                    <header className="font-['jalnan']" >
                        일정 추가
                        <button className="close font-['jalnan']" onClick={close}>
                            &times;
                        </button>
                    </header>
                    <main className="font-['jalnan'] flex justify-center align-middle " id="submitContents">
                        <select name="hour" id="hour" className='mx-1 border-2 w-18 h-10 rounded-lg px-2' onChange={(e) => {
                            setHourData(e.target.value);
                        }}>
                            <option value="" defaultValue={null}>시간</option>
                            <option value="00">00</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                        </select>
                        <select name="minute" id="minute" className='mx-1 border-2 w-16 h-10 rounded-lg px-2' onChange={(e) => {
                            setMinuteData(e.target.value)
                        }}>
                            <option value="" defaultValue={null}>분</option>
                            <option value="00">00</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                            <option value="32">32</option>
                            <option value="33">33</option>
                            <option value="34">34</option>
                            <option value="35">35</option>
                            <option value="36">36</option>
                            <option value="37">37</option>
                            <option value="38">38</option>
                            <option value="39">39</option>
                            <option value="40">40</option>
                            <option value="41">41</option>
                            <option value="42">42</option>
                            <option value="43">43</option>
                            <option value="44">44</option>
                            <option value="45">45</option>
                            <option value="46">46</option>
                            <option value="47">47</option>
                            <option value="48">48</option>
                            <option value="49">49</option>
                            <option value="50">50</option>
                            <option value="51">51</option>
                            <option value="52">52</option>
                            <option value="53">53</option>
                            <option value="54">54</option>
                            <option value="55">55</option>
                            <option value="56">56</option>
                            <option value="57">57</option>
                            <option value="58">58</option>
                            <option value="59">59</option>
                        </select>
                        <input name="contents" type="text" className='mx-1 border-2 h-10 w-64 rounded-lg px-4' maxLength={30} placeholder={"최대 30글자"} onChange={
                            (e) => {
                                setContentsData(e.target.value);
                            }
                        } />
                    </main>
                    <footer className="flex justify-center">
                        <button className="add font-['jalnan'] h-full text-base" id="submitButton" onClick={() => {
                            if (hourData == "" || minuteData == "" || hourData === undefined || minuteData === undefined || contentsData == "" || contentsData === undefined) {
                                alert("시간과 내용을 확인해주세요.")
                            }
                            else {
                                fetch("http://aiueo.iptime.org:8080/api/v1/calendars/insert-schedule", {
                                    method: "POST",
                                    cors: 'no-cors',
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        "memberNo": userInfoSet,
                                        "addDate": addDate,
                                        "addHour": hourData,
                                        "addMinute": minuteData,
                                        "contents": contentsData
                                    }),
                                }).then((response) => {
                                    return response.json()
                                }).then((response) => {
                                    if (response.Length != 0) {
                                        alert("일정추가")
                                        setResultArray(response)
                                        setTimeout(function () {
                                            window.location.reload();
                                        }, 1000);
                                    }
                                })
                            }
                        }}>일정 추가하기</button>
                    </footer>
                </section>
            ) : null}
        </div>
    )
};

export default SubmitModal