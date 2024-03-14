export interface IGenericDataList<T> extends IDataList {
    label:string;
    value:T;
}

export interface IDataList {
    label:string;
    value:any;
}