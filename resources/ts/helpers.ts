import { APP_URL } from './constants/config';

export const avatar = (size:number|string,name?:string):string=>{
    let value = name?name:'default';

    return APP_URL+'storage/images/uploads/'+size+'/'+value+'.jpg';
}

export const nameToURL = (name:string):string=>{
    return name.replace(/([^A-Z0-9a-z])/g,"_");
}