import fs from "fs";
import { s3 } from "../services/s3BackBlaze";
import { S3 } from "aws-sdk";
 
const uploadImagens = async (files: any) => {
  let fileContents: any[] = [];
  let originalFile: any[] = [];

  try {
    for (const file of files) {
      let newFilename = `${Date.now().toString()}-${file.newFilename}`
      console.log(file)
      const params: S3.Types.PutObjectRequest = {
        Bucket: process.env.BBZ_BUCKET_NAME ?? "gogroups",
        Key: newFilename,
        Body: fs.readFileSync(file.filepath),
        ContentType: file.mimetype,
      };
      await s3.upload(params).promise();
      fileContents = [...fileContents, newFilename]
      originalFile = [...originalFile, file.originalFilename]

    }
  } catch (error: any) {
    return { message: "Erro no upload do arquivo", status: 400 };
  }
  return { status: 200, fileContents, originalFile};
};

export default uploadImagens;
