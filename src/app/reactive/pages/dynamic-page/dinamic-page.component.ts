import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  templateUrl: './dinamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {


  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3) ]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required ],
      ['Death Stranding', Validators.required ]
    ])
  })

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  public newFavorite: FormControl = new FormControl('', Validators.required);


  constructor( private fb: FormBuilder) {
  }

  isValidField( field: string  ): boolean | null{
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  isValidFieldInArray( formArray: FormArray, index: number){
    return formArray.controls[index].errors
      && formArray.controls[index].touched;
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

  onAddToFavorites(): void{

    if ( this.newFavorite.invalid ) return;
    const newGame = this.newFavorite.value;

    // this.favoriteGames.push( new FormControl( newGame, Validators.required ));

    this.favoriteGames.push( this.fb.control( newGame, Validators.required ));

    this.newFavorite.reset();

  }


  onDeleteFavorite( index: number): void {
    this.favoriteGames.removeAt(index);
  }


  onSubmit(): void {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }


    console.log(this.myForm.value)

    this.myForm.reset();

    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);

  }


}
