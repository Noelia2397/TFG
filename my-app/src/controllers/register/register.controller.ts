import {RegisterRequest, ResponseDto, SearchRequest, BaseDResponse, DeleteRequest, ScanResponse} from "./register-dtos";
import {Subject, Observable} from 'rxjs';
import firebase from 'firebase';
import { RegisterDto } from "../../components/register/register-dto";
import { UnregisteDto } from "../../components/unregister/unregister-dto";
import { LocalizeDto } from "../../components/localize/localize-dto";
import { socketClient } from "../socket/socketClient";

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
        //Cambiar valor variable _numBeaconAsign para ser detectada por view
        this._socketclient.onViewRegisterDtoChangeReceived().subscribe((response: ScanResponse)=>{
            this._numBeaconAsign.next({numBeaconAsign:response.bean, NamePatientValue:registerRequest.user_name, HClinicoValue:registerRequest.user_hist, showPopup:false, showError:false});
        })
        //Conectar con Raspberry y detectar BLE
        this._socketclient.establishConection();
       
      //this._numBeaconAsign.next({numBeaconAsign:'234', NamePatientValue:registerRequest.user_name, HClinicoValue:registerRequest.user_hist, showPopup:false, showError:false});
        const response: ResponseDto = {
            status: 1,
            location: '/register',
        };
        
        return response;
    }

    public async cerrarConexion(){
        this._socketclient.desconectarSocket();
    }

    /*Conectar con la base de datos para enviar los datos del usuario y BLE y almacenarlos,
    almacenar datos tanto en users como en beacon*/
    public registerUser (registerRequest: RegisterRequest){
        console.log("voy a almacenar el usuario");

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
    }

    public async datosPaciente(searchRequest:SearchRequest): Promise<ResponseDto>{
        //Traer información de localización del paciente y mostrarla
        if(searchRequest.hist_clin==''){
            const response: ResponseDto = {
                status: -1,
                location: '/unregister',
            };
            
            return response;
        }

        var datosBBDD:BaseDResponse ={
            beacon:"",
            userName: "",
        };
        const auxd = firebase.database().ref().child('users').child(searchRequest.hist_clin);
        const snapshot = await auxd.once('value');
        datosBBDD = snapshot.val();
        if(datosBBDD!=null){
            
            this._nameUserRemove.next({numBeaconAsign:datosBBDD.beacon, NamePatientValue:datosBBDD.userName, HistClinicoValue:searchRequest.hist_clin, showError:false, showErrorBaja:false});
            
            const response: ResponseDto = {
                status: 1,
                location: '/unregister',
            };
            
            return response;
        }else{            
            this._nameUserRemove.next({numBeaconAsign:'', NamePatientValue:'', HistClinicoValue:searchRequest.hist_clin, showError:true});
            
            const response: ResponseDto = {
                status: -1,
                location: '/unregister',
            };
            
            return response;
        }
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