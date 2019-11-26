import React from "react";  
import { Box } from "@material-ui/core";
import { PopupConfirDto } from "./popupConfir-dto";

class PopupConfir extends React.Component<PopupConfirDto> {  
    constructor (props: any){
        super(props);
        
        this.state = {
            text: '',
            closePopup: '',
            cancelPopup:'',
            hist:'',
            name:'',
            loc:'',
        };
    }
    render() {  
        return (  
            <Box className="popup" onClick={this.props.cancelPopup}>  
                <Box className="popup_inner">  
                    <p className="textPopup">{this.props.text}</p>  
                    <p className="textPopupsmall">Historial clínico: {this.props.hist}</p>
                    <p className="textPopupsmall">Nombre: {this.props.name}</p>
                    <p className="textPopupsmall">Localizador: {this.props.loc}</p>
                   
                    <button className="btn btn-success cancelPopup" onClick={this.props.closePopup}>ACEPTAR</button>  
                    <button className="btn btn-danger cancelPopup" onClick={this.props.cancelPopup}>CANCELAR</button> 
                    
                </Box>  
            </Box>  
        );  
    }  
}

export default PopupConfir;