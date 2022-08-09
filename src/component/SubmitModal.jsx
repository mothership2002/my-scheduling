import React from 'react'

export const SubmitModal = (props) => {
    const { ID } = props;
    return 
        // 모달이 열릴때 openModal 클래스가 생성된다.
        // <div className={open ? 'openModal modal' : 'modal'}>
        //     {open ? (
        //         <section>
        //             <header className="font-['jalnan']" >
        //                 {selectDate}
        //                 <button className="close font-['jalnan']" onClick={close}>
        //                     &times;
        //                 </button>
        //             </header>
        //             <main className="font-['jalnan']"><span>{header.schedule}</span></main>
        //             {/* 이부분을 span으로 담아야함 */}
        //             <div>
        //                 <button id="addButton" className={addButtonSet} onClick={()=>{
                            
        //                 }}> 일정 추가 하기 + </button>
        //             </div>
        //             <footer>
        //                 <button className="close font-['jalnan']" onClick={close}>
        //                     close
        //                 </button>
        //             </footer>
        //         </section>
        //     ) : null}
        // </div>
    
};

export default SubmitModal