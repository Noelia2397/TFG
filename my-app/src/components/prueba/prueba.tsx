import { Component } from "react";
import React from "react";
import { RouteComponentProps} from "react-router";
import {Box, Button} from '@material-ui/core';
import HeaderView from "../header/header";

export default class PruebaView extends Component<RouteComponentProps>{
    constructor (props: any){
        super(props);
    }
    render(){
        return(
            <Box>
                <HeaderView />
                <Box className="back-gradient">
                    <Box className="half-left">
                        <p className="sentence">Localiza en un click</p>
                    </Box>
                    
                    <Box>
                        <img className="img-style" src="https://ca.maps-edinburgh.com/img/0/western-general-hospital-mapa.jpg"></img>
                        <br></br>
                        <Button className="button-login" onClick={()=>this.redirect_options()}>Iniciar sesion</Button>
                    </Box>
                    
                </Box>
                <Box className="back-white">
                    <p className="sentence">Localiza en un click</p>
                    <p>Hola</p>
                    
                </Box>
            </Box>
        );
    }
    private redirect_options(){
        this.props.history.push({pathname:"/options"})
    }
}
