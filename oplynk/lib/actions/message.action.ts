"use server";

import { ID, Query } from "node-appwrite"
import { createAdminClient } from "../appwrite"
import { appwriteconfig } from "../appwrite/config"
import { getCurrentUser } from "./user.actions"
import { parseStringify } from "../utils"

interface messageProps {
    message: string;
    sessionId: string;
}
export const sendMessage = async ({message, sessionId} : messageProps) => {
    const { databases } = await createAdminClient();
    const user = await getCurrentUser();

    try {
        const response = await databases.createDocument(
            appwriteconfig.databaseId,
            appwriteconfig.chatsCollectionId,
            ID.unique(),
            {
                message,
                sessionId,
                userId: user.$id,
            }
        )
        return parseStringify(response)
    } catch (error) {
        console.log(error, "Failed to send message")
    }
}

export const getMessages = async (sessionId: string): Promise<any[]> => {
    const { databases } = await createAdminClient();

    try {
        const response = await databases.listDocuments(
            appwriteconfig.databaseId,
            appwriteconfig.chatsCollectionId,
            [
                Query.equal('sessionId', sessionId),
                Query.orderDesc('$createdAt'),
            ]
        )
        return response.documents;
    } catch (error) {
        console.log(error, "Failed to get messages")
        throw new Error("Failed to get messages")
    }
}

export const getMessageById = async (messageId: string) => {
    const { databases } = await createAdminClient()

    try {
        const response = await databases.getDocument(
            appwriteconfig.databaseId,
            appwriteconfig.chatsCollectionId,
            messageId
        )
        return parseStringify(response)
    } catch (error) {
        console.log(error, "Failed to get message")
        throw new Error("Failed to get message")
    }
}

export const updateMessage = async (message: string, messageId: string) => {
    const { databases } = await createAdminClient()

    try {
        const response = await databases.updateDocument(
            appwriteconfig.databaseId,
            appwriteconfig.chatsCollectionId,
            messageId,
            {
                message,
            }
        );
        return parseStringify(response)
    } catch (error) {
        console.log(error, "Failed to update message")
        throw new Error("Failed to update message")
    }
}

export const deleteMessage = async (messageId: string) => {
    const { databases } = await createAdminClient()

    try {
        await databases.deleteDocument(
            appwriteconfig.databaseId,
            appwriteconfig.chatsCollectionId,
            messageId
        )
        console.log("Message deleted")
    } catch (error) {
        console.log(error, "Failed to delete message")
        throw new Error("Failed to delete message")
    }
}