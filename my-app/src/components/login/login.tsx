import { Component } from "react";
import React from "react";
import { RouteComponentProps} from "react-router";
import {Box, Button} from '@material-ui/core';
import HeaderView from "../header/header";
import { LoginController } from "../../controllers/login/login.controller";
import { LoginRequestDto, ResponseLoginDto } from "../../controllers/login/login-dtos";
import { LoginDto } from "./login-dto";

export default class PruebaView extends Component<RouteComponentProps,LoginDto>{
    private _controller: LoginController;
    constructor (props: any){
        super(props);
        this._controller = new LoginController();
        this._controller.onViewRegisterDtoChangeReceived().subscribe((response: LoginDto)=>{
            this.setState(response);
        })
        this.state = {
            emailValue:'',
            passValue:'',
            showError:false,
        };
    }
    render(){
        return(
            <Box>
                <HeaderView />
                <Box className="background-gradient">
                    <Box className="half-left">
                        <p className="sentence">Localiza en un click</p>
                    </Box>
                    
                    <Box className="half-right">
                        <Box className="form-group">
                            <label className="title-input-login">USUARIO:</label>
                            <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Introduce el nombre de usuario..." onChange={event=>this.OnChangeTextFieldUser(event.target.value)}/>
                        </Box>
                        
                        <Box className="form-group">
                            <label className="title-input-login">CONTRASEÑA:</label>
                            <input type="password" className="form-control" placeholder="Introduce la contraseña..." onChange={event=>this.OnChangeTextFieldPass(event.target.value)}/>
                        </Box>
                        
                        <Box className="box-button-login">
                            <Button className="button-login" onClick={()=>this.login()}>Iniciar sesion</Button>
                        </Box>
                        {this.state.showError ?<p className="input-login-incorrect">El usuario o la contraseña no son correctos</p>: null}
                        
                    </Box>
                    
                </Box>
                <Box className="back-white center">
                    <Box className="mini-cards">
                        <p>Localiza de forma sencilla y rápida a los pacientes en las instalaciones del hospital</p>
                    </Box>
                    <Box className="mini-cards">
                        <p>Registra a los pacientes para poder detectar su posición</p>
                    </Box>
                    <Box className="mini-cards">
                        <p>Registra a los pacientes para poder detectar su posición</p>
                    </Box>
                    
                </Box>
            </Box>
        );
    }

    private OnChangeTextFieldUser(changeValue: string){
        this.setState({
            emailValue:changeValue,
        }) 
    }

    private OnChangeTextFieldPass(changeValue: string){
        this.setState({
            passValue:changeValue,
        })   
    }

    private async login(){
        var request: LoginRequestDto = {
            user: this.state.emailValue,
            pass: this.state.passValue,
        }
        
       const response: ResponseLoginDto = await this._controller.iniciarsesion(request);
       response.callback!(this.props);

    }
}
