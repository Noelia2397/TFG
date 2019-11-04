import { Component } from "react";
import React from "react";
import { RouteComponentProps } from "react-router";
import {Box} from '@material-ui/core';
import HeaderView from "../header/header";
import FooterView from "../footer/footer";

export default class OptionsView extends Component<RouteComponentProps>{
    constructor (props: any){
        super(props);
    }
    render(){
        return(
            <Box>
                <HeaderView />
                <Box className="background-gradient center">
                    
                        <Box className="w3-hover-shadow cards" onClick={()=>this.redirect_register()}>
                            <img id="alta" className="img-style" src="https://ca.maps-edinburgh.com/img/0/western-general-hospital-mapa.jpg" ></img>
                            <Box>
                                <p>DAR DE ALTA</p>
                            </Box>
                        </Box>
                        <Box className="w3-hover-shadow cards" onClick={()=>this.redirect_unregister()}>
                            <img className="img-style" src="https://ca.maps-edinburgh.com/img/0/western-general-hospital-mapa.jpg" ></img>
                            <Box>
                                <p>BUSCAR</p>
                            </Box>
                        </Box>
                        <Box className="w3-hover-shadow cards">
                            <img className="img-style" src="https://ca.maps-edinburgh.com/img/0/western-general-hospital-mapa.jpg"></img>
                            <Box>
                                <p>DAR DE BAJA</p>
                            </Box>
                        </Box>
                    
                </Box>
                <Box className="back-white">
                    <p className="sentence">Localiza en un click</p>
                    <p>Hola</p>
                    
                </Box>
                <FooterView />
            </Box>
        );
    }
    private redirect_register(){
        this.props.history.push({pathname:"/register"})
    }
    private redirect_unregister(){
        this.props.history.push({pathname:"/unregister"})
    }
}