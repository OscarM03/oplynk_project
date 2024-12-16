"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appwriteconfig } from "../appwrite/config";
import { getCurrentUser } from "./user.actions";
import { parseStringify } from "../utils";
import { fileURLToPath } from "url";
import { title } from "process";

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
    image: File;
}

export const createSession = async ({
    title,
    description,
    category,
    target,
    image,
}: sessionProps) => {
    const { databases } = await createAdminClient();
    const user = await getCurrentUser();
    const imageId = await uploadFile({ image });

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
                image: imageId,
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

interface updateSessionProps {
    title: string;
    description: string;
    category: string;
    target: number;
}

export const updateSession = async ({
    title,
    description,
    category,
    target,
    sessionId,
}: updateSessionProps & { sessionId: string }) => {
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