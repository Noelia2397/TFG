import {RegisterRequest, ResponseDto, SearchRequest, SearchResponse, BaseDResponse, DeleteRequest, ScanResponse} from "./register-dtos";
import {Subject, Observable} from 'rxjs';
import firebase from 'firebase';
import { RegisterDto } from "../../components/register/register-dto";
import {firebaseConfig} from "../../config/config-bbdd";
import { UnregisteDto } from "../../components/unregister/unregister-dto";
import { LocalizeDto } from "../../components/localize/localize-dto";
import { socketClient } from "../socket/socketClient";
import { w3cwebsocket as W3CWebSocket } from "websocket";

// Initialize Firebase
//firebase.initializeApp(firebaseConfig);

export class RegisterController{

    private _numBeaconAsign: Subject<RegisterDto> = new Subject();
    private _nameUserRemove: Subject<UnregisteDto> = new Subject();
    private _nameUserLocalize: Subject<LocalizeDto> = new Subject();

    private _socketclient = new socketClient();

    public onViewRegisterDtoChangeReceived(): Observable<RegisterDto>{
        return this._numBeaconAsign.asObservable();
    }

    public onViewUnregisterDtoChangeReceived(): Observable<UnregisteDto>{
        return this._nameUserRemove.asObservable();
    }
    public onViewLocalizeDtoChangeReceived(): Observable<LocalizeDto>{
        return this._nameUserLocalize.asObservable();
    }
    
    //Conectar con la Raspberry que detectará el BLE y traer su valor para mostrarlo por pantalla
    public async asignBeacon(registerRequest: RegisterRequest):Promise<ResponseDto>{
        console.log("estoy en asign");
        //Cambiar valor variable _numBeaconAsign para ser detectada por view
        this._socketclient.onViewRegisterDtoChangeReceived().subscribe((response: ScanResponse)=>{
            console.log('Response: '+ response.bean);
            this._numBeaconAsign.next({numBeaconAsign:response.bean, NamePatientValue:registerRequest.user_name, HClinicoValue:registerRequest.user_hist, showPopup:false, showError:false});
        })
        //Conectar con Raspberry y detectar BLE
        this._socketclient.establishConection();
       
        const response: ResponseDto = {
            status: 1,
            location: '/register',
        };
        
        return response;
        //return this._buildCallbackResponse(response);
    }

    public async cerrarConexion(){
        this._socketclient.desconectarSocket();
    }

    /*Conectar con la base de datos para enviar los datos del usuario y BLE y almacenarlos,
    almacenar datos tanto en users como en beacon*/
    public registerUser (registerRequest: RegisterRequest){

        firebase.database().ref('users/').child(registerRequest.user_hist).set({
            userName: registerRequest.user_name,
            beacon: registerRequest.beacon,
        });

        firebase.database().ref('beacon/').child(registerRequest.beacon).set({
            patient: registerRequest.user_hist,
        });

        this._numBeaconAsign.next({numBeaconAsign:'', NamePatientValue:'', HClinicoValue:''});
        
        const response: ResponseDto = {
            status: 1,
            location: '/register',
        };

        return response;
        //return this._buildCallbackResponse(response);
    }

    public async localizarPaciente(searchRequest:SearchRequest): Promise<ResponseDto>{
        //Traer información de localización del paciente y mostrarla
        console.log("estoy en localizar");
        var datosBBDD:BaseDResponse ={
            beacon:"",
            userName: "",
        };
        const auxd = firebase.database().ref('users/'+searchRequest.hist_clin+'/localizacion').limitToLast(2);
        const snapshot = await auxd.once('value', function(data){
            data.forEach(function(childData){
                datosBBDD = childData.val();
                console.log(childData.key);
                console.log(datosBBDD);
            });
        });
        
        const response: ResponseDto = {
            status: 1,
            location: '/localize',
        };

        return response;
        //return this._buildCallbackResponse(response);
    }

    public async datosPaciente(searchRequest:SearchRequest): Promise<ResponseDto>{
        //Traer información de localización del paciente y mostrarla
        console.log("esto en localizar");
        var datosBBDD:BaseDResponse ={
            beacon:"",
            userName: "",
        };
        const auxd = firebase.database().ref().child('users').child(searchRequest.hist_clin);
        const snapshot = await auxd.once('value');
        datosBBDD = snapshot.val();
        if(datosBBDD!=null){
            console.log("estos son los datos:")
            console.log(datosBBDD.beacon);
            console.log(datosBBDD.userName);
            
            this._nameUserRemove.next({numBeaconAsign:datosBBDD.beacon, NamePatientValue:datosBBDD.userName, HistClinicoValue:searchRequest.hist_clin, showError:false, showErrorBaja:false});
            
            const response: ResponseDto = {
                status: 1,
                location: '/unregister',
            };
            
            return response;
        }else{
            console.log("no hay datos:")
            
            this._nameUserRemove.next({numBeaconAsign:'', NamePatientValue:'', HistClinicoValue:searchRequest.hist_clin, showError:true});
            
            const response: ResponseDto = {
                status: -1,
                location: '/unregister',
            };
            
            return response;
        }
        
        //return this._buildCallbackResponse(response);
    }

    public async borrarPaciente(deleteRequest:DeleteRequest): Promise<ResponseDto>{

        //Borrar de la lista de beacon
        firebase.database().ref().child('beacon/').child(deleteRequest.beacon).remove();
        //Borrar de la lista de usuarios
        firebase.database().ref().child('users/').child(deleteRequest.hist_clin).remove();
        
        this._nameUserRemove.next({numBeaconAsign:'', NamePatientValue:'', HistClinicoValue:''});
        
        const response: ResponseDto = {
            status: 1,
            location: '/unregister',
        };

        return response;
        //return this._buildCallbackResponse(response);
    }
      
    /*private _buildCallbackResponse(response: ResponseDto): ResponseDto {
        response.callback = router =>
          router.history.push({
            pathname: response.location,
            state: { message: response.status},
          });
        return response;
    }*/
}