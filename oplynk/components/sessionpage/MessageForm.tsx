"use client";

import { deleteMessage, getMessageById, getMessages, sendMessage, updateMessage } from '@/lib/actions/message.action';
import { getCurrentUser, getUserById } from '@/lib/actions/user.actions';
import { format, set } from 'date-fns';
import Image from 'next/image'
import React, { useEffect, useState } from "react";

const MessageForm = ({ sessionId }: { sessionId: string }) => {

    const [currentMessage, setCurrentMessage] = useState("")
    const [messages, setMessages] = useState<any[]>([])
    const [user, setUser] = useState<any>(null)
    const [editingMesageId, setEditingMessageId] = useState("")

    useEffect(() => {
        const fetchMessages = async (sessionId: string) => {
            try {
                const allMessages = await getMessages(sessionId);

                const allMessagesWithUsers = await Promise.all(
                    allMessages.map(async (message) => {
                        try {
                            const user = await getUserById(message.userId)
                            const currentUser = await getCurrentUser()
                            setUser(currentUser)
                            return {
                                ...message,
                                user,
                            }
                        } catch (error) {
                            console.error("Error fetching user data", error)
                            return { ...message, user: null }
                        }
                    })
                )
                setMessages(allMessagesWithUsers)
                console.log("Messages", allMessagesWithUsers)
            } catch (error) {
                console.error("Error fetching messages", error)
            }
        }
        fetchMessages(sessionId)
    }, [sessionId]);

    const handleMessageEdit = async (messageId: string) => {
        try {
            const message = await getMessageById(messageId);
            console.log("Message to edit", message)
            setCurrentMessage(message.message);
            setEditingMessageId(messageId);
        } catch (error) {
            console.error("Error editing message", error)
        }
    }

    const handleDeleteMessage = async (messageId: string) => {
        try {
            await deleteMessage(messageId);

            setMessages((prevMessages) => 
                prevMessages.filter((message) => message.$id !== messageId))
        } catch (error) {
            console.error("Error deleting message", error)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentMessage.trim()) return;

        if (editingMesageId) {

            await updateMessage(currentMessage, editingMesageId);
            setMessages((prevMessages) => 
                prevMessages.map((message) => 
                    message.$id === editingMesageId ? { ...message, message: currentMessage } : message
                )
            );
            setEditingMessageId("");
            setCurrentMessage("");
        } else {
            const formData = {
                message: currentMessage,
                sessionId
            }
            try {
                const newMessage = await sendMessage(formData);
    
                const user = await getUserById(newMessage.userId);
    
                setMessages((prevMessages) => [
                    
                    {
                        ...newMessage,
                        user,
                    },
                    ...prevMessages,
                    
                ]);
                setCurrentMessage("");
            } catch (error) {
                console.error("Error sending message", error)
            }
        }
    };

    

    return (
        <div className="w-full bg-white rounded-lg h-[600px] border-4 border-dodger-blue">
            <div className="p-4 flex flex-col-reverse gap-4 h-[85%] overflow-hidden overflow-y-scroll remove-scrollbar">
                {messages.map((message) => (
                    <div key={message.$id} className=" text-white relative flex items-center space-x-4 border-2 border-gray-200 p-2 rounded-md">
                        <div className="flex flex-col items-center space-y-2">
                            <Image
                                src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
                                alt="avatar"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        </div>

                        <div className='w-full'>
                            <div className="flex justify-between items-center">
                                <div className="text-sm textcolor font-extrabold">
                                    <h2 className="">{message.user.username}</h2>
                                </div>
                                <div className="text-xs textcolor font-bold text-right">
                                    <p>{format(new Date(message.$createdAt), 'PPpp')}</p>
                                </div>
                            </div>
                            <p className="text-gray-700 text-sm font-bold">
                                {message.message}
                            </p>
                        </div>
                        {user && message && message.userId === user.$id && (
                            <div className='absolute right-5 -top-4 flex space-x-2'>
                            <div className='border p-1 rounded-full bg-white shadow-lg' onClick={() => handleMessageEdit(message.$id)}>
                                <Image
                                    src="/assets/icons/edit.png"
                                    alt="edit"
                                    width={16}
                                    height={16}
                                    />
                            </div>
                            <div className='border p-1 rounded-full bg-white shadow-lg' onClick={() => handleDeleteMessage(message.$id)}>
                            <Image
                                    src="/assets/icons/delete.png"
                                    alt="edit"
                                    width={16}
                                    height={16}
                                    />
                            </div>
                        </div>
                        )}
                    </div>
                ))}
            </div>
            <div>
                <form onSubmit={handleSubmit} className="px-4 flex justify-between max-xl:pb-4 space-x-6">
                    <input
                        type="text"
                        value={currentMessage}
                        placeholder="Enter your message"
                        className="bg-body-bg px-3 py-2 w-[85%] rounded-full"
                        onChange={(e) => setCurrentMessage(e.target.value)}
                    />
                    <button className="btn flex items-center gap-2">
                        <p className='max-sm:hidden'>Send Message</p>
                        <Image
                            src="/assets/icons/send.png"
                            alt="send icon"
                            width={16}
                            height={16}
                        />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default MessageForm
