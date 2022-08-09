import React from 'react'
import "../css/modal-style.css"
import SubmitModal from './SubmitModal';
import InsertButton from './InsertButton';

export const Modal = (props) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header, today, compareDate } = props;
    let selectDate;
    let selectDateMonth;
    let selectDateDay;

    if (header !== undefined) {
        selectDateMonth = Number(header.date.substring(4, 6));
        selectDateDay = Number(header.date.substring(6));
        selectDate = selectDateMonth + "월 " + selectDateDay + "일 ";
    }
    // if (props !== null || props !== undefined) {
    //     let selectDate = header.date.substr(4)
    // }

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

                        {today > compareDate ? (
                            //포문돌아가야할듯
                            <div id="content" className='border h-11 rounded-xl m-1 px-1'>
                                <span>13:11</span>
                                <span className='w-80 text-center'>{header.schedule}</span>
                                <div className='h-12 w-12 mx-2'></div>
                            </div>
                        ) :
                            <div id="content" className='border h-11 rounded-xl m-1 px-1'>
                                <span>14:11</span>
                                <span className='w-80 text-center'>{header.schedule}</span>
                                <button id='updateButton' className="text-xs h-6 w-6 mx-1">
                                    <img src="images/update2.png" alt="" className='h-full w-full hover:scale-110' />
                                </button>
                                <button id='deleteButton' className="text-xs h-6 w-6 mx-1">
                                    <img src="images/delete2.png" alt="" className='h-full w-full hover:scale-110' />
                                </button>
                            </div>
                        }


                    </main>
                    {/* 이부분을 span으로 담아야함 */}
                    <InsertButton today={today} header={header}></InsertButton>
                    <footer>
                        <button className="close font-['jalnan']" onClick={close}>
                            close
                        </button>
                    </footer>
                </section>
            ) : null}
            <SubmitModal/>
        </div>
    );
};