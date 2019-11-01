import { Component } from "react";
import React from "react";
import { RouteComponentProps } from "react-router";
import {Box, Button, TextField} from '@material-ui/core';
import HeaderView from "../header/header";
import FooterView from "../footer/footer";
import { AsignResponseDto, RegisterRequest } from "../../assets/controllers/register/register-dtos";
import { RegisterDto } from "./register-dto";
import { RegisterController } from "../../assets/controllers/register/register.controller";

export default class RegisterView extends Component<RouteComponentProps, RegisterDto>{
    private _controller: RegisterController;
    
    constructor (props: any){
        super(props);
        this._controller = new RegisterController();
        this._controller.onViewDtoChangeReceived().subscribe((response: RegisterDto)=>{
            this.setState(response);
        })
        this.state = {
            expedientValue: '',
            numBeaconAsign: '',
        };
    }
    render(){
        return(
            <Box>
                <HeaderView />
                <Box className="back-gradient center">
                    <form>
                        <label>Nombre del paciente</label>
                        <input type="text" id="name" name="fname" onChange={event=>this.OnChangeTextField(event.target.value)} />
                        
                        <label >Nº expediente</label>
                        <input type="text" id="exp" name="lname" onChange={event=>this.OnChangeTextField(event.target.value)}/>
                        
                        <Button className="button-register-user-ble" onClick={()=>this.asign_beacon()}>Asignar localizador</Button>
                        
                        <br></br>
                        
                        <label >Nº localizador</label>
                        <input type="text" id="beacon" name="lname" value={this.state.numBeaconAsign} readOnly/>
                        
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
    private OnChangeTextField(changeValue: string){
        console.log("Holaaaaa");
        this.setState({
            expedientValue:changeValue,
        })
        
    }
    private async asign_beacon(){

       const response: AsignResponseDto = await this._controller.asignBeacon();

    }
    private async registerUserAndBeacon(){
        let request: RegisterRequest = {
           user_name:"Mario",
           user_exp: this.state.expedientValue,
           beacon: this.state.numBeaconAsign,
       }
       const response: AsignResponseDto = await this._controller.registerUser(request);
       console.log(response.status);
    }
}