import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { appwriteconfig } from "./appwrite/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseStringify = (value: unknown) => 
  JSON.parse(JSON.stringify(value));

export const imageUrl = (bucketId: string, fileId: string) => {
  return `${appwriteconfig.imageEndpointUrl}${bucketId}/files/${fileId}/view?project=${appwriteconfig.projectId}&project=${appwriteconfig.projectId}&mode=admin`;
}

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
