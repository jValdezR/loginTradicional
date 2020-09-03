import { Component, OnInit } from "@angular/core";
import { UsuarioModel } from "../../models/usuario.model";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"],
})
export class RegistroComponent implements OnInit {
  usuario: UsuarioModel;
  recordarme: boolean = false;


  constructor(private auth: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.auth.nuevoUsuario(this.usuario).subscribe(
      (resp) => {
        console.log(resp);
        alert('Datos insertados')
        if(this.recordarme){
          localStorage.setItem('email',this.usuario.email);
        }
        this.router.navigateByUrl('/home');
      },
      (err) => {
        console.log(err.error.error.message);
        alert('Datos insertados incorrectos \n' + err.error.error.message)
      }
    );
  }
}
