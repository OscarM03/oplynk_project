export const appwriteconfig = {
  endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  imageEndpointUrl: process.env.NEXT_PUBLIC_APPWRITE_IMAGE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
  usersCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION!,
  sessionsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_SESSIONS_COLLECTION!,
  chatsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_CHATS_COLLECTION!,
  giftsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_GIFTS_COLLECTION!,
  bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET!,
  giftsBucketId: process.env.NEXT_PUBLIC_APPWRITE_GIFTS_BUCKET!,
  secretKey: process.env.NEXT_APPWRITE_KEY!,

  paypalClientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
  paypalClientSecret: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET!,
}
