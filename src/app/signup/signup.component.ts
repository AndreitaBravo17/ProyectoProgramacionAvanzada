import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroComponent } from '../registro/registro.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  form: FormGroup;

  user = {
    email: '',
    password: '',
  }

  constructor( private formBuilder: FormBuilder, private router: Router,) {
    this.form = this.formBuilder.group({ // Sirve para validar los campos del formulario y para que se muestre el error en el html cuando el campo no es valido

      correo: new FormControl('', [Validators.required, Validators.email, Validators.minLength(5)]),
      pass: new FormControl('', [Validators.required]),
    }
    )
  }
  ngOnInit(): void { }

  signIn() {
    this.router.navigate(['/dashboard']);
  }

}
