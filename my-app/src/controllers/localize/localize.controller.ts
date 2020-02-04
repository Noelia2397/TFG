import { SearchRequest, ResponseDto, BaseDLocResponse, ListBaseDResponse, CoordenadasResponse } from "./localize-dtos";
import firebase from 'firebase';
import { Subject, Observable } from "rxjs";
import { LocalizeDto } from "../../components/localize/localize-dto";

export class LocalizeController{
    private _localization: Subject<LocalizeDto> = new Subject();
    
    public onViewLocalizeDtoChangeReceived(): Observable<LocalizeDto>{
        return this._localization.asObservable();
    }
    
    public async localizarPaciente(searchRequest:SearchRequest): Promise<ResponseDto>{
        var datosBBDD:BaseDLocResponse[] = [];
        var listdatosBBDD:ListBaseDResponse;
       
        const auxd = firebase.database().ref('users/'+searchRequest.hist_clin+'/localizacion').limitToLast(2);

        auxd.on('value', (snapshot) =>{
            if(datosBBDD.length>1 && datosBBDD.length===2){
                datosBBDD.pop();
                datosBBDD.pop();
            }
            snapshot.forEach(function(dataChild){
                datosBBDD.push(dataChild.val());
            })

            listdatosBBDD={
                hist_clin:searchRequest.hist_clin,
                listLocalization: datosBBDD,
            };

            if(datosBBDD.length>0){
                this.actualizarLocalizacion(listdatosBBDD);
            }
            else{
                this._localization.next({HistClinicoValue: searchRequest.hist_clin,
                    start1x: '',
                    start1y: '',
                    start2x: '',
                    start2y: '',
                    coor1x: '',
                    coor1y:'',
                    coor2x: '',
                    coor2y: '',
                    showCanvas:false,
                    showError:true});
            }
        });

        const response: ResponseDto = {
            status: 1,
            location: '/localize',
        };

        return response;
    }

    public async actualizarLocalizacion(lista:ListBaseDResponse){
        lista.listLocalization.forEach(item => {
            item.valor=this.calculateDistance(item.distancia);
        });

        if(lista.listLocalization.length>1){
            this.clasificarDatos(lista);
        }
        else{
            this.recuperarCoordenadas(lista.hist_clin,lista.listLocalization[0].direccion);
        }
    }

    public calculateDistance(distancia:string):string {
        var txPower = -59 //hard coded power value. Usually ranges between -59 to -65
        var rssi=parseInt(distancia);
        if (rssi === 0) {
            return (-1.0).toString(); 
        }
      
        var ratio = rssi*1.0/txPower;

        if (ratio < 1.0) {
            return Math.pow(ratio,10).toString();
        }
        else {
            var distance =  (0.89976)*Math.pow(ratio,7.7095) + 0.111;  
            return distance.toString();
        }
    } 

    public async clasificarDatos(lista:ListBaseDResponse){
        if(lista.listLocalization[0].direccion===lista.listLocalization[1].direccion){
            this.recuperarCoordenadas(lista.hist_clin,lista.listLocalization[0].direccion);        
        }
        else{
            if(lista.listLocalization[0].valor<lista.listLocalization[1].valor){
                this.recuperarCoordenadas(lista.hist_clin,lista.listLocalization[0].direccion);
            }
            else{
                this.recuperarCoordenadas(lista.hist_clin,lista.listLocalization[1].direccion);
            }
        }
    }

    public async recuperarCoordenadas(paciente:string,receptor:string){
        var coordenadas:CoordenadasResponse = {
            start1x: '',
            start1y: '',
            start2x: '',
            start2y: '',
            coor1x: '',
            coor1y:'',
            coor2x: '',
            coor2y:'',
        };
        const auxd = firebase.database().ref('coordenadas/'+receptor);
        const snapshot = await auxd.once('value', function(data){
            coordenadas=data.val();
        });

        this._localization.next({HistClinicoValue: paciente,
                                start1x: coordenadas.start1x,
                                start1y: coordenadas.start1y,
                                start2x: coordenadas.start2x,
                                start2y: coordenadas.start2y,
                                coor1x: coordenadas.coor1x,
                                coor1y:coordenadas.coor1y,
                                coor2x: coordenadas.coor2x,
                                coor2y: coordenadas.coor2y,
                                showCanvas:true,
                                showError:false});
    }
}