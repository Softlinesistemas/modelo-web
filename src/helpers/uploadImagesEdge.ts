import { s3 } from "../services/s3BackBlaze";

export default async function uploadImagensEdge(input: File | File[], path: any = null, serverName = null) {
  const arr = Array.isArray(input) ? input : [input];
  const fileKeys: string[] = [];

  for (const file of arr) {
    const buffer = Buffer.from(await file.arrayBuffer());

    const key = `${Date.now()}-${file.name}`;
    await s3
      .upload({
        Bucket: process.env.BBZ_BUCKET_NAME || serverName || "gogroups",
        Key: `${path || "products"}/${key}`,
        Body: buffer,
        ContentType: file.type,
      })
      .promise();

    fileKeys.push(key);
  }

  return { status: 200, fileContents: fileKeys };
}
