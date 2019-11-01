export interface RegisterRequest{
    user_name: string;
    user_exp: string;
    beacon: string;
}

export interface AsignResponseDto{
    status: number;
    message?: number;
    location: string;
    callback?: (router:any) => void;
}