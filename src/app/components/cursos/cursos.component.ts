import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl,FormGroup } from '@angular/forms';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class ProductosComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({ // Sirve para validar los campos del formulario y para que se muestre el error en el html cuando el campo no es valido
      codigoCtrl: new FormControl('', [Validators.required, Validators.minLength(10)]),
      productoCtrl: new FormControl('', [Validators.required, Validators.minLength(5)]),
      informacinoCtrl: new FormControl('', [Validators.required,Validators.maxLength(200),]),
      correoCtrl: new FormControl('', [Validators.required, Validators.email,Validators.minLength(6)]),
      selectCtrl: new FormControl('', [Validators.required]),
      edadCtrl: new FormControl('', [Validators.required]),
      ciudadCtrl: new FormControl('', [Validators.required]),
      descripcionCtrl: new FormControl('', [Validators.required]),
    });
  }

  public save(event: Event) {
    event.preventDefault(); // para que no se recargue la pagina al darle click al boton submit
    if (this.form.valid) { // si el formulario es valido se ejecuta el codigo de abajo y se guarda el usuario en la base de datos
      const value = this.form.value;
      console.log(value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  get emailField() {
    return this.form.get('emailCtrl');// para que se muestre el error en el html cuando el email no es valido
  }

}
