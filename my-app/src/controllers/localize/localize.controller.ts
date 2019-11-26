import { SearchRequest, ResponseDto, BaseDResponse } from "./localize-dtos";
import firebase from 'firebase';
import { Subject, Observable } from "rxjs";
import { LocalizeDto } from "../../components/localize/localize-dto";

export class LocalizeController{
    private _nameUserLocalize: Subject<LocalizeDto> = new Subject();
    
    public onViewLocalizeDtoChangeReceived(): Observable<LocalizeDto>{
        return this._nameUserLocalize.asObservable();
    }

    public async localizarPaciente(searchRequest:SearchRequest): Promise<ResponseDto>{
        //Traer información de localización del paciente y mostrarla
        console.log("estoy en localizar controller");
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
    }
}