"use server";

import { Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appwriteconfig } from "../appwrite/config";
import { parseStringify } from "../utils";

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

export const addGiftToReceiver = async (userId: string, giftId: string, giftValue: number) => {
    const { databases } = await createAdminClient();

    try {

        const userDoc = await databases.getDocument(
            appwriteconfig.databaseId,
            appwriteconfig.usersCollectionId,
            userId
        );


        const currentBalance = userDoc.balance || 0;
        const updatedBalance = currentBalance + giftValue;


        const updatedUser = await databases.updateDocument(
            appwriteconfig.databaseId,
            appwriteconfig.usersCollectionId,
            userId,
            {
                balance: updatedBalance,
            }
        );

        return parseStringify(updatedUser);
    } catch (error) {
        console.error("Error updating user with gift:", { userId, giftId, error });
        throw new Error("Failed to update user with gift.");
    }
};

