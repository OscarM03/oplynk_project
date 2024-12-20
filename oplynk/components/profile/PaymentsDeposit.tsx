import { createPayment } from '@/lib/actions/payments.action';
import Image from 'next/image'
import React, { useState } from 'react'

interface ProfileUpdateProps {
    user: any;
    closeForm: () => void;
}
const PaymentsDeposit = ({
    closeForm, user
}: ProfileUpdateProps) => {
    const [amount, setAmount] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(""); // Reset the error message
    
        try {
            // Create a payment using the amount and PayPal redirect URLs
            const response = await createPayment(amount, 'http://localhost:3000/success', `http://localhost:3000/profile/${user.$id}`);
    
            // Check if PayPal response has approval URLs
            const approvalUrl = response.links?.find((link: any) => link.rel === 'approval_url')?.href;
    
            if (approvalUrl) {
                // Redirect the user to PayPal for approval
                window.location.href = approvalUrl;
            }
    
            console.log("PayPal payment response:", response);
            closeForm(); // Close the form after submission
        } catch (error: any) {
            // Log the error and display it to the user
            console.error("Payment creation error:", error);
            setErrorMessage(error?.message || "An error occurred while processing the payment.");
        } finally {
            setIsLoading(false); // Reset the loading state
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
                    {errorMessage && <div className="text-red-600">*{errorMessage}</div>}
                    <button className="btn flex justify-center" disabled={isLoading}>
                        <h2>Deposit</h2>
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

export default PaymentsDeposit
