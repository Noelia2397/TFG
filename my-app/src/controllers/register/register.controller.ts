import {RegisterRequest, ResponseDto, SearchRequest, SearchResponse, BaseDResponse, DeleteRequest} from "./register-dtos";
import {Subject, Observable} from 'rxjs';
import firebase from 'firebase';
import { RegisterDto } from "../../components/register/register-dto";
import {firebaseConfig} from "../../config/config-bbdd";
import { UnregisteDto } from "../../components/unregister/unregister-dto";
import { LocalizeDto } from "../../components/localize/localize-dto";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export class RegisterController{

    private _numBeaconAsign: Subject<RegisterDto> = new Subject();
    private _nameUserRemove: Subject<UnregisteDto> = new Subject();
    private _nameUserLocalize: Subject<LocalizeDto> = new Subject();

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
        //Conectar con Raspberry y detectar BLE

        //Cambiar valor variable _numBeaconAsign para ser detectada por view
        this._numBeaconAsign.next({numBeaconAsign:'678', NamePatientValue:registerRequest.user_name, HClinicoValue:registerRequest.user_hist});

        const response: ResponseDto = {
            status: 1,
            message:'Done',
            location: '/register',
        };
        return response;
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

        return this._buildCallbackResponse(response);
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
        console.log('He acabado');
        //datosBBDD = snapshot.val();

        //this._nameUserLocalize.next({numBeaconAsign:datosBBDD.beacon, NamePatientValue:datosBBDD.userName, HistClinicoValue:searchRequest.hist_clin});
        
        const response: ResponseDto = {
            status: 1,
            location: '/localize',
            //objResponse: datos,
        };
        console.log("hola");
        return this._buildCallbackResponse(response);
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
        
        this._nameUserRemove.next({numBeaconAsign:datosBBDD.beacon, NamePatientValue:datosBBDD.userName, HistClinicoValue:searchRequest.hist_clin});
        
        const response: ResponseDto = {
            status: 1,
            location: '/unregister',
            //objResponse: datos,
        };
        console.log("hola");
        return this._buildCallbackResponse(response);
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
        return this._buildCallbackResponse(response);
    }
      
    private _buildCallbackResponse(response: ResponseDto): ResponseDto {
        response.callback = router =>
          router.history.push({
            pathname: response.location,
            state: { message: response.status},
          });
        return response;
    }
}