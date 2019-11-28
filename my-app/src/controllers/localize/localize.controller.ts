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

        listdatosBBDD.listLocalization.forEach(item => {
            item.valor=this.calculateDistance(item.distancia);
        });

        this.clasificarDatos(listdatosBBDD);

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

    public async clasificarDatos(lista:ListBaseDResponse){
        var ultReceptor=lista.listLocalization[9].direccion;
        var i=8;
        var num=0;
        var existe=false;
        var receptores=[];
        while(i>-1){
            while(num < receptores.length || existe == true){
                if(lista.listLocalization[i].direccion==receptores[num]){
                    existe=true;
                    break;
                }
                num++;
                console.log("h", existe);
            }
            if(existe==false){
                receptores.push(lista.listLocalization[i].direccion)
            }

            console.log(receptores);
            i--;
        }
        console.log("El paciente está en: "+ultReceptor);
    }
}