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
                <Box className="background-gradient center">
                    <Box className="BoxForm">
                        <form className="totalWidth">
                            <h1 className="titlePage">DAR DE BAJA PACIENTE</h1>

                            <Box className="input-group mb-3">
                                <Box className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default" >HISTORIAL CLÍNICO</span>
                                </Box>
                                <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="Introduce valor..." onChange={event=>this.OnChangeTextField(event.target.value)}></input>
                            </Box>

                            <Box className="btn btn-secondary button-register" onClick={()=>this.buscar_paciente()}>BUSCAR PACIENTE</Box>

                            <Box className="input-group mb-3 mt-3">
                                <Box className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">NOMBRE DEL PACIENTE</span>
                                </Box>
                                <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"  value={this.state.NamePatientValue} readOnly></input>
                            </Box>

                            

                            <Box className="input-group mb-3 mt-3">
                                <Box className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Nº LOCALIZADOR</span>
                                </Box>
                                <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={this.state.numBeaconAsign} readOnly></input>
                            </Box>
                                
                            <Box className=" btn btn-secondary button-register" onClick={()=>this.borrarPaciente()}>DAR DE BAJA</Box>

                        </form>
                    </Box>
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
       //response.callback!(this.props);

    }

    private async borrarPaciente(){
        var request: DeleteRequest = {
            hist_clin: this.state.HistClinicoValue,
            beacon: this.state.numBeaconAsign,
        }
        const response: ResponseDto = await this._controller.borrarPaciente(request);
        //response.callback!(this.props);
       

    }
}