export interface LoginRequestDto{
    user: string;
    pass: string;
}

export interface ResponseLoginDto{
    status?: number;
    message?: string;
    location: string;
    callback?: (router:any) => void;
} 

export interface BaseLoginResponse{
    pass: string;
}