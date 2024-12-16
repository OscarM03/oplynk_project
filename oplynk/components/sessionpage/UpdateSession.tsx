
import Image from 'next/image';
import React, { useState } from 'react'
import { updateSession } from '@/lib/actions/session.actions';

interface updateSessionProps {
    closeForm: () => void;
    session: any;
    setSession: (session: any) => void;
}
const UpdateSession: React.FC<updateSessionProps> = (
    { closeForm, session, setSession }
) => {
    const [sessionTitle, setSessionTitle] = useState(session.title)
    const [sessionCategory, setSessionCategory] = useState(session.category)
    const [sessionDescription, setSessionDescription] = useState(session.description)
    const [target, setTarget] = useState(session.target)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = {
            title: sessionTitle,
            category: sessionCategory,
            description: sessionDescription,
            sessionId: session.$id,
            target,
        }
        try {
            const session = await updateSession(formData)
            if (session.$id) {
                setSession(session)
                closeForm()
            }

        } catch (error) {
            setErrorMessage(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="flex-center bg-black/60 fixed inset-0 z-50">
            <div className='flex flex-col items-center border rounded-lg bg-white relative w-[400px]'>
                <div className='bg w-full py-4 rounded-t-lg text-center font-bold'>
                    <h2 className="text-white cursor-pointer  text-xl">Create Session</h2>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-4 p-4 w-full'>
                    <input 
                    type='text' 
                    value={sessionTitle}
                    placeholder='Enter Your Session Title' 
                    onChange={(e) => setSessionTitle(e.target.value)} className='form-input' 
                    />

                    <input 
                    type='text'
                    value={sessionCategory}
                    placeholder='Enter Your Session Category'
                    onChange={(e) => setSessionCategory(e.target.value)} className='form-input' 
                    />

                    {session.target > 0 && (
                        <input 
                        type='number'
                        value={target}
                        placeholder='Enter Your Traget Amount' 
                        onChange={(e) => setTarget(parseInt(e.target.value) || 0)} 
                        className='form-input' />
                    )}
                    <textarea
                    value={sessionDescription}
                    placeholder='Enter Your Session Description' onChange={(e) => setSessionDescription(e.target.value)} 
                    className='form-input'>

                    </textarea>

                    {errorMessage && (
                        <div className='text-red-600 '>
                            *{errorMessage}
                        </div>
                    )
                    }

                    <button className='btn flex justify-center' disabled={isLoading}>
                        Update
                        {isLoading && (
                            <Image
                                src="/assets/icons/loader.svg"
                                alt="loader"
                                width={24}
                                height={24}
                                className="animate-spin ml-2"
                            />
                        )}
                    </button>
                </form>
                <div className='absolute right-0 top-0' onClick={closeForm}>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
        </section>
    )
}

export default UpdateSession

