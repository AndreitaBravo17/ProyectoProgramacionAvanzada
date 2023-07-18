import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl,FormGroup } from '@angular/forms';
import { Usuario } from '../../interfaces/usuario';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  form: FormGroup;

  imprirCedulaValida: string = "";

  constructor(
    private formBuilder: FormBuilder,
    // private toastr: ToastrService,
    ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({ // Sirve para validar los campos del formulario y para que se muestre el error en el html cuando el campo no es valido
      nameCtrl: new FormControl('', [Validators.required, Validators.minLength(5)]),
      apellidoCtrl: new FormControl('', [Validators.required, Validators.minLength(5)]),
      informacinoCtrl: new FormControl('', [Validators.required,Validators.maxLength(200),]),
      correoCtrl: new FormControl('', [Validators.required, Validators.email,Validators.minLength(10)]),
      selectCtrl: new FormControl('', [Validators.required]),
      edadCtrl: new FormControl('', [Validators.required]),
      ciudadCtrl: new FormControl('', [Validators.required]),
      generoCtrl: new FormControl('',[Validators.required])
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

  agregarUsuario() {
    const usuario: Usuario = {
      nombre: this.form.value.nameCtrl,
      apellido: this.form.value.apellidoCtrl,
      cedula: this.form.value.informacinoCtrl,
      correo: this.form.value.correoCtrl,
      edad: this.form.value.edadCtrl,
      ciudad: this.form.value.ciudadCtrl,
      curso: this.form.value.selectCtrl,
      genero: this.form.value.generoCtrl,
    }

    if(this.isValidCI(this.form.value.informacinoCtrl) == false) {
      return;
    }
  }


  get emailField() {
    return this.form.get('emailCtrl');// para que se muestre el error en el html cuando el email no es valido
  }


  isValidCI(ci: string) {
    var isNumeric = true;
    var total = 0,
      individual;

    for (var position = 0 ; position < 10 ; position++) {
      // Obtiene cada posición del número de cédula
      // Se convierte a string en caso de que 'ci' sea un valor numérico
      individual = ci.toString().substring(position, position + 1)

      if(isNaN(individual)) {
        console.log(ci, position,individual, isNaN(individual))
        isNumeric=false;
        break;
      } else {
        // Si la posición es menor a 9
        if(position < 9) {
          // Si la posición es par, osea 0, 2, 4, 6, 8.
          if(position % 2 == 0) {
            // Si el número individual de la cédula es mayor a 5
            if(parseInt(individual)*2 > 9) {
              // Se duplica el valor, se obtiene la parte decimal y se aumenta uno
              // y se lo suma al total
              total += 1 + ((parseInt(individual)*2)%10);
            } else {
              // Si el número individual de la cédula es menor que 5 solo se lo duplica
              // y se lo suma al total
              total += parseInt(individual)*2;
            }
          // Si la posición es impar (1, 3, 5, 7)
          }else {
            // Se suma el número individual de la cédula al total
            total += parseInt(individual);
          }
        }
      }
    }

    if((total % 10) != 0) {
      total =  (total - (total%10) + 10) - total;
    } else {
      total = 0 ;
    }


    if(isNumeric) {
      // El total debe ser igual al último número de la cédula
      console.log(ci, total, individual);
      console.log(ci, typeof ci, ci.length)
      // La cédula debe contener al menos 10 dígitos
      if(ci.toString().length != 10) {
        this.imprirCedulaValida = "La cedula debe ser de: 10 digitos.";
        return false;
      }

      // El número de cédula no debe ser cero
      if (parseInt(ci, 10) == 0) {
        this.imprirCedulaValida = "La cedula ingresada no puede ser cero.";
        return false;
      }

      // El total debe ser igual al último número de la cédula
      if(total != parseInt(individual)) {
        this.imprirCedulaValida = "La cedula ingresada no es valida.";
        return false;
      }

      console.log('cédula válida', ci);
      return true;
    }
    // Si no es un número
    this.imprirCedulaValida = "El dato solo puede contener numeros.";
    return false;
  }

 

}
