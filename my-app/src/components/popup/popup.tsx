import React, { Component } from "react";  
import { Box } from "@material-ui/core";
import { PopupDto } from "./popup-dto";
import esperar from "../../assets/images/esperar.gif";

class Popup extends React.Component<PopupDto> {  
    constructor (props: any){
        super(props);
        
        this.state = {
            text: '',
            closePopup: '',
        };
    }
    render() {  
        return (  
            <Box className="popup" onClick={this.props.closePopup}>  
                <Box className="popup_inner">  
                    <p className="textPopup">{this.props.text}</p>  
                    <Box className="gif-box">
                        <img className="gif-loading" src={esperar}></img>
                    </Box>
                    

                    <button className="btn btn-danger cancelPopup" onClick={this.props.closePopup}>CANCELAR</button>  
                </Box>  
            </Box>  
        );  
    }  
}

export default Popup;