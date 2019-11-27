import { SearchRequest, ResponseDto, BaseDResponse, ListBaseDResponse } from "./localize-dtos";
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
        var listdatosBBDD:ListBaseDResponse;
        var datosBBDD:BaseDResponse[] = [];
        const auxd = firebase.database().ref('users/'+searchRequest.hist_clin+'/localizacion').limitToLast(10).orderByKey();
        const snapshot = await auxd.once('value', function(data){
           /* data.forEach(item=>{
                datosBBDD.push(item);
            });*/
            data.forEach(function(dataChild){
                datosBBDD.push(dataChild.val());
            })
        });

        listdatosBBDD={
            listLocalization: datosBBDD,
        }
        console.log(listdatosBBDD.listLocalization);

        listdatosBBDD.listLocalization.forEach(item => {
            console.log("voy a llamar ", item.distancia);
            const response=this.calculateDistance(item.distancia);
            console.log(response);
            item.valor=response;
        });

        console.log(listdatosBBDD.listLocalization);
        
        const response: ResponseDto = {
            status: 1,
            location: '/localize',
        };

        return response;
    }

    public async calculateDistance(distancia:string) {
  
        var txPower = -59 //hard coded power value. Usually ranges between -59 to -65
        var rssi=parseInt(distancia);
        console.log('rssi: ', rssi)
        if (rssi === 0) {
            return -1.0; 
        }
      
        var ratio = rssi*1.0/txPower;

        if (ratio < 1.0) {
            console.log("ratio menor que 1");
            return Math.pow(ratio,10);
        }
        else {
            console.log("mayor que 1")
            var distance =  (0.89976)*Math.pow(ratio,7.7095) + 0.111;   
            console.log("distance: ", distance) 
            return distance;
        }
      } 
}