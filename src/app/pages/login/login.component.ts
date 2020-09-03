import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme: boolean;


  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('email')){
      localStorage.setItem('email',this.usuario.email);
      this.recordarme = true;
    }
    
  }

  login(form: NgForm){

    if (form.invalid){return;}

    alert('Datos insertados, espere');

    this.auth.logIn(this.usuario)
    .subscribe(resp=>{
      console.log(resp);
      alert('Datos correctos')

      if(this.recordarme){
        localStorage.setItem('email',this.usuario.email);
      }
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.log(err.error.error.message);
      alert('Datos incorrectos')
    })
  }
}
