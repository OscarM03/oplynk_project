"use client";

import { getGifts } from '@/lib/actions/gifts.action';
import { appwriteconfig } from '@/lib/appwrite/config';
import { imageUrl } from '@/lib/utils';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
interface GiftProps {
    closeGifts: () => void;
}
const Gifts = ({closeGifts}: GiftProps) => {

    const [gifts, setGifts] = useState<any[]>([])

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

    // const gifts = [
    //     {
    //         name: 'Flower',
    //         amount: 1,
    //         image: '/assets/stickers/flower.png'
    //     },
    //     {
    //         name: 'Sweet Piece',
    //         amount: 2,
    //         image: '/assets/stickers/cake.png'
    //     },
    //     {
    //         name: 'Singing Bird',
    //         amount: 3,
    //         image: '/assets/stickers/bird.png'
    //     },
    //     {
    //         name: 'Super Ride',
    //         amount: 4,
    //         image: '/assets/stickers/car.png'
    //     },
    //     {
    //         name: 'Knowledge',
    //         amount: 5,
    //         image: '/assets/stickers/book.png'
    //     },
    // ]
    return (
        <section className='flex-center bg-black/60 fixed inset-0 z-50'>
            <div className='flex flex-col items-center border rounded-lg bg-white relative'>
                <div className='bg w-full py-4 rounded-t-lg text-center font-bold'>
                    <h2 className='text-white cursor-pointer  text-xl'>Gifts</h2>
                </div>
                <div className='flex flex-wrap p-4 space-x-4'>
                    {
                        gifts.map((gift) => (
                            <div key={gift.name} className='flex flex-col items-center shadow-lg rounded-lg w-[100px] cursor-pointer'>
                                <Image src={imageUrl(appwriteconfig.giftsBucketId, gift.giftId)} alt={gift.name} width={60} height={60} className='transform transition duration-300 hover:scale-110'/>
                                <p className='text-sm text-gray-700 font-bold '>{gift.name}</p>
                                <p className='text-sm text-gray-700 font-extrabold '>${gift.amount}</p>
                            </div>
                        ))
                    }
                </div>
                <div className='absolute right-0 top-0' onClick={closeGifts}>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
        </section>
    )
}

export default Gifts
