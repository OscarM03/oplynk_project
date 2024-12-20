import { createWithdrawal } from '@/lib/actions/payments.action';
import { updateUserBalance } from '@/lib/actions/user.actions';
import Image from 'next/image'
import React, { useState } from 'react'

interface ProfileUpdateProps {
    user: any;
    closeForm: () => void;
}
const PaymentsWithdrawal = ({
    closeForm, user
}: ProfileUpdateProps) => {
    const [amount, setAmount] = useState(0);
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        try {
            const response = await createWithdrawal(email, amount);
            console.log("Withdrawal response", response);
            const status = response?.batch_header?.batch_status;


            if (
                status === 'PENDING' || status === 'SUCCESS'
            ) {
                updateUserBalance(-amount, user.$id);
                alert('Withdrawal request sent successfully!');
                closeForm();
            } else {
                throw new Error('Withdrawal response validation failed.');
            }

        } catch (error: any) {
            console.error('Error during withdrawal:', error.message);
            alert('Failed to process the withdrawal request. Please try again later.,');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <section className="flex-center bg-black/60 fixed inset-0 z-50">
            <div className="flex flex-col items-center border rounded-lg bg-white relative w-[400px]">
                <div className="bg w-full py-4 rounded-t-lg text-center font-bold">
                    <h2 className="text-white cursor-pointer text-xl">Update Profile</h2>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 w-full">
                    <input
                        type="number"
                        placeholder="Enter Amount"
                        onChange={(e) => setAmount(e.target.valueAsNumber)}
                        className="form-input"
                    />

                    <input
                        type="text"
                        placeholder="Enter Your PayPal Email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input"
                    />
                    {errorMessage && <div className="text-red-600">*{errorMessage}</div>}
                    <button className="btn flex justify-center" disabled={isLoading}>
                        <h2>Withdraw</h2>
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
                <div className="absolute right-0 top-0" onClick={closeForm}>
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                </div>
            </div>
        </section>
    )
}

export default PaymentsWithdrawal
