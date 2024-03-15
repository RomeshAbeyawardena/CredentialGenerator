export interface ICredential {
    id?: String;
    username:String;
    emailAddress?:String;
    password:String;
    created?:Date;
}

export class Credential {
    static readonly default: ICredential = {
        id: "",
        username: "",
        emailAddress:"",
        password:""
    }
}