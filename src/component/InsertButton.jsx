import React, { useState } from 'react'
import SubmitModal from './SubmitModal';
import { addButtonStyle } from '../store/atom/AddButtonStyle';
import { useRecoilState } from 'recoil';

const InsertButton = (props) => {
    const [addButtonSet, setAddButtonSet] = useRecoilState(addButtonStyle);
    const { today, scheduleData } = props;

    let userInfoStr = localStorage.getItem('userInfo');
    let userInfoObject = JSON.parse(userInfoStr);

    const [memberNo, setMemberNo] = useState(userInfoObject.memberNo);
    const [modalOpen, setModalOpen] = useState();
    const [addDate, setAddDate] = useState(scheduleData.date);

    function openModal() {
        setModalOpen(true);
    };
    function closeModal() {
        setModalOpen(false);
    };

    if (today <= scheduleData.date) {
        return (
            <div>
                <button id="addButton" className={addButtonSet} onClick={() => {
                    openModal()
                }}> 일정 추가 하기 + </button>
                <SubmitModal subModalOpen={modalOpen} close={closeModal} memberNo={memberNo} addDate={addDate}/>
            </div>
        )
    }
    return (
        <div></div>
    );
}

export default InsertButton