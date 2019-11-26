import { Component } from "react";
import React from "react";
import { RouteComponentProps } from "react-router";
import {Box} from '@material-ui/core';
import HeaderView from "../header/header";
import { ResponseDto, RegisterRequest } from "../../controllers/register/register-dtos";
import { RegisterDto } from "./register-dto";
import { RegisterController } from "../../controllers/register/register.controller";
import Popup from "../popup/popup";
import PopupConfir from "../popupConfir/popupConfir";

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
            showPopupConfir: false,
            showError:false,
            showErrorLoc:false,
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

                            <Box className="btn btn-secondary button-register" onClick={()=>this.asign_beacon()}>ASIGNAR LOCALIZADOR</Box>

                            {this.state.showError ?<p className="input-login-incorrect">Es necesario rellenar todos los campos</p>: null}
                            
                            <Box className="input-group mb-3 mt-3">
                                <Box className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">LOCALIZADOR</span>
                                </Box>
                                <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={this.state.numBeaconAsign} readOnly></input>
                            </Box>
                                
                            <Box className=" btn btn-secondary button-register" onClick={()=>this.registerUserAndBeacon()}>DAR DE ALTA</Box>

                            {this.state.showErrorLoc ?<p className="input-login-incorrect">Es necesario asignar un localizador</p>: null}
                            
                            {this.state.showPopup ?
                                <Popup
                                    text='Acerca el dispositivo al ordenador...'
                                    closePopup={()=>this.showPopUp()}
                                />
                                : null
                            }
                            {this.state.showPopupConfir ?
                                <PopupConfir
                                    text='¿Estás seguro que deseas dar de alta este paciente?'
                                    hist={this.state.HClinicoValue}
                                    name={this.state.NamePatientValue}
                                    loc={this.state.numBeaconAsign}
                                    closePopup={()=>this.acceptRegister()}
                                    cancelPopup={()=>this.showPopUpConfir()}
                                />
                                : null
                            }
                        </form>
                    </Box>
                </Box>
            </Box>
        );
    }

    private showPopUp(){
        if(this.state.showPopup==true){
            this._controller.cerrarConexion();
        }
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    
    private showPopUpConfir(){
        this.setState({
            showPopupConfir: !this.state.showPopupConfir
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
        if(this.state.NamePatientValue==''|| this.state.HClinicoValue==''){
            this.setState({
                showError: true,
            })
        }
        else{
            this.showPopUp();

            var request: RegisterRequest = {
                user_name:this.state.NamePatientValue,
                user_hist: this.state.HClinicoValue,
                beacon: this.state.numBeaconAsign,
            }
            
            const response: ResponseDto = await this._controller.asignBeacon(request);
        }
    }
    
    private async registerUserAndBeacon(){
        if(this.state.numBeaconAsign==''){
            this.setState({
                showErrorLoc: true,
            })
        }
        else{
            this.showPopUpConfir();
        }
    }

    private async acceptRegister(){

        this.showPopUpConfir();

        let request: RegisterRequest = {
            user_name:this.state.NamePatientValue,
            user_hist: this.state.HClinicoValue,
            beacon: this.state.numBeaconAsign,
        }

        const response = this._controller.registerUser(request);
    }
}