"use server";

import { Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appwriteconfig } from "../appwrite/config";

export const getGifts = async () => {
    const { databases } = await createAdminClient();

    try {
        const response = await databases.listDocuments(
            appwriteconfig.databaseId,
            appwriteconfig.giftsCollectionId,
            [
                Query.orderAsc('amount'),
            ]
        )
        return response.documents;
    } catch (error) {
        console.log(error, "Failed to get gifts")
        throw new Error("Failed to get gifts")
    }
}