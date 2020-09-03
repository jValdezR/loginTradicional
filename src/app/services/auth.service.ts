import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UsuarioModel } from "../models/usuario.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // Crear nuevo usuario
  private urlSignUp =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  // Abrir usuario
  private urlSignIn =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

  private apiKey = "AIzaSyBLsVIusrYS4WC_IWDXfhgstVyGrC1MHq0";

  userToken: string;

  constructor(private http: HttpClient) {
    this.leerToken();
  }

  logIn(usuario: UsuarioModel) {
    const authData = {
      email: usuario.email,
      password: usuario.password,
      // ...usuario, // Manda los atributos que contiene
      returnSecureToken: true,
    };
    return this.http
      .post(
        `
      ${this.urlSignIn}${this.apiKey}
      `,
        authData
      )
      .pipe(
        map((resp) => {
          console.log("Entro en el map del rxjs");
          this.guardarToken(resp["idToken"]);
          return resp;
        })
      );
  }

  logOut() {
    localStorage.removeItem('token');
  }

  nuevoUsuario(usuario: UsuarioModel) {
    const authData = {
      email: usuario.email,
      password: usuario.password,
      // ...usuario, // Manda los atributos que contiene
      returnSecureToken: true,
    };
    return this.http
      .post(
        `
      ${this.urlSignUp}${this.apiKey}
      `,
        authData
      )
      .pipe(
        map((resp) => {
          console.log("Entro en el map del rxjs");
          this.guardarToken(resp["idToken"]);
          return resp;
        })
      );
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem("token", idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getTime().toString())
  }

  private leerToken() {
    if (localStorage.getItem("token")) {
      this.userToken = localStorage.getItem("token");
    } else {
      this.userToken = "";
    }
    return this.userToken;
  }

  estaAutenticado(): boolean {

    if (this.userToken.length < 2){
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));

    const expiraDate = new Date();

    expiraDate.setTime(expira);

    if (expiraDate > new Date()){
        return true;
    } else {
      return false;
    }
  }
}
