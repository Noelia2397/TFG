import firebase from 'firebase';
import {firebaseConfig} from "../../config/config-bbdd";
import { LoginRequestDto, ResponseLoginDto, BaseLoginResponse } from './login-dtos';
import { Subject, Observable } from 'rxjs';
import { LoginDto } from '../../components/login/login-dto';

firebase.initializeApp(firebaseConfig);

export class LoginController{

    private _errorMessage: Subject<LoginDto> = new Subject();

    public onViewRegisterDtoChangeReceived(): Observable<LoginDto>{
        return this._errorMessage.asObservable();
    }

    public async iniciarsesion(loginRequest:LoginRequestDto): Promise<ResponseLoginDto>{

        if(loginRequest.user=='' || loginRequest.pass==''){
            this._errorMessage.next({emailValue:loginRequest.user, passValue:loginRequest.pass, showError:true});
            const response: ResponseLoginDto = {
                status: -1,
                location: '/login',
            };
            return this._buildCallbackResponse(response);
        }
        //Traer información de localización del paciente y mostrarla
        console.log("estoy en localizar");
        var datosBBDD:BaseLoginResponse ={
            pass:"",
        };

        const auxd = firebase.database().ref().child('admin').child(loginRequest.user);
        const snapshot = await auxd.once('value');
        datosBBDD = snapshot.val();

        if(datosBBDD!=null && datosBBDD.pass==loginRequest.pass){
            const response: ResponseLoginDto = {
                status: 1,
                location: '/options',
            };
            return this._buildCallbackResponse(response);
        }
        else{
            this._errorMessage.next({emailValue:loginRequest.user, passValue:loginRequest.pass, showError:true});
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