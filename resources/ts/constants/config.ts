import { PaymentMethod } from '../store/mainTypes';

export const APP_LOGGER_ON = process.env.MIX_APP_DEBUG;

export const APP_URL = process.env.MIX_APP_URL;

export const APP_NAME = process.env.MIX_APP_NAME;

export const CRYPTO_COMPARE_API_KEY = process.env.MIX_CRYPTO_COMPARE_API_KEY;

export const USER_TOKEN_KEY = 'userToken';

export const SIDEBAR_WIDTH = 180;

export const GMAP_KEY= process.env.MIX_GOOGLE_MAP_KEY;

export const PAYMENT_METHODS:{[x:string]:PaymentMethod} = {
    paypal: {
        id:1,
        label: "PayPal",
        logo: "images/payment_methods/paypal.svg"
    },
    bitcoin: {
        id:2,
        label: "BitCoin",
        logo: 'images/payment_methods/bitcoin.svg'
    }
}