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

export interface CompleteDonorInformations extends UserInformations {
    town?: ResultObject,
    country?: ResultObject&{code:string},
    bio?:string,
    interestCountry?: ResultObject&{code:string},
    donations:number,
    occupation?: ResultObject,
    contactEmail?: string
}

export interface CompleteUserInformations extends UserInformations {
    town?:ResultObject,
    country: ResultObject&{code:string},
    bio?:string
}