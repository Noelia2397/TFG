export interface SearchRequest{
    hist_clin: string;
}
export interface ResponseDto{
    status?: number;
    message?: string;
    location: string;
    callback?: (router:any) => void;
    objResponse?:any;
} 

export interface BaseDResponse{
    direccion: string;
    distancia: string;
    valor?: any;
}

export interface ListBaseDResponse{
    listLocalization: BaseDResponse[];
}