import { Component, OnInit } from '@angular/core';
//building blocks
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from "@angular/forms";

import { Customer } from './customer';

function emailMatcher(c: AbstractControl) {
    let emailControl = c.get('email');
    let confirmControl = c.get('confirmEmail');
    if (emailControl.pristine || confirmControl.pristine) {
        return null;
    }
    if (emailControl.value === confirmControl.value) {
        return null;
    }
    return { 'match': true };
}

function ratingRange(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
        if (c.value != undefined && (isNaN(c.value) || c.value < min || c.value > max)) {
            return { 'range': true };
        };
        return null;
    };
}
@Component({
    selector: 'my-signup',
    templateUrl: './app/customer/customer.component.html'
})
export class CustomerComponent implements OnInit {
    //Property - root form group - defines our form model
    customerForm: FormGroup;

    getData: boolean = false;

    //Explicit Defining of root 
    customer: Customer = new Customer();

    constructor(private fb: FormBuilder) { }

    populateTestData(): void {
        this.customerForm.setValue({
            firstName: 'jack',
            lastName: 'Harkness',
            email: 'jack@torchwood.com',
            sendCatalog: false
        })
    }

    populateTestDatap(): void {

        this.customerForm.patchValue({
            firstName: 'jack Henry',
            lastName: 'Harkness paul',
            sendCatalog: false
        })
    }

    trueFalse(): boolean {
        return this.getData = !this.getData;
    }
   
    ngOnInit(): void {

        this.customerForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.minLength(50)]],
            emailGroup: this.fb.group({
                email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
                confirmEmail: ['', Validators.required],
            }, { validator: emailMatcher}),
            phone: '',
            notification: 'email',
            rating:['', ratingRange(1,5)],
            sendCatalog: true
        });
    }
      

    save() {
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    }

    setNotification(notifyVia: string): void {
        const phoneControl = this.customerForm.get('phone');
        if (notifyVia === 'text') {
            phoneControl.setValidators(Validators.required);
        } else {
            phoneControl.clearValidators();
        }
        phoneControl.updateValueAndValidity();
    }
 }
