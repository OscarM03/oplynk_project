import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getGifts, addGiftToReceiver } from '@/lib/actions/gifts.action';
import { updateSessionContributions } from '@/lib/actions/session.actions';
import { getCurrentUser, updateUserBalance } from '@/lib/actions/user.actions';
import { appwriteconfig } from '@/lib/appwrite/config';
import { imageUrl } from '@/lib/utils';

interface GiftProps {
    closeGifts: () => void;
    receiverId: string;
    sessionId: string;
}

const Gifts = ({ closeGifts, receiverId, sessionId }: GiftProps) => {
    const [gifts, setGifts] = useState<any[]>([]);
    const [loadingGifts, setLoadingGifts] = useState<{ [key: string]: boolean }>({}); // Track loading for each gift

    useEffect(() => {
        const fetchGifts = async () => {
            try {
                const fetchedGifts = await getGifts();
                setGifts(fetchedGifts);
            } catch (error) {
                console.error("Error fetching gifts", error);
            }
        };
        fetchGifts();
    }, []);

    const handleGiftSend = async (giftWorth: number, giftId: string) => {
        setLoadingGifts((prev) => ({ ...prev, [giftId]: true }));

        try {
            const currentUser = await getCurrentUser();

            if (currentUser.balance >= giftWorth) {
                const response = await addGiftToReceiver(receiverId, giftId, giftWorth);

                if (response) {
                    try {
                        await Promise.all([
                            updateUserBalance(-giftWorth, currentUser.$id),
                            updateSessionContributions(sessionId, giftWorth, giftId),
                        ]);
                        console.log('giftId:', giftId);
                        alert('Gift sent successfully!');
                    } catch (error) {
                        console.error('Error updating balance or session contributions:', error);
                        alert('An error occurred while processing your gift. Please try again.');
                    }
                } else {
                    alert('Failed to send the gift. Please try again.');
                }
            } else {
                alert('Insufficient balance to send the gift. Please recharge');
            }
            closeGifts();
        } catch (error) {
            console.error('Error sending gift:', error);
            alert('An error occurred while sending the gift. Please try again.');
        } finally {
            setLoadingGifts((prev) => ({ ...prev, [giftId]: false }));
        }
    };

    return (
        <section className="flex-center bg-black/60 fixed inset-0 z-50">
            <div className="flex flex-col items-center border rounded-lg bg-white relative">
                <div className="bg w-full py-4 rounded-t-lg text-center font-bold">
                    <h2 className="text-white cursor-pointer text-xl">Gifts</h2>
                </div>
                <div className="flex flex-wrap p-4 space-x-4">
                    {gifts.map((gift) => (
                        <div
                            key={gift.$id}
                            className="flex flex-col items-center shadow-lg rounded-lg w-[100px] cursor-pointer"
                        >
                            <Image
                                src={imageUrl(appwriteconfig.giftsBucketId, gift.giftId)}
                                alt={gift.name}
                                width={60}
                                height={60}
                                className="transform transition duration-300 hover:scale-110"
                                onClick={() => handleGiftSend(gift.amount, gift.giftId)}
                            />
                            <p className="text-sm text-gray-700 font-bold">{gift.name}</p>
                            <p className="text-sm text-gray-700 font-extrabold">${gift.amount}</p>
                            {loadingGifts[gift.giftId] && (
                                <div className="flex justify-center bg w-full rounded-b-lg">
                                    <Image
                                        src="/assets/icons/loader.svg"
                                        alt="loader"
                                        width={24}
                                        height={24}
                                        className="animate-spin"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="absolute right-0 top-0" onClick={closeGifts}>
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default Gifts;
