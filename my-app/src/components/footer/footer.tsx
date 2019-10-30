import { RouteComponentProps, withRouter } from "react-router";
import { Component } from "react";
import React from "react";
import { Box } from "@material-ui/core";

export class FooterView extends Component<RouteComponentProps>{
    constructor(props:any){
        super(props);
    }
    render(){
        return(
            <Box className="footer">
                <p>Footer</p>
            </Box>
        );
    }
}
export default withRouter(FooterView);