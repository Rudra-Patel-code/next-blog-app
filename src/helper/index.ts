import { APISuccessResponseInterface } from "@/interfaces/api";
import { AxiosResponse } from "axios";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const requestHandler = async (
    api: () => Promise<AxiosResponse<APISuccessResponseInterface, any>>,
    setLoading: ((loading: boolean) => void) | null,
    onSuccess: (data: APISuccessResponseInterface) => void,
    onError: (error: string) => void
) => {
    setLoading && setLoading(true);
    try {
        const response = await api();

        const { data } = response;

        if (data?.success) {
            onSuccess(data);
        }
    } catch (error: any) {
        onError(error?.response?.data?.error || "Something went wrong");
    } finally {
        setLoading && setLoading(false);
    }
};

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
