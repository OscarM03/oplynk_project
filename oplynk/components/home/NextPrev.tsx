import React from 'react'

interface NextPrevProps {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
const NextPrev: React.FC<NextPrevProps> = ({ currentPage, setCurrentPage }) => {
    return (
        <div className={`flex my-6 ${currentPage === 0 ? 'justify-end' : 'justify-between'}`}>
            {currentPage > 0 && (
                <button className='btn' onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} disabled={currentPage === 0}>
                    Prev
                </button>
            )}
            <button className='btn' onClick={() => setCurrentPage((prev) => prev + 1)}>
                Next
            </button>
        </div>
    )
}

export default NextPrev
