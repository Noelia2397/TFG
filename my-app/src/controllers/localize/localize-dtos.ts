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

export interface BaseDLocResponse{
    direccion: string;
    distancia: string;
    valor?: any;
}

export interface ListBaseDResponse{
    hist_clin:string,
    listLocalization: BaseDLocResponse[];
}

export interface CoordenadasResponse{
    start1x: any;
    start1y: any;
    start2x: any;
    start2y: any;
    coor1x: any;
    coor1y:any;
    coor2x: any;
    coor2y:any;
}