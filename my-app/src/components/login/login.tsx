import { Component } from "react";
import React from "react";
import { RouteComponentProps, Router } from "react-router";
import {Box, Button, TextField} from '@material-ui/core';
import HeaderView from "../header/header";
import FooterView from "../footer/footer";

export default class LoginView extends Component<RouteComponentProps>{
    constructor (props: any){
        super(props);
    }
    render(){
        return(
            <Box>
                <HeaderView />
                <Box className="section">
                    <Box className="half-section-left">
                        <p className="sentence">Localiza en un click</p>
                    </Box>
                    <Box className="half-section-right">
                        <Box className="subsection-right">
                            <h1>Iniciar sesión</h1>
                            <TextField id="outlined-name" label="Usuario" className="textField" value='hola' variant= "outlined"/>
                            <TextField id="outlined-name" label="Contraseña" className="textField" value='******' variant= "outlined"/>
                        </Box>
                        <Button className="button-login" onClick={()=>this.redirect_options()}>Iniciar sesion</Button>
                    </Box>
                    
                </Box>
                <FooterView />
            </Box>
        );
    }
    private redirect_options(){
        this.props.history.push({pathname:"/prueba"})
    }
}
