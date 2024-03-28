import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

const rtx5090 = {
  name: 'RTX 5090',
  price: 2500,
  inStorage: 10
}


@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit{


  // se crea a mano
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl('', [], []),  // valor por deefecto / validacion sincrona / validacion asincrona
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0)
  // })

  // se crea con herramienta de angular
  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  })

  constructor( private fb: FormBuilder) {  }


  ngOnInit(): void {
    this.myForm.reset(rtx5090)
  }


  isValidField( field: string  ): boolean | null{
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }


  getFieldError( field: string ): string  | null{

    if ( !this.myForm.controls[field] ) return '';

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      switch( key ){
        case 'required': return 'este campo es requerido'
        case 'minlength': return `Minimo ${ errors['minlength'].requiredLength } caracters`
      }
    }

    return null;
  }




  onSave(): void {

    if ( this.myForm.invalid ) {

      this.myForm.markAsTouched();

      return

    }

    console.log(this.myForm.value)

    this.myForm.reset({price: 10, inStorage: 0  });
  }

}
