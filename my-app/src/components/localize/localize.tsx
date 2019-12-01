import { Component } from "react";
import React from "react";
import { RouteComponentProps } from "react-router";
import {Box} from '@material-ui/core';
import HeaderView  from "../header/header";
import { SearchRequest, ResponseDto } from "../../controllers/register/register-dtos";
import { LocalizeDto } from "./localize-dto";
import { LocalizeController } from "../../controllers/localize/localize.controller";
import Canvas from "../canvas/canvas";

export default class LocalizeView extends Component<RouteComponentProps,LocalizeDto>{
    private _controller: LocalizeController;
    
    constructor (props: any){
        super(props);
        this._controller = new LocalizeController();
        this._controller.onViewLocalizeDtoChangeReceived().subscribe((response: LocalizeDto)=>{
            this.setState(response);
        })
        this.state = {
            HistClinicoValue: '',
        };
    }
    render(){
        return(
            <Box>
                <HeaderView />
                <Box className="background-gradient center">
                    <Box className="BoxForm">
                        <form className="totalWidth">
                            <h1 className="titlePage">LOCALIZAR PACIENTE</h1>

                            <Box className="input-group mb-3">
                                <Box className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default" >HISTORIAL CLÍNICO</span>
                                </Box>
                                <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="Introduce valor..." onChange={event=>this.OnChangeTextField(event.target.value)}></input>
                            </Box>

                            <Box className="btn btn-secondary button-register" onClick={()=>this.buscar_paciente()}>LOCALIZAR PACIENTE</Box>
                            
                        </form>
                        
                    </Box>  
                    <Box className="mapa">
                        <Canvas
                            start1x={121} start1y={428}
                            start2x={303} start2y={333}
                            coor1x={145} coor1y={313}
                            coor2x={279} coor2y={447}
                        />
                    </Box>                  
                </Box>
                <Box className="back-white">
                    <p className="sentence">Localiza en un click</p>
                    <p>Hola</p>
                    
                </Box>
               
            </Box>
        );
    }
    private OnChangeTextField(changeValue: string){
        this.setState({
            HistClinicoValue:changeValue,
        })
    }

    private async buscar_paciente(){
        var request: SearchRequest = {
            hist_clin:this.state.HistClinicoValue,
        }

        const response: ResponseDto = await this._controller.localizarPaciente(request);
       

    }
}