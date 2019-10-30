import { RouteComponentProps, withRouter } from "react-router";
import { Component } from "react";
import React from "react";
import { Box } from "@material-ui/core";

export class HeaderView extends Component<RouteComponentProps>{
    constructor(props:any){
        super(props);
    }
    render(){
        return(
            <Box className="header">
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#news">News</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </Box>
        );
    }
}
export default withRouter(HeaderView);
