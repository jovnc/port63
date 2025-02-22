// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ file }) => {
      console.log("File uploaded:", file.ufsUrl);
      return { fileUrl: file.ufsUrl, success: true };
    }
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
