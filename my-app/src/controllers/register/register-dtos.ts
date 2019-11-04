export interface RegisterRequest{
    user_name: string;
    user_hist: string;
    beacon: string;
}

export interface AsignResponseDto{
    status: number;
    message?: number;
    location: string;
    callback?: (router:any) => void;
}