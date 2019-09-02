import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { APP_URL, CRYPTO_COMPARE_API_KEY } from "./constants/config";
import { ProfileInformation } from "./store/ProfilePage/types";

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
        request("user/login", { email, password }),
    signup: (
        name: string,
        email: string,
        password: string,
        passwordConfirmation: string
    ) => request("user/signup", { name, email, password, passwordConfirmation })
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
    permitedItems: () => request("sidebar")
};

const HomePage = {
    fetchDonorInfo: () => request("home/donor")
};

const Profile = {
    fetchProfileInfo: (userId?: number) => request("profile/load", { userId }),
    saveAvatar: (avatar: string) => request("profile/save/avatar", { avatar }),
    save: (profile: ProfileInformation) => request("profile/save", { profile })
};

const DonatePage = {
    latestPrices: () =>
        axios.get(
            "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD&api_key="+CRYPTO_COMPARE_API_KEY
        ).then(
            (response: AxiosResponse): Response => ({
                success: true,
                prices:response.data as {[x:string]:{USD:number}}
            })
        )
        .catch(
            (err: AxiosError): Response => ({
                message:
                    typeof err.response !== "undefined"
                        ? err.message
                        : "",
                success: false
            })
        ),
    info:(mode:string,modeId:number)=>
            request('donate/info',{mode,modeId})
};

const SearchPage = {
    searchResults: (
        keyword: string,
        options: {
            [x: string]: Array<string|number>;
        },
        page?:number,
        perPage?:number,
        sortBy?:string,
        sortMode?:string
    ) => request("search", { keyword, options,page,perPage,sortBy,sortMode }),
    searchOptions: (keyword: string, optionId: string) =>
        request("search/" + optionId, { keyword })
};

export default {
    Auth,
    CRUD,
    Permissions,
    HomePage,
    Profile,
    DonatePage,
    SearchPage
};
