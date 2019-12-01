import { SearchRequest, ResponseDto, BaseDResponse, ListBaseDResponse, CoordenadasResponse } from "./localize-dtos";
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
        
        var datosBBDD:BaseDResponse[] = [];
        var listdatosBBDD:ListBaseDResponse;
       
        const auxd = firebase.database().ref('users/'+searchRequest.hist_clin+'/localizacion').limitToLast(2).orderByKey();

        auxd.on('value', function(snapshot) {
            snapshot.forEach(function(dataChild){
                datosBBDD.push(dataChild.val());
            })
            listdatosBBDD={
                hist_clin:searchRequest.hist_clin,
                listLocalization: datosBBDD,
            };
            updateLocalization(listdatosBBDD);
        });
        
        const response: ResponseDto = {
            status: 1,
            location: '/localize',
        };

        return response;
    }

    public async calculateDistance(distancia:string):Promise<any> {
        console.log("Voy a calcular la distancia");
        var txPower = -59 //hard coded power value. Usually ranges between -59 to -65
        var rssi=parseInt(distancia);
        if (rssi === 0) {
            return -1.0; 
        }
      
        var ratio = rssi*1.0/txPower;

        if (ratio < 1.0) {
            return Math.pow(ratio,10);
        }
        else {
            var distance =  (0.89976)*Math.pow(ratio,7.7095) + 0.111;   
            return distance;
        }
    } 

    public async clasificarDatos(lista:ListBaseDResponse){
        if(lista.listLocalization[0].direccion===lista.listLocalization[1].direccion){
            this.recuperarCoordenadas(lista.listLocalization[0].direccion);
            console.log("Son iguales, pinto: ", lista.listLocalization[0].direccion);
        }
        else{
            console.log("voy a comprobar el más cercano");
            if(lista.listLocalization[0].valor<lista.listLocalization[1].valor){
                this.recuperarCoordenadas(lista.listLocalization[0].direccion);
                console.log("no son iguales, pinto: ", lista.listLocalization[0].direccion);
            }
            else{
                this.recuperarCoordenadas(lista.listLocalization[1].direccion);
                console.log("no son iguales, pinto: ", lista.listLocalization[1].direccion);
            }
        }
    }

    public async recuperarCoordenadas(receptor:string):Promise<CoordenadasResponse>{
        console.log("estoy buscando coordenadas");
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
        console.log(coordenadas);
        return coordenadas;
    }

    public async prueba(){
        console.log("estoy en prueba");
    }
}

var controlador:LocalizeController=new LocalizeController();
function updateLocalization(lista:ListBaseDResponse) {
    console.log("hola estoy en funcion");
    console.log(lista);
    console.log(lista.listLocalization);
    lista.listLocalization.forEach(item => {
        item.valor=controlador.calculateDistance(item.distancia);
    });
    controlador.clasificarDatos(lista);
    console.log(lista);
}