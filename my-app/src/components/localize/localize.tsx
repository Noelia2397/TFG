import { Component } from "react";
import React from "react";
import { RouteComponentProps } from "react-router";
import {Box, Button} from '@material-ui/core';
import HeaderView  from "../header/header";
import { SearchRequest, ResponseDto, SearchResponse } from "../../controllers/register/register-dtos";
import { RegisterController } from "../../controllers/register/register.controller";
import { LocalizeDto } from "./localize-dto";

export default class LocalizeView extends Component<RouteComponentProps,LocalizeDto>{
    private _controller: RegisterController;
    
    constructor (props: any){
        super(props);
        this._controller = new RegisterController();
        this._controller.onViewLocalizeDtoChangeReceived().subscribe((response: LocalizeDto)=>{
            this.setState(response);
        })
        this.state = {
            HistClinicoValue: '',
            NamePatientValue: '',
            numBeaconAsign: '',
        };
    }
    render(){
        return(
            <Box>
                <HeaderView />
                <Box className="background-gradient center"><form>
                        <label>Número historial del paciente</label>
                        <input type="text" id="uname" onChange={event=>this.OnChangeTextField(event.target.value)} />

                        <Button className="button-register-user-ble" onClick={()=>this.buscar_paciente()}>Buscar paciente</Button>
                        <br></br>
                        
                        <label >Nombre del paciente</label>
                        <input type="text" id="hist" value={this.state.NamePatientValue} readOnly/>
                        
                        
                        
                        <label >Nº localizador</label>
                        <input type="text" id="ble" value={this.state.numBeaconAsign} readOnly/>
                        
                    </form>
                </Box>
                <Box className="back-white">
                    <p className="sentence">Localiza en un click</p>
                    <p>Hola</p>
                    
                </Box>
               
            </Box>
        );
    }
    private OnChangeTextField(changeValue: string){
        this.setState({
            HistClinicoValue:changeValue,
        })
    }

    private async buscar_paciente(){
        var request: SearchRequest = {
            hist_clin:this.state.HistClinicoValue,
        }
        //this._controller.localizarPaciente(request);
       const response: ResponseDto = await this._controller.localizarPaciente(request);
       //const datos: SearchResponse = response.objResponse;
       console.log("He vuelto a view");
       /*console.log("Beacon: "+datos.beacon);
       console.log(datos.userName);*/

    }
}