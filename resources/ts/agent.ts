import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { APP_URL } from "./constants/config";

interface Response {
    success: boolean;
    message?: string;
    [x: string]: any;
}

const request = (
    url: string,
    config: undefined | AxiosRequestConfig = undefined
) =>
    axios
        .get(APP_URL + "api/web/" + url, config)
        .then(
            (response: AxiosResponse): Response => ({
                success: true,
                ...response.data
            })
        )
        .catch(
            (err: AxiosError): Response => ({
                message:
                    typeof err.response !== "undefined"
                        ? err.response.data.message
                        : "",
                success: false
            })
        );

const Auth = {
    getUser: () => request("user/info")
};

export default {
    Auth
};
