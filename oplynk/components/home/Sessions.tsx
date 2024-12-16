"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { getUserById, IsUserLoggedIn } from '@/lib/actions/user.actions';
import { getSessions } from '@/lib/actions/session.actions';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import useSignInModal from '@/hooks/useSignInModal';

interface sessionProps {
    params: string | null;
    newSession: any;
}
const Sessions = ({ params, newSession } : sessionProps) => {
    const router = useRouter();
    const SignInModal = useSignInModal();
    const [sessions, setSessions] = useState<any[]>([]);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const fetchData = async (params: string | null) => {
            try {
                const sessionsData = await getSessions(params);
                const userIsLoggedIn = await IsUserLoggedIn();
                setLoggedIn(userIsLoggedIn);
                
                const sessionsWithUsers = await Promise.all(
                    sessionsData.map(async (session) => {
                        try {
                            const user = await getUserById(session.user_Id);
                            return {
                                ...session,
                                user,
                            };
                        } catch (error) {
                            console.error("Error fetching user data", error);
                            return { ...session, user: null };
                        }
                    })
                )
                setSessions(sessionsWithUsers);
                console.log("sessions", sessionsWithUsers);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchData(params);
    }, [params]);

    const handleAddSession = async (newSession: any) => {
        const user = await getUserById(newSession.user_Id);

        if (!newSession || !user) {
            console.error("Invalid session or user data");
            return;
        }

        try {
            setSessions((prevSessions) => [
                {
                    ...newSession,
                    user,
                },
                ...prevSessions
            ])
        } catch (error) {
            console.error("Error adding session", error);
        }
    }

    useEffect(() => {
        if (newSession) {
            handleAddSession(newSession);
        }
    }, [newSession]);

    const handleSessionClick = (sessionId: string) => {
        if (loggedIn) {
            router.push(`/sessions/${sessionId}`);
        } else {
            SignInModal.open();
        }
    }
    return (
        <div className="my-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {sessions.map((session) => (
                <div className=" bg rounded-lg" key={session.$id}>
                    <div className="h-full rounded-lg p-4 bg-white shadow-royal-blue relative translate-x-3 translate-y-3 max-sm:translate-x-2 max-sm:translate-y-2">
                        
                        <div className="flex justify-between items-center">
                            <h1 className="font-bold ">{format(new Date(session.$createdAt), 'PPP')}</h1>
                            <p className="text-dodger-blue font-extrabold bg-body-bg px-4 py-1 rounded-full ">
                                {session.category}
                            </p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <h1 className="text-lg font-bold text-dodger-blue">
                                {session.user.username}
                            </h1>
                            <Image
                                src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
                                alt="avatar"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        </div>
                        <div className="flex flex-col items-center gap-6 mt-2">
                            <h1 className="text-3xl font-extrabold mt-2 cursor-pointer" onClick={() => handleSessionClick(session.$id)}>
                                {session.title}
                            </h1>
                        </div>
                        <p className="text-gray-700 font-medium text-center mt-4">
                            {session.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Sessions
