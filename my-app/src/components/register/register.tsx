import { Component } from "react";
import React from "react";
import { RouteComponentProps } from "react-router";
import {Box, Button, TextField} from '@material-ui/core';
import HeaderView from "../header/header";
import FooterView from "../footer/footer";
import { ResponseDto, RegisterRequest } from "../../controllers/register/register-dtos";
import { RegisterDto } from "./register-dto";
import { RegisterController } from "../../controllers/register/register.controller";

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
        };
    }
    render(){
        return(
            <Box>
                <HeaderView />
                <Box className="background-gradient center">
                    <form>
                        <label>Nombre del paciente</label>
                        <input type="text" id="uname" onChange={event=>this.OnChangeTextFieldName(event.target.value)} />
                        
                        <label >Historial clínico</label>
                        <input type="text" id="hist" onChange={event=>this.OnChangeTextFieldHClinic(event.target.value)}/>
                        
                        <Button className="button-register-user-ble" onClick={()=>this.asign_beacon()}>Asignar localizador</Button>
                        
                        <br></br>
                        
                        <label >Nº localizador</label>
                        <input type="text" id="ble" value={this.state.numBeaconAsign} readOnly/>
                        
                        <Button className="button-register-user-ble" onClick={()=>this.registerUserAndBeacon()}>Dar de alta</Button>
                    </form>
                    
                </Box>
                <Box className="back-white">
                    <p className="sentence">Localiza en un click</p>
                    <p>Hola</p>
                    
                </Box>
                <FooterView />
            </Box>
        );
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
        this._controller.asignBeacon(request);
       //const response: AsignResponseDto = await this._controller.asignBeacon(request);

    }
    private async registerUserAndBeacon(){
        let request: RegisterRequest = {
           user_name:this.state.NamePatientValue,
           user_hist: this.state.HClinicoValue,
           beacon: this.state.numBeaconAsign,
       }
       const response = this._controller.registerUser(request);
       response.callback!(this.props);
       //const response: AsignResponseDto = await this._controller.registerUser(request);
    }
}