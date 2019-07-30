import { ChangePassword, SIGNUP_PAGE_CHANGE_PASSWORD, ChangeEmail, SIGNUP_PAGE_CHANGE_EMAIL, SignupPageStatus, ChangeStatus, SIGNUP_PAGE_CHANGE_STATUS, ErrorEmail, SIGNUP_PAGE_ERROR_EMAIL, ErrorPassword, SIGNUP_PAGE_ERROR_PASSWORD, ChangeName, SIGNUP_PAGE_CHANGE_NAME, ErrorName, SIGNUP_PAGE_ERROR_NAME } from './types';

export const changePassword = (password:string):ChangePassword =>({
    type: SIGNUP_PAGE_CHANGE_PASSWORD,
    password
});

export const changeEmail = (email:string):ChangeEmail=>({
    type: SIGNUP_PAGE_CHANGE_EMAIL,
    email
})

export const changeName = (name:string):ChangeName =>({
    type: SIGNUP_PAGE_CHANGE_NAME,
    name
});

export const changeStatus = (status:SignupPageStatus):ChangeStatus=>({
    type: SIGNUP_PAGE_CHANGE_STATUS,
    status
});

export const errorEmail = (error:string):ErrorEmail=>({
    type: SIGNUP_PAGE_ERROR_EMAIL,
    error
});

export const errorPassword = (error:string):ErrorPassword =>({
    type: SIGNUP_PAGE_ERROR_PASSWORD,
    error
})

export const errorName = (error:string):ErrorName =>({
    type: SIGNUP_PAGE_ERROR_NAME,
    error
});
