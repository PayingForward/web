export interface ResultObject {
    id:number,
    label:string
}

export interface Country extends ResultObject {
    code:string
}

export interface School extends ResultObject {
    logo:string;
    latitude: number;
    longitude: number;
    priority:'high'|'medium'|'low'
}

export interface PaymentMethod extends ResultObject {
    logo: number;
}

export interface UserInformations {
    name: string;
    type?: string;
    id: number;
    avatar:string;
}

export interface CompleteChildInformations extends UserInformations {
    town?:ResultObject,
    country?: ResultObject&{code:string},
    bio?:string,
    class?:ResultObject,
    school?:ResultObject&{logo:string}
}