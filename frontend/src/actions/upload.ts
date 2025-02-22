"use server";

import { UTApi } from "uploadthing/server";

const utapi = new UTApi({
  // ...options,
});

export async function uploadFileToUT(file: File) {
  try {
    const res = await utapi.uploadFiles([file]);

    const fileUrl = res[0].data?.ufsUrl;
    const fileName = res[0].data?.name;

    return { fileUrl, fileName, success: true };
  } catch (error) {
    throw new Error("Error uploading file");
  }
}
