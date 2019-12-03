import { Component } from "react";
import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import LoginView from "../login/login";
import OptionsView from "../options/options";
import RegisterView from "../register/register";
import UnregisterView from "../unregister/unregister";
import LocalizeView from "../localize/localize";
import Canvas from "../canvas/canvas";

export class RouterViewsPath extends Component{
    render(){
        return(
            <React.Fragment>
                <BrowserRouter>
                    <Route exact path="/login" component={LoginView}></Route>
                    <Route exact path="/options" component={OptionsView}></Route>
                    <Route exact path="/register" component={RegisterView}></Route>
                    <Route exact path="/unregister" component={UnregisterView}></Route>
                    <Route exact path="/localize" component={LocalizeView}></Route>
                    <Route exact path="/canvas" component={Canvas}></Route>
                    <Redirect from="/" to="/options"></Redirect>
                </BrowserRouter>
            </React.Fragment>
        )
    }
}