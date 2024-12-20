"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appwriteconfig } from "../appwrite/config";
import { getCurrentUser } from "./user.actions";
import { parseStringify } from "../utils";

export const uploadFile = async ({ image }: { image: File }): Promise<string> => {
    const { storage } = await createAdminClient();
    try {
        const file = await storage.createFile(
            appwriteconfig.bucketId,
            ID.unique(),
            image,
        )
        return file.$id;
    } catch (error) {
        console.log(error, "Failed to upload file");
        throw new Error("File upload failed");
    }
}

export const getFile = async (fileId: string) => {
    const { storage } = await createAdminClient();
    try {
        const file = await storage.getFile(
            appwriteconfig.bucketId,
            fileId
        );
        return file;
    } catch (error) {
        console.log(error, "Failed to get file");
        throw new Error("Failed to get file");
    }
}

interface sessionProps {
    title: string;
    description: string;
    category: string;
    target: number;
}

export const createSession = async ({
    title,
    description,
    category,
    target,
}: sessionProps) => {
    const { databases } = await createAdminClient();
    const user = await getCurrentUser();

    try {
        const session = await databases.createDocument(
            appwriteconfig.databaseId,
            appwriteconfig.sessionsCollectionId,
            ID.unique(),
            {
                title,
                description,
                category,
                target,
                user_Id: user.$id,
            }
        )
        return parseStringify(session);
    } catch (error) {
        console.log(error, "Failed to create session");
    }
}

export const getSessions = async (params: string | null): Promise<any[]> => {
    const { databases } = await createAdminClient();

    try {
        const filters: any[] = [
            Query.orderDesc('$createdAt'),
        ];

        if (params && params !== '') {
            console.log(params, "params");
            filters.push(
                Query.search('title', params)
            );
        }

        const sessions = await databases.listDocuments(
            appwriteconfig.databaseId,
            appwriteconfig.sessionsCollectionId,
            filters
        );
        
        return sessions.documents;
    } catch (error) {
        console.log(error, "Failed to get sessions");
        throw new Error("Failed to get sessions");
    }
};

export const getSessionById = async (sessionId: string): Promise<any> => {
    const { databases } = await createAdminClient();

    try {
        const session = await databases.getDocument(
            appwriteconfig.databaseId,
            appwriteconfig.sessionsCollectionId,
            sessionId
        );
        return session;
    } catch (error) {
        console.log(error, "Failed to get session by id");
        throw new Error("Failed to get session by id");
    }
}


export const searchSessions = async (query: string, page: number, limit: number) => {
    const { databases } = await createAdminClient()

    const offset = page * limit;

    try {

        const results = await databases.listDocuments(
            appwriteconfig.databaseId,
            appwriteconfig.sessionsCollectionId,
            [
                // Query.search('category', query),
                Query.search('title', query),
                Query.orderDesc('$createdAt'),
                Query.limit(limit),
                Query.offset(offset),

            ]
        );
        return results.documents;
    } catch (error) {
        console.log(error, "Failed to search sessions");
        throw new Error("Failed to search sessions");
    }
}

export const getUserSessions = async (userId: string) => {
    const { databases } = await createAdminClient()
    try {
        const results = await databases.listDocuments(
            appwriteconfig.databaseId,
            appwriteconfig.sessionsCollectionId,
            [
                Query.equal('user_Id', userId),
                Query.orderDesc('$createdAt')
            ]
        )
        return results.documents
    } catch (error) {
        console.log(error, "Failed to get session");
        throw new Error("Failed to get Session");
    }

}

interface updateSessionProps {
    title: string;
    description: string;
    category: string;
    target: number;
    sessionId: string;
}

export const updateSession = async ({
    title,
    description,
    category,
    target,
    sessionId,
}: updateSessionProps) => {
    const { databases } = await createAdminClient();

    try {
        const session = await databases.updateDocument(
            appwriteconfig.databaseId,
            appwriteconfig.sessionsCollectionId,
            sessionId,
            {
                title,
                description,
                category,
                target,
            }
        )
        return parseStringify(session);
    } catch (error) {
        console.log(error, "Failed to update session");
    }
}

export const deleteSession = async (sessionId: string) => {
    const { databases } = await createAdminClient();

    try {
        await databases.deleteDocument(
            appwriteconfig.databaseId,
            appwriteconfig.sessionsCollectionId,
            sessionId
        )
    } catch (error) {
        console.log(error, "Failed to delete session");
    }
}

export const updateSessionContributions = async (sessionId: string, amount: number, giftId: string) => {
    const { databases } = await createAdminClient();

    try {

        const userDoc = await databases.getDocument(
            appwriteconfig.databaseId,
            appwriteconfig.sessionsCollectionId,
            sessionId
        );


        const currentContributions = userDoc.contributed || 0;
        const updatedContributions = currentContributions + amount;

        const currentGifts = userDoc.giftsReceived || [];
        const updatedGifts = [...currentGifts, giftId];

        const updatedSession = await databases.updateDocument(
            appwriteconfig.databaseId,
            appwriteconfig.sessionsCollectionId,
            sessionId,
            {
                contributed: updatedContributions,
                giftsReceived: updatedGifts,
            }
        );

        return parseStringify(updatedSession);
    } catch (error) {
        console.error("Error updating the Conributions:", { error });
        throw new Error("Failed to update Contributions.");
    }
}