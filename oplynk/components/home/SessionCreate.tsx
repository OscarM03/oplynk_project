"use client";

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import SessionForm from '../sessionpage/SessionForm';
import { IsUserLoggedIn } from '@/lib/actions/user.actions';
import useSignInModal from '@/hooks/useSignInModal';

const SessionCreate = ({setSession } : { setSession: (session: any) => void}) => {

    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [sessionFormOpen, setSessionFormOpen] = useState(false)
    const [sessionType, setSessionType] = useState('')

    const handleClose = () => {
		setIsOptionsOpen(false)
	}
	const signInModal = useSignInModal();
	const [loggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const checkLoggedIn = async () => {
            const loggedInStatus = await IsUserLoggedIn();
            setLoggedIn(loggedInStatus);
        }
        checkLoggedIn();
    }, [])

    
	const handleCreateSession = () => {
		if (loggedIn) {
			setIsOptionsOpen(true)
		} else {
			signInModal.open();
		}
	}

    return (
        <>
            <div className="flex justify-center">
                <button className="btn mt-4 flex gap-2 items-center" onClick={handleCreateSession}>
                    Create Session
                    <Image
                        src="/assets/icons/create.png"
                        alt="create"
                        width={20}
                        height={20}
                    />
                </button>
            </div>
            {isOptionsOpen && (
                <div className="flex-center bg-black/60 fixed inset-0 z-50">
                    <div className=" bg-white p-2 rounded-lg shadow-lg font-semibold relative">
                        <div className="p-4 border-b" onClick={() => {
                            setIsOptionsOpen(false)
                            setSessionType('group-fund')
                            setSessionFormOpen(true)
                        }}>
                            <h2 className="text-dodger-blue cursor-pointer hover:text-aqua-green">Create Group-fund Session</h2>
                        </div>
                        <div className="p-4" onClick={() => {
                            setIsOptionsOpen(false)
                            setSessionType('topic-based')
                            setSessionFormOpen(true)
                        }}>
                            <h2 className="text-dodger-blue cursor-pointer hover:text-aqua-green">Create Topic-based Session</h2>
                        </div>
                        <div className='absolute right-0 top-0' onClick={handleClose}>
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div>
                </div>
            )}
            {
                sessionFormOpen && (
                    <SessionForm
                        closeForm={() => setSessionFormOpen(false)}
                        type={sessionType}
                        setSession={setSession}
                    />
                )
            }
        </>
    )
}

export default SessionCreate
