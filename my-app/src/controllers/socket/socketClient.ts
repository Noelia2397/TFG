import { w3cwebsocket as W3CWebSocket } from "websocket";
import { ScanResponse } from "../register/register-dtos";
import { Subject, Observable } from "rxjs";

var client: W3CWebSocket ;

export class socketClient{

    private _beaconDiscover: Subject<ScanResponse> = new Subject();

    public onViewRegisterDtoChangeReceived(): Observable<ScanResponse>{
        return this._beaconDiscover.asObservable();
    }
    public establishConection (){
        client = new W3CWebSocket('ws://localhost:8000');

        client.onmessage = (message) => {

            const dataFromServer = JSON.parse(message.data.toString());
 
            this._beaconDiscover.next({bean: dataFromServer.data});

            this.desconectarSocket();
        };

        client.onopen = () => {
            console.log('WebSocket Client Connected');
            
            client.send(JSON.stringify({
                content: "escanear"
            }));
        };
    }

    public desconectarSocket(){
        client.close();
    }
    
}
