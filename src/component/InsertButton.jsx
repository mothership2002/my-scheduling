import React from 'react'
import { addButtonStyle } from '../store/atom/AddButtonStyle';
import { useRecoilState } from 'recoil';

const InsertButton = (props) => {
    const [addButtonSet, setAddButtonSet] = useRecoilState(addButtonStyle);
    const { today, header } = props;

    if (today <= header.date) {
        return (
            <div>
                <button id="addButton" className={addButtonSet} onClick={() => {

                }}> 일정 추가 하기 + </button>
            </div>
        )
    }
    return;
}

export default InsertButton