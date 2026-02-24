
export const BASE_URL = "http://localhost:9090/api/v1.0";
const CLOUDINARY_CLOUD_NAME = "dkjzxthju"

export const API_ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    GETCOUNT: "/collections/count",
    GETCOLLECTION: "/collections",
    GETPRODUCT: (id) => `/collections/${id}`,
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`

}