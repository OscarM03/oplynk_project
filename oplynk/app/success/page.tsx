"use client";

import React, { useEffect, useState } from 'react';
import { executePayment } from '@/lib/actions/payments.action';
import { getCurrentUser, updateUserBalance } from '@/lib/actions/user.actions';
import Link from 'next/link';

const SuccessPage = () => {
    const [status, setStatus] = useState<string>('Loading payment status...');
    const [transactionDetails, setTransactionDetails] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPaymentStatus = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const paymentId = urlParams.get('paymentId');
            const payerId = urlParams.get('PayerID');

            if (!paymentId || !payerId) {
                setError('Missing payment details in URL.');
                setStatus('Error confirming payment.');
                return;
            }

            try {
                const [paymentDetails, user] = await Promise.all([
                    executePayment(paymentId, payerId),
                    getCurrentUser(),
                ])
                setStatus('Payment confirmed successfully.');
                setTransactionDetails(paymentDetails);

                const transactionAmount = parseFloat(paymentDetails.transactions[0].amount.total);

                await updateUserBalance(transactionAmount, user.$id);
            } catch (err) {
                console.error('Error confirming payment:', err);
                setError('Failed to confirm payment.');
                setStatus('Error confirming payment.');
            }
        };
        fetchPaymentStatus();
    }, []);

    return (
        <section className="flex-center bg-black/60 fixed inset-0 z-50">
            <div className="flex flex-col items-center border rounded-lg bg-white relative w-[400px]">
                <div className="w-full py-4 rounded-t-lg text-center font-bold bg">
                    <h2 className="text-white text-xl">Payment Status</h2>
                </div>
                <div className="p-4">
                    <p className="text-sm text-gray-700">{status}</p>
                    {error && <p className="text-red-500">{error}</p>}
                    {transactionDetails && (
                        <pre className="mt-4 p-2 bg-gray-100 rounded text-sm text-black overflow-auto">
                            {JSON.stringify(transactionDetails, null, 2)}
                        </pre>
                    )}
                </div>
                <div className='text-end p-4 w-full text-sm textcolor font-bold'>
                    <Link href="/">
                        <p>Return Home</p>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default SuccessPage;
