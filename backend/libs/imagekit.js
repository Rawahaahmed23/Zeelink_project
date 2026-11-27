
import ImageKit, { toFile } from "@imagekit/nodejs";

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

function hasImagekitConfig() {
  return Boolean(process.env.IMAGEKIT_PRIVATE_KEY);
}

hasImagekitConfig()
function createFileName(originalName = "upload") {
  const safeName = originalName.replace(/[^a-zA-Z0-9.-]/g, "_");
  return `asset-${Date.now()}-${safeName}`;
}

async function uploadAssetImage(file) {
  if (!file) return null;

  if (!hasImagekitConfig()) {
    throw new Error("ImageKit private key is missing");
  }

  const filename = createFileName(file.originalname);

  const result = await client.files.upload({
    file: await toFile(file.buffer, filename),
    fileName: filename,
    folder: "/zeelink",
  });

  return {
    url: result.url,
    fileId: result.fileId,
  };
}

async function deleteAssetImage(fileId) {
  if (!fileId) return;

  await client.files.delete(fileId);
}

export {
  uploadAssetImage,
  deleteAssetImage,

};
