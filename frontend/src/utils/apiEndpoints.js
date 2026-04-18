
export const BASE_URL = "http://localhost:9090/api/v1.0";
const CLOUDINARY_CLOUD_NAME = "dkjzxthju"

export const API_ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    GETCOUNT: "/collections/count",
    GETSIZEFILTER: "/collections/size",
    FILTER: "/collections/filter",
    GETCOLLECTION: "/collections",
    SORTBYOPTION: "/collections/sortBy",
    GETPRODUCT: (id) => `/collections/${id}`,
    GETBYCATEGORY: (category) => `/collections/category/${category}`,
    GETCART: "/cart",
    ADDTOCART: (id) => `/cart/add-product/${id}`,
    REMOVEFROMCART: (id) => `/cart/remove-product/${id}`,
    SEARCH: "/collections/search",
    GETBLOGS: "/style-guides",
    GETBLOGBYID: (id) => `/style-guides/${id}`,
    GETGIFTCARDS: "/gift-cards",
    ADDPRODUCT: "/collections/addProduct",
    EDITPRODUCT: (id) => `/collections/editProduct/${id}`,
    DELETEPRODUCT: (id) => `/collections/deleteProduct/${id}`,
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,

    // Blog management
    ADDBLOG: "/style-guides/add",
    EDITBLOG: (id) => `/style-guides/editBlog/${id}`,
    DELETEBLOG: (id) => `/style-guides/${id}`,

    // Orders
    ALL_ORDERS: "/orders",
    ORDER_BY_ID: (id) => `/orders/${id}`,
    MY_ORDERS: "/orders/my-orders",
    CREATE_ORDER: "/orders",
    UPDATE_ORDER_STATUS: (id) => `/orders/${id}/status`,
    ORDER_COUNTS: "/orders/counts",

    // Profiles (Admin)
    GET_PROFILES: "/profiles",
    DELETE_PROFILE: (id) => `/profiles/${id}`,

    // Payment
    CREATE_PAYMENT_INTENT: "/payment/create-payment-intent",
}