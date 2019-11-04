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
            status: 1,
            location: '/register',
        };
        return response;
    }
}