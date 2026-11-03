// The Blob store was connected with the custom env prefix "z".
export const blobAuth = {
  token: process.env.z_READ_WRITE_TOKEN,
  storeId: process.env.z_STORE_ID,
};
