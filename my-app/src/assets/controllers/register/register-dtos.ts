export interface RegisterRequest{
    user: string;
    beacon: string;
}

export interface AsignRequest{
    expValue:string;
}
export interface AsignResponseDto{
    status: number;
    message?: number;
    location: string;
    callback?: (router:any) => void;
    numBeaconAsign?: string;
}