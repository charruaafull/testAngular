import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {Usuarios} from "../models/usuarios";
import {UserService} from "../services/user.service";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public usuarios: Usuarios;
    public alertaRegistro: string;
    public alertaRegistroError: string;
    public listaUsuarios;
    public id_update: string;

    constructor(
        private _userService: UserService
    ) {
        this.usuarios = new Usuarios('', '');
        this.alertaRegistro = null;
    }

    ngOnInit() {
        this.getUsuarios();
    }

    public onSubmit() {
        this.clearValues();
        let Usuario = this.usuarios;

        this._userService.register(Usuario).subscribe(
            response => {
                let error = response.message;
                if (error) {
                    this.alertaRegistroError = error;
                } else {
                    let user = response.user;
                    this.getUsuarios();
                    this.alertaRegistro = "El usuario " + user.name + " fue registrado correctamente";
                }
            },
            error => {

            }
        )

    }

    public onUpdate() {
        let Usuario = this.usuarios;
        this._userService.updateUser(this.id_update, Usuario).subscribe(
            response => {
                this.getUsuarios();
            },
            error => {

            }
        )
    }

    public openModalUpdate(id, name, password) {
        this.id_update = id;
        this.usuarios.name = name;
        this.usuarios.password = password;
    }

    public clearValues() {
        this.alertaRegistroError = null;
        this.alertaRegistro = null;
    }

    public getUsuarios() {
        this._userService.getUsers().subscribe(
            response => {
                this.listaUsuarios = response;
            },
            error => {

            }
        )
    }

    public deleteUsuario(id, nom) {

        if (window.confirm("Esta seguro que desea eliminar el usuario " + nom + "?")) {
            this._userService.deleteUsuario(id).subscribe(
                response => {
                    this.getUsuarios();
                },
                error => {

                }
            )
        }

    }

}
