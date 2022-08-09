import React from 'react'
import "../css/modal-style.css"

export const SubmitModal = (props) => {
    const { addDate, memberNo, subModalOpen, close } = props;
    return (
        <div className={subModalOpen ? 'openModal modal' : 'modal'}>
            {subModalOpen ? (
                <section>
                    <header className="font-['jalnan']" >
                        <button className="close font-['jalnan']" onClick={close}>
                            &times;
                        </button>
                    </header>
                    <main className="font-['jalnan']"><span></span></main>
                    {/* 이부분을 span으로 담아야함 */}
                    <div>
                    </div>
                    <footer>
                        <button className="close font-['jalnan']" onClick={close}>
                            close
                        </button>
                    </footer>
                </section>
            ) : null}
        </div>
    )
};

export default SubmitModal