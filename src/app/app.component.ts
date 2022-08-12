import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ReactiveForms';

  testform: UntypedFormGroup;
  
  constructor(private ufb: UntypedFormBuilder) { }

  get addresses(){
    return this.testform.controls["addresses"] as FormArray;
  }

  ngOnInit(){
    this.testform = this.ufb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.min(5)]],
      addresses: this.ufb.array([]) 
    })

    this.testform.valueChanges.subscribe({
      next: (value) => {console.log(value)}
    });
  }

  addAddress(){
    const adressForm = this.ufb.group({
      adress: ["", Validators.required]
    })

    this.addresses.push(adressForm);
  }

}
