import axios from "axios";

axios.defaults.baseURL = process.env.BASE_URL!;

const loginApi = (user: { email: string; password: string }) => {
    return axios.post("/api/user/login", user, { withCredentials: true });
};

const registerApi = (user: {
    email: string;
    password: string;
    username: string;
}) => {
    return axios.post("/api/user/register", user, { withCredentials: true });
};

const createBlogApi = (formData: FormData) => {
    return axios.post("/api/blog/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

const getMyBlogsApi = () => {
    return axios.get("/api/blog/my", { withCredentials: true });
};

const getSingleBlogDetails = (id: string) => {
    return axios.get(`/api/blog/${id}`);
};

const getAllBlogsApi = () => {
    return axios.get("/api/blog");
};

const addCommentApi = (blogId: string, comment: string) => {
    return axios.post(
        `/api/blog/comment/${blogId}`,
        { comment },
        { headers: { "Content-Type": "application/json" } }
    );
};

const logoutApi = (blogId: string, comment: string) => {
    return axios.get(`/api/user/logout/${blogId}`, { withCredentials: true });
};
export {
    loginApi,
    registerApi,
    createBlogApi,
    getMyBlogsApi,
    getSingleBlogDetails,
    getAllBlogsApi,
    addCommentApi,
};
