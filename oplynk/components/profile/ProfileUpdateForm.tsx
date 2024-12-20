"use client";

import React, { useState } from "react";
import Image from "next/image";
import { updateUser } from "@/lib/actions/user.actions";

interface ProfileUpdateProps {
    user: any;
    closeForm: () => void;
    setUser: (user: any) => void;
}

const ProfileUpdateForm = ({
    user,
    closeForm,
    setUser,
}: ProfileUpdateProps) => {
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [image, setImage] = useState<File | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        try {
            const formData = { username, email, image, userId: user.$id };
            const updatedUser = await updateUser(formData);
            setUser(updatedUser);
            closeForm();
        } catch (error) {
            setErrorMessage("Failed to update profile. Please try again.");
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
                        type="text"
                        value={username}
                        placeholder="Enter Your Username"
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-input"
                    />
                    <input
                        type="email"
                        value={email}
                        placeholder="Enter Your Email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="form-input"
                    />
                    {errorMessage && <div className="text-red-600">*{errorMessage}</div>}
                    <button className="btn flex justify-center" disabled={isLoading}>
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
    );
};

export default ProfileUpdateForm;
