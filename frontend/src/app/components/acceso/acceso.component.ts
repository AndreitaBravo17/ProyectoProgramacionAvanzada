import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { urlApi } from 'src/app/constants';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({ 
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})

export class AccesoComponent {

  credentialsError: boolean = false
  errorMsg = ""
  appName = "Acceder"
  urlAccess = `http://localhost:3000/maternidad/acceso/auth`
  emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  constructor(
    private router: Router,
    private apiRestService: ApiRestService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    if(this.storageService.storageExists('session', true)) {
      this.router.navigate(["/dashboard/"])
    }
  }

  accessForm = new FormGroup({
    email: new FormControl('', [
      Validators.pattern(this.emailRegEx),
      Validators.required
    ]),
    clave: new FormControl('', [
      Validators.minLength(8),
      Validators.required
    ])
  })

  validateUser() {
    if(this.accessForm.valid) {
      this.apiRestService.doPost(this.urlAccess, this.accessForm.value).subscribe((result: any) => {
        if(result.acceso) {
          this.storageService.setStorage('session', result.data)
          this.router.navigate(['/sistema'])
        } else {
          this.errorMsg = result.error
          this.credentialsError = true
        }
      })
    }
  }

  fieldError(input: string) {
    const validate = this.accessForm.get(input);
    const isTouched = validate?.touched;
    const isNotValid = validate?.invalid;
    return (
      (isTouched && isNotValid)  ||
      (isNotValid && validate.value !=="") ||
      (isTouched && validate.value == "")
    )
  }

  messageError(input: string) {
    const validate = this.accessForm.get(input);
    const isTouched = validate?.touched;
    const isValid = validate?.valid;
    if(validate?.value === "" && isTouched) return false
    if(validate?.value === "") return true
    if(validate?.value !== "" && isValid) return true
    return false
  }
}
