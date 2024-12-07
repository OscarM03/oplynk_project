"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteconfig } from "../appwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient(); // Creates an admin client and retrieves the `databases` object for interacting with the Appwrite database.

  const result = await databases.listDocuments(
    appwriteconfig.databaseId, // Specifies the database ID from the configuration.
    appwriteconfig.usersCollectionId, // Specifies the collection ID containing user documents.
    [Query.equal("email", [email])] // Queries the collection for documents where the `email` field matches the provided email.
  );
  return result.total > 0 ? result.documents[0] : null; // Returns the first matching user document if found; otherwise, returns null.
};

const handleError = (error: unknown, message: string) => {
  console.error(error, message); // Logs the error and a custom message to the console for debugging purposes.
  throw error; // Rethrows the error to ensure it can be handled by the calling function.
};

export const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient(); // Creates an admin client and retrieves the `account` object for managing authentication-related operations.

  try {
    const session = await account.createEmailToken(ID.unique(), email); // Generates a unique token and sends an OTP to the specified email address.
    return session.userId; // Returns the user ID associated with the session if successful.
  } catch (error) {
    handleError(error, "Failed to send email OTP"); // Handles errors by logging and rethrowing them with a descriptive message.
  }
};

export const createAccount = async ({
  username,
  email,
}: {
  username: string;
  email: string;
}) => {
  const existingUser = await getUserByEmail(email); // Checks if a user with the provided email already exists in the database.

  const accountId = await sendEmailOTP({ email }); // Sends an OTP to the email address and retrieves the associated account ID.
  if (!accountId) throw new Error("Failed to send an OTP"); // Throws an error if the account ID is not returned, indicating OTP sending failed.

  if (!existingUser) {
    const { databases } = await createAdminClient(); // Creates an admin client to interact with the database.

    await databases.createDocument(
      appwriteconfig.databaseId, // Specifies the database ID from the configuration.
      appwriteconfig.usersCollectionId, // Specifies the collection ID where the user document will be stored.
      ID.unique(), // Generates a unique ID for the new document.
      {
        username,
        email,
        avatar: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg", // Assigns a default avatar URL to the user document.
        accountId, // Stores the account ID (linked to the email OTP) in the document.
      }
    );
  }
  return parseStringify({ accountId }); // Returns the account ID after stringifying it, ensuring it can be safely sent or stored.
};

export const SignInUser = async ({email} : {email: string}) => {
  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      await sendEmailOTP({ email });
      return parseStringify({ accountId : existingUser.accountId });
    }
    return parseStringify({ accountId : null, error: 'User not found' });
  } catch (error) {
    handleError(error, "Failed to sign in user");
  }
}

const expiryDate = new Date();
expiryDate.setDate(expiryDate.getDate() + 7);

export const verifySecret = async ({
  accountId,
  password,
}: { accountId: string, password: string }) => {
  try {
    // Create an admin client instance and retrieve the `account` object for account operations.
    const { account } = await createAdminClient();

    // Attempt to create a session for the given account ID and password/OTP.
    // This verifies the OTP and logs the user in by establishing a session.
    const session = await account.createSession(accountId, password);

    // Set a secure cookie named "appwrite-session" to store the session secret.
    // This cookie will be used to authenticate future requests.
    // Options:
    // - path: "/" - Makes the cookie available across the entire site.
    // - httpOnly: true - Prevents client-side JavaScript from accessing the cookie.
    // - sameSite: "strict" - Ensures the cookie is sent only with requests from the same site.
    // - secure: true - Ensures the cookie is transmitted only over HTTPS.
    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      expires: expiryDate,
    });

    // Return the session ID (formatted as a JSON string) to the caller.
    // This allows the caller to track or store the session for their purposes.
    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    // Handle any errors that occur during the process:
    // - Logs the error to the console with a custom message.
    // - Rethrows the error to propagate it back to the caller.
    handleError(error, "Failed to verify OTP");
  }
};

export const getCurrentUser = async () => {
  try {
    //Create an Appwrite client with session information
    const { databases, account } = await createSessionClient();

    //Fetch the currently authenticated account using Appwrite's `account.get` method (from th cookies)
    const result = await account.get();

    //Query the `usersCollection` in your Appwrite database to find the user details
    // Match the `accountId` field in the collection with the authenticated user's ID (`result.$id`)
    const user = await databases.listDocuments(
      appwriteconfig.databaseId,          // Your Appwrite database ID
      appwriteconfig.usersCollectionId,   // The collection where user details are stored
      [Query.equal("accountId", result.$id)], // Query: Find documents where `accountId` equals the user's ID
    );

    // Check if a matching user was found
    if (user.total < 0) {
      // No user found in the collection, return null
      return null;
    }

    // If a user is found, process the user document
    // `parseStringify` is used to deep clone or format the user document if needed
    return parseStringify(user.documents[0]);
  } catch (error) {
    // Handle errors that occur during the session retrieval or querying process
    console.error(error, "Failed to get current user");
    return null; // Return null on error to indicate no user is authenticated
  }
};

export const IsUserLoggedIn = async () => {
	try {
		const user = await getCurrentUser();
    if (user.accountId) {
      return true;
    } else {
      return false;
    }
	} catch (error) {
		console.error("Error checking login status:", error);
		return false;  // Return false in case of any errors
	}
};

export const logout = async () => {
	(await cookies()).set('appwrite-session', '',);
}


