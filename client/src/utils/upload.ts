/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const cloud_secret = import.meta.env.VITE_CLOUD_SECRET;
const cloud_name = import.meta.env.VITE_CLOUD_NAME;
export const uploadFiles = async (files: any) => {
  const formData = new FormData();
  formData.append("upload_preset", cloud_secret);
  const uploaded = [];
  for (const f of files) {
    const { file, type } = f;
    formData.append("file", file);
    const res = await uploadToCloudinary(formData);
    uploaded.push({ file: res, type });
  }
  return uploaded;
};

const uploadToCloudinary = async (formData: any) => {
  return new Promise(async (resolve) => {
    return await axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/raw/upload`,
        formData
      )
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
