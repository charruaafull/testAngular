import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {GLOBAL} from "./global";

@Injectable()

export class UserService {
    public url: String;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    register(datos) {
        let params = JSON.stringify(datos);
        let headers = new Headers({'Content-Type': 'application/json'});
        return this._http.post(this.url + 'nuevoUsuario', params, {headers: headers})
            .map(res => res.json());
    }

    getUsers() {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this._http.get(this.url + 'getUsers', {headers: headers})
            .map(res => res.json());
    }

    deleteUsuario(id) {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this._http.get(this.url + 'deleteUsuario?id=' + id, {headers: headers})
            .map(res => res.json());
    }

    validoUsuario(datos) {
        let params = JSON.stringify(datos);
        let headers = new Headers({'Content-Type': 'application/json'});
        return this._http.post(this.url + 'getUsuario', params, {headers: headers})
            .map(res => res.json());
    }

    updateUser(idUpdate,datos) {
        let params = JSON.stringify(datos);
        let headers = new Headers({
            'Content-Type': 'application/json',
        });
        return this._http.put(this.url + 'editarUsuario/' + idUpdate, params, {headers: headers})
            .map(res => res.json());
    }

}