import {RegisterRequest, AsignResponseDto} from "./register-dtos";
import {Subject, Observable} from 'rxjs';
import firebase from 'firebase';
import { RegisterDto } from "../../../components/register/register-dto";

var firebaseConfig = {
    apiKey: "AIzaSyBKosyJzR1yXLe7I39vaXJAtHJplgsOrQc",
    authDomain: "app-ble-bbdd.firebaseapp.com",
    databaseURL: "https://app-ble-bbdd.firebaseio.com",
    projectId: "app-ble-bbdd",
    storageBucket: "app-ble-bbdd.appspot.com",
    messagingSenderId: "439902971846",
    appId: "1:439902971846:web:59b405049c8da04c4534c7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export class RegisterController{
    private _numBeaconAsign: Subject<RegisterDto> = new Subject();

    public onViewDtoChangeReceived(): Observable<RegisterDto>{
        return this._numBeaconAsign.asObservable();
    }

    //Conectar con la Raspberry que detectará el BLE y traer su valor para mostrarlo por pantalla
    public async asignBeacon():Promise<AsignResponseDto>{
        console.log("Estoy en register controller");
        //Conectar con Raspberry y detectar BLE

        //Cambiar valor variable _numBeaconAsign para ser detectada por view
        this._numBeaconAsign.next({numBeaconAsign:'678', expedientValue:''});

        //const aux = firebase.database().ref().child('users').child('name');
        
        console.log("Hola");
        const response: AsignResponseDto = {
            status: 1,
            location: '/register',
        };
        console.log("Adios");
        return response;
    }

    //Conectar con la base de datos para enviar los datos del usuario y BLE y almacenarlos
    public async registerUser (registerRequest: RegisterRequest){
        console.log("Estoy en register controller");
    
        const auxd = firebase.database().ref().child('users').child('name');
        console.log(auxd);
        console.log("este es el bueno ")
        auxd.on('value', function(e) {
            console.log(e.val())
          });
    
        const response: AsignResponseDto = {
            status: 1,
            location: '/register',
        };
        return response;
    }
}