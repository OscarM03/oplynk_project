"use client";

import { getUserSessions } from '@/lib/actions/session.actions';
import { getCurrentUser } from '@/lib/actions/user.actions';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import ProfileUpdateForm from '@/components/profile/ProfileUpdateForm';
import { imageUrl } from '@/lib/utils';
import { appwriteconfig } from '@/lib/appwrite/config';
import PaymentsDeposit from '@/components/profile/PaymentsDeposit';
import PaymentsWithdrawal from '@/components/profile/PaymentsWithdrawal';

interface ProfileProps {
    params: Promise<{ id: string }>;
}

const Profile: React.FC<ProfileProps> = ({ params }) => {
    const [currentUser, setCurrentUser] = useState<any>();
    const [sessions, setSessions] = useState<any[]>([]);
    const [isProfileFormOpen, setIsProfileFormOpen] = useState(false);
    const [isDepositFormOpen, setIsDepositFormOpen] = useState(false);
    const [isWithdrawFormOpen, setIsWithdrawFormOpen] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { id } = await params;

                const [userSessions, user] = await Promise.all([
                    getUserSessions(id),
                    getCurrentUser()
                ]);

                setCurrentUser(user);
                setSessions(userSessions);
                console.log('user', user)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchUserData();
    }, [params]);

    return (
        <section>
            <div className='pd-x xl:flex xl:space-x-4 mt-10 max-xl:space-y-10'>
                <div className='flex flex-col items-center space-y-6 bg-white xl:w-[30%] rounded-md h-[400px]'>

                    {currentUser ? (

                        <>
                            <div className='p-4'>
                                <Image
                                    src={imageUrl(appwriteconfig.bucketId, currentUser.profileImageId)}
                                    alt="avatar"
                                    width={200}
                                    height={200}
                                    className="rounded-full shadow-lg border-2 border-dodger-blue"
                                />
                            </div>
                            <h1 className='text-black font-bold text-2xl'>{currentUser.username}</h1>
                            <h2 className='textcolor font-bold'>{currentUser.email}</h2>
                        </>
                    ) : (
                        <p>Loading user data...</p>
                    )}
                    <button className='btn' onClick={() => setIsProfileFormOpen(true)}>
                        <h2>Update</h2>
                    </button>
                </div>
                <div className='flex flex-col items-center bg-white xl:w-[70%] rounded-md'>
                    <div className='bg w-full rounded-t-lg text-center py-2'>
                        <h1 className='text-white text-2xl font-extrabold'>My Wallet</h1>
                    </div>
                    {currentUser && (
                        <h1 className='text-xl font-extrabold mt-6'>Balance: ${currentUser.balance}</h1>
                    )}
                    <div className='flex justify-between space-x-28 mt-6'>
                        <button className='btn' onClick={() => setIsDepositFormOpen(true)}>Deposit</button>
                        <button className='btn' onClick={() => setIsWithdrawFormOpen(true)}>Withdraw</button>
                    </div>
                    <div className='bg-white w-[90%] max-sm:w-full my-10 text-center border-4 border-dodger-blue rounded-lg p-4'>
                        <h1 className='text-black text-xl font-extrabold'>My Sessions</h1>
                        <div className="my-10 grid grid-cols-1 xl:grid-cols-2 gap-10">
                            {sessions.map((session) => (
                                <div className="bg rounded-lg" key={session.$id}>
                                    <div className="h-full rounded-lg p-4 bg-white shadow-royal-blue relative translate-x-3 translate-y-3 max-sm:translate-x-2 max-sm:translate-y-2">
                                        <div className="flex justify-between items-center">
                                            <h1 className="font-bold">{format(new Date(session.$createdAt), 'PPP')}</h1>
                                            <p className="text-dodger-blue font-extrabold bg-body-bg px-4 py-1 rounded-full">
                                                {session.category}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between mt-4">
                                            <h1 className="text-lg font-bold text-dodger-blue">
                                                {currentUser.username}
                                            </h1>
                                            <Image
                                                src={imageUrl(appwriteconfig.bucketId, currentUser.profileImageId)}
                                                alt="avatar"
                                                width={40}
                                                height={40}
                                                className="rounded-full"
                                            />
                                        </div>
                                        <div className="flex flex-col items-center gap-6 mt-2">
                                            <Link href={`/sessions/${session.$id}`}>
                                                <h1 className="text-3xl font-extrabold mt-2 cursor-pointer">
                                                    {session.title}
                                                </h1>
                                            </Link>
                                        </div>
                                        <p className="text-gray-700 font-medium text-center mt-4">
                                            {session.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {isProfileFormOpen && (
                <ProfileUpdateForm
                    user={currentUser}
                    closeForm={() => setIsProfileFormOpen(false)}
                    setUser={setCurrentUser}
                />
            )}
            {isDepositFormOpen && (
                <PaymentsDeposit
                    closeForm={() => setIsDepositFormOpen(false)}
                    user={currentUser}
                />
            )}
            {isWithdrawFormOpen && (
                <PaymentsWithdrawal
                    closeForm={() => setIsWithdrawFormOpen(false)}
                    user={currentUser}
                />
            )}
        </section>
    );
};

export default Profile;
