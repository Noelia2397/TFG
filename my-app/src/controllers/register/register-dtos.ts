export interface RegisterRequest{
    user_name: string;
    user_hist: string;
    beacon: string;
}

export interface ResponseDto{
    status?: number;
    message?: string;
    location: string;
    callback?: (router:any) => void;
    objResponse?:any;
} 
export interface SearchRequest{
    hist_clin: string;
}

export interface SearchResponse{
    histClin: string;
    userName: string | undefined;
    beacon: string | undefined;
}

export interface BaseDResponse{
    userName: string;
    beacon: string;
}

export interface DeleteRequest{
    hist_clin: string;
    beacon: string;
}
export interface ScanResponse{
    bean: string;
}
