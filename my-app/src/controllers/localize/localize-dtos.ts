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
    userName: string;
    beacon: string;
}