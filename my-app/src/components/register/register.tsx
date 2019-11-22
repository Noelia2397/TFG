import { Component } from "react";
import React from "react";
import { RouteComponentProps } from "react-router";
import {Box, Button, TextField} from '@material-ui/core';
import HeaderView from "../header/header";
import { ResponseDto, RegisterRequest } from "../../controllers/register/register-dtos";
import { RegisterDto } from "./register-dto";
import { RegisterController } from "../../controllers/register/register.controller";
import Popup from "../popup/popup";

export default class RegisterView extends Component<RouteComponentProps, RegisterDto>{
    private _controller: RegisterController;
    
    constructor (props: any){
        super(props);
        this._controller = new RegisterController();
        this._controller.onViewRegisterDtoChangeReceived().subscribe((response: RegisterDto)=>{
            this.setState(response);
        })
        this.state = {
            NamePatientValue: '',
            HClinicoValue: '',
            numBeaconAsign: '',
            showPopup:false,
        };
    }
    
    render(){
        return(
            <Box>
                <HeaderView />
                <Box className="background-gradient center">
                    <Box className="BoxForm">
                        <form className="totalWidth">
                            <h1 className="titlePage">DAR DE ALTA PACIENTE</h1>

                            <Box className="input-group mb-3">
                                <Box className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default" >NOMBRE DEL PACIENTE</span>
                                </Box>
                                <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="Introduce valor..." onChange={event=>this.OnChangeTextFieldName(event.target.value)}></input>
                            </Box>
                            <Box className="input-group mb-3 mt-3">
                                <Box className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">HISTORIAL CLÍNICO</span>
                                </Box>
                                <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"  placeholder="Introduce valor..." onChange={event=>this.OnChangeTextFieldHClinic(event.target.value)}></input>
                            </Box>

                            <Box className="btn btn-secondary button-register" onClick={this.togglePopup.bind(this)}>ASIGNAR LOCALIZADOR</Box>
                            {this.state.showPopup ?
                                <Popup
                                    text='Acerca el dispositivo al ordenador...'
                                    closePopup={this.togglePopup.bind(this)}
                                />
                                : null
                            }

                            <Box className="input-group mb-3 mt-3">
                                <Box className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">LOCALIZADOR</span>
                                </Box>
                                <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={this.state.numBeaconAsign} readOnly></input>
                            </Box>
                                
                            <Box className=" btn btn-secondary button-register" onClick={()=>this.registerUserAndBeacon()}>DAR DE ALTA</Box>

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
    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
    }

    private OnChangeTextFieldName(changeValue: string){
        this.setState({
            NamePatientValue:changeValue,
        })
        
    }
    private OnChangeTextFieldHClinic(changeValue: string){
        this.setState({
            HClinicoValue:changeValue,
        })
        
    }
    private async asign_beacon(){
        var request: RegisterRequest = {
            user_name:this.state.NamePatientValue,
            user_hist: this.state.HClinicoValue,
            beacon: this.state.numBeaconAsign,
        }
        console.log(this.state.HClinicoValue,this.state.NamePatientValue,this.state.numBeaconAsign);
        //this._controller.asignBeacon(request);
        const response: ResponseDto = await this._controller.asignBeacon(request);
        console.log('He vuelto');
        console.log(this.state.HClinicoValue,this.state.NamePatientValue,this.state.numBeaconAsign);
        //response.callback!(this.props);

    }
    private async registerUserAndBeacon(){
        let request: RegisterRequest = {
           user_name:this.state.NamePatientValue,
           user_hist: this.state.HClinicoValue,
           beacon: this.state.numBeaconAsign,
       }
       const response = this._controller.registerUser(request);
      // response.callback!(this.props);
       //const response: AsignResponseDto = await this._controller.registerUser(request);
    }
}