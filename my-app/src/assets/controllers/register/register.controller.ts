import {RegisterRequest, AsignRequest, AsignResponseDto} from "./register-dtos";
import {Subject, Observable} from 'rxjs';
import * as firebase from 'firebase/app';
import { RegisterDto } from "../../../components/register/register-dto";

export class RegisterController{
    private _numBeaconAsign: Subject<RegisterDto> = new Subject();

    public onViewDtoChangeReceived(): Observable<RegisterDto>{
        return this._numBeaconAsign.asObservable();
    }

    public async registerUser (registerRequest: RegisterRequest){
        console.log("Estoy en register controller");
        //var firebase = require("firebase");
        var database = firebase.database();
        database.ref('users/').set({
            user: registerRequest.user,
            beacon: registerRequest.beacon,
        });
        const response: AsignResponseDto = {
            status: 1,
            location: '/register',
            numBeaconAsign: '123456',
        };
        return response;
       /* var database = firebase.database();
        // Import Admin SDK
        var admin = require("firebase-admin");
        var db = admin.database();
        var ref = db.ref("https://app-ble-bbdd.firebaseio.com/server/saving-data/fireblog/posts");
        // Retrieve new posts as they are added to our database
        ref.on("child_added", function(snapshot, prevChildKey) {
            var newPost = snapshot.val();
            console.log("Author: " + newPost.author);
            console.log("Title: " + newPost.title);
            console.log("Previous Post ID: " + prevChildKey);
        });*/
    }

    public async asignBeacon(requestValue: AsignRequest): Promise<AsignResponseDto>{
        console.log("hola");
        const response: AsignResponseDto = {
            status: 0,
            location: '/register',
            numBeaconAsign: '123456',
        };
        return response;
    }
}