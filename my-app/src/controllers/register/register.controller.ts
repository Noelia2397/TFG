import {RegisterRequest, AsignResponseDto} from "./register-dtos";
import {Subject, Observable} from 'rxjs';
import firebase from 'firebase';
import { RegisterDto } from "../../components/register/register-dto";
import {firebaseConfig} from "../../config/config-bbdd";
//import 'firebase/database';

// Initialize Firebase
//firebase.initializeApp(firebaseConfig);

export class RegisterController{

    constructor(){
        console.log("Estoy en el constructor");
        firebase.initializeApp(firebaseConfig);
    }
    private _numBeaconAsign: Subject<RegisterDto> = new Subject();

    public onViewDtoChangeReceived(): Observable<RegisterDto>{
        return this._numBeaconAsign.asObservable();
    }

    //Conectar con la Raspberry que detectará el BLE y traer su valor para mostrarlo por pantalla
    public async asignBeacon(registerRequest: RegisterRequest):Promise<AsignResponseDto>{
        //Conectar con Raspberry y detectar BLE

        //Cambiar valor variable _numBeaconAsign para ser detectada por view
        this._numBeaconAsign.next({numBeaconAsign:'678', NamePatientValue:registerRequest.user_name, HClinicoValue:registerRequest.user_hist});

        const response: AsignResponseDto = {
            status: 1,
            location: '/register',
        };
        return response;
    }

    //Conectar con la base de datos para enviar los datos del usuario y BLE y almacenarlos
    public async registerUser (registerRequest: RegisterRequest){
    
        /*const auxd = firebase.database().ref().child('users').child('name');
        console.log(auxd);
        console.log("este es el bueno ")
        auxd.on('value', function(e) {
            console.log(e.val())
        });*/
        const notes=registerRequest;
        const auxd= firebase.database().ref('users/').child(registerRequest.user_hist).set({
            userName: registerRequest.user_name,
            beacon: registerRequest.beacon,
        });
        
        const response: AsignResponseDto = {
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
        return response;
    }

    public async borrarPaciente(deleteRequest:DeleteRequest): Promise<ResponseDto>{

        //Borrar de la lista de beacon
        firebase.database().ref().child('beacon/').child(deleteRequest.beacon).remove();
        //Borrar de la lista de usuarios
        firebase.database().ref().child('users/').child(deleteRequest.hist_clin).remove();
        
        this._nameUserRemove.next({numBeaconAsign:'', NamePatientValue:'', HistClinicoValue:''});
        
        const response: ResponseDto = {
            status: 1,
            location: '/register',
        };
        return response;
    }
}
}