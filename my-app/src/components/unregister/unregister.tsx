import { Component } from "react";
import React from "react";
import { RouteComponentProps } from "react-router";
import {Box, Button} from '@material-ui/core';
import HeaderView  from "../header/header";
import { SearchRequest, ResponseDto, SearchResponse, DeleteRequest } from "../../controllers/register/register-dtos";
import { RegisterController } from "../../controllers/register/register.controller";
import { UnregisteDto } from "./unregister-dto";

export default class UnregisterView extends Component<RouteComponentProps,UnregisteDto>{
    private _controller: RegisterController;
    
    constructor (props: any){
        super(props);
        this._controller = new RegisterController();
        this._controller.onViewUnregisterDtoChangeReceived().subscribe((response: UnregisteDto)=>{
            this.setState(response);
        })
        this.state = {
            NamePatientValue: '',
            HistClinicoValue:'',
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

                        <Button className="button-register-user-ble" onClick={()=>this.borrarPaciente()}>Borrar paciente</Button>
                        
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
       const response: ResponseDto = await this._controller.datosPaciente(request);

    }

    private async borrarPaciente(){
        var request: DeleteRequest = {
            hist_clin: this.state.HistClinicoValue,
            beacon: this.state.numBeaconAsign,
        }
        const response: ResponseDto = await this._controller.borrarPaciente(request);
       

    }
}