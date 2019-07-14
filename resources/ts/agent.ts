import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { APP_URL } from "./constants/config";

interface Response {
    success: boolean;
    message?: string;
    [x: string]: any;
}

const request = (
    url: string,
    parameters?: { [x in string]: any },
    config: undefined | AxiosRequestConfig = undefined
) =>
    axios
        .post(APP_URL + "api/web/" + url, parameters, config)
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
    getUser: () => request("user/info"),
    login: (email: string, password: string) =>
        request("user/login", { email, password })
};

const CRUD = {
    info: (form: string) => request("form/" + form + "/info"),
    create: (form: string, values: { [x: string]: any }) =>
        request("form/" + form + "/create", { values }),
    update: (form: string, values: { [x: string]: any }, id: number) =>
        request("form/" + form + "/update", { values, id }),
    search: (
        form: string,
        values: { [x: string]: any },
        page: number,
        perPage: number,
        sortBy: string,
        sortMode: string
    ) =>
        request("form/" + form + "/search", {
            values,
            page,
            perPage,
            sortBy,
            sortMode
        }),
    delete: (form: string, id: number) =>
        request("form/" + form + "/delete", { id }),
    dropdown: (form: string, keyword: string, where?: { [x: string]: any }) =>
        request("form/" + form + "/dropdown", { keyword, where })
};

const Permissions = {
    permitedItems:()=>request('sidebar')
}

export default {
    Auth,
    CRUD,
    Permissions
};
