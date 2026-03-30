
export const BASE_URL = "http://localhost:9090/api/v1.0";
const CLOUDINARY_CLOUD_NAME = "dkjzxthju"

export const API_ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    GETCOUNT: "/collections/count",
    GETSIZEFILTER: "/collections/size",
    FILTER: "/collections/filter",
    GETCOLLECTION: "/collections",
    GETPRODUCT: (id) => `/collections/${id}`,
    GETBYCATEGORY: (category) => `/collections/category/${category}`,
    GETCART: "/cart",
    ADDTOCART: (id) => `/cart/add-product/${id}`,
    REMOVEFROMCART: (id) => `/cart/remove-product/${id}`,
    SEARCH: "/collections/search",
    GETBLOGS: "/style-guides",
    GETBLOGBYID: (id) => `/style-guides/${id}`,
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`

}