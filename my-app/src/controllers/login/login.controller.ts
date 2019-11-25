import firebase from 'firebase';
import {firebaseConfig} from "../../config/config-bbdd";
import { LoginRequestDto, ResponseLoginDto, BaseLoginResponse } from './login-dtos';

firebase.initializeApp(firebaseConfig);

export class LoginController{
    public async iniciarsesion(loginRequest:LoginRequestDto): Promise<ResponseLoginDto>{
        //Traer información de localización del paciente y mostrarla
        console.log("estoy en localizar");
        var datosBBDD:BaseLoginResponse ={
            pass:"",
        };

        const auxd = firebase.database().ref().child('admin').child(loginRequest.user);
        const snapshot = await auxd.once('value');
        datosBBDD = snapshot.val();


        /*const auxd = firebase.database().ref('admin/'+loginRequest.user);
        const snapshot = await auxd.once('value', function(data){
            data.forEach(function(childData){
                datosBBDD = childData.val();
                console.log(datosBBDD);
            });
        });*/

        console.log(datosBBDD.pass);
        console.log(loginRequest.pass);

        if(datosBBDD.pass==loginRequest.pass){
            console.log("Correcto");
            const response: ResponseLoginDto = {
                status: 1,
                location: '/options',
            };
            return this._buildCallbackResponse(response);
        }
        else{
            console.log("Incorrecto");
            const response: ResponseLoginDto = {
                status: -1,
                location: '/login',
            };
            return this._buildCallbackResponse(response);
        }
                
    }

    private _buildCallbackResponse(response: ResponseLoginDto): ResponseLoginDto {
        response.callback = router =>
          router.history.push({
            pathname: response.location,
            state: { message: response.status},
          });
        return response;
    }
}