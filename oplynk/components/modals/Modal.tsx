"use client";

import React, { useCallback, useEffect, useState } from 'react'

interface ModalProps {
    label: string;
    content: React.ReactElement;
    isOpen: boolean;
    close: () => void;
}

const Modal: React.FC<ModalProps> = ({
    label,
    content,
    isOpen,
    close
}) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen)
    }, [isOpen])

    const handleClose = useCallback(() => {
        setShowModal(false)

        setTimeout(() => {
            close()
        }, 300)
    }, [close])

    if (!isOpen) return null;

    return (
        <section className="flex-center bg-black/60 fixed inset-0 z-50">
            <div className='w-[90%] md:w-[80%] lg:w-[500px] h-auto mx-auto '>
                <div className='w-full h-auto bg-white flex flex-col items-center rounded-lg relative'>
                    <div className='py-4 w-full text-center bg rounded-t-lg mb-4'>
                        <div className='absolute right-0 top-0' onClick={handleClose}>
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className='text-2xl text-white font-extrabold'>{label}</h2>
                    </div>
                    <div className='w-full px-4'>
                        {content}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Modal
