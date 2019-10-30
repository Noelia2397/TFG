import { Component } from "react";
import React from "react";
import { RouteComponentProps } from "react-router";
import {Box, Button, TextField} from '@material-ui/core';
import HeaderView from "../header/header";
import FooterView from "../footer/footer";
import { AsignRequest, AsignResponseDto, RegisterRequest } from "../../assets/controllers/register/register-dtos";
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
                        <input type="text" id="exp" name="lname" />
                        <Button className="button-asign-ble" onClick={()=>this.asign_beacon()}>Asignar localizador</Button>
                        <br></br>
                        <label >Nº localizador</label>
                        <input type="text" id="beacon" name="lname" />
                        <Button className="button-asign-ble" onClick={()=>this.registerUserWithBeacon()}>Dar de alta</Button>
                    </form> 
                    
                </Box>
                <Box className="back-white">
                    <p className="sentence">Localiza en un click</p>
                    <p>Hola</p>
                    
                </Box>
                <FooterView />
            </Box>
        );
       /* var firebase = require("firebase");*/
    }
    private OnChangeTextField(changeValue: string){
        console.log("Holaaaaa");
        this.setState({
            expedientValue:changeValue,
        })
        
    }
    private async asign_beacon(){
       let request: AsignRequest = {
            expValue: this.state.expedientValue,
       }
       const response: AsignResponseDto = await this._controller.asignBeacon(request);

       console.log(response.numBeaconAsign);

    }
    private async registerUserWithBeacon(){
        let request: RegisterRequest = {
           user: this.state.expedientValue,
           beacon: "1369",
       }
       const response: AsignResponseDto = await this._controller.registerUser(request);
       console.log(response.status);
    }
}