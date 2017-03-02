import { Component, OnInit } from '@angular/core';
//building blocks
import { FormGroup, FormBuilder } from "@angular/forms";

import { Customer } from './customer';

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
            firstName: '',
            lastName: '',
            email: '',
            sendCatalog: true
        });
    }
      

    save() {
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    }
 }
