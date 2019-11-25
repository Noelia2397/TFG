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
                    
                        <Box className="w3-hover-shadow cards" id="first" onClick={()=>this.redirect_register()}>
                            <Box className="subtitle-options">
                                <p>DAR DE ALTA</p>
                            </Box>
                        </Box>
                        <Box className="w3-hover-shadow cards" id="second" onClick={()=>this.redirect_localize()}>
                            <Box className="subtitle-options">
                                <p>LOCALIZAR</p>
                            </Box>
                        </Box>
                        <Box className="w3-hover-shadow cards" id="third" onClick={()=>this.redirect_unregister()}>
                            <Box className="subtitle-options">
                                <p>DAR DE BAJA</p>
                            </Box>
                        </Box>
                    
                </Box>
              {/*}  <Box className="back-white">
                    <p className="sentence">Localiza en un click</p>
                    <p>Hola</p>
                    
        </Box>*/}
            </Box>
        );
    }
    private redirect_register(){
        this.props.history.push({pathname:"/register"})
    }
    private redirect_unregister(){
        this.props.history.push({pathname:"/unregister"})
    }
    private redirect_localize(){
        this.props.history.push({pathname:"/localize"})
    }
}