import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BankService} from "../services/bank.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit{

  customerForm! : FormGroup;
  constructor(private fb : FormBuilder,
              private service : BankService,
              private router : Router) {

  }
  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name : this.fb.control("" , Validators.required),
      email : this.fb.control("" , [Validators.required,Validators.email]),
    });
  }

  addCustomer() {
    let customer = this.customerForm.value;
    this.service.addCustomer(customer).subscribe(data =>{
      alert("CUSTOMER ADDED");
    this.router.navigateByUrl('/customers');

    },error => {
      console.log(error)
    })
  }
}
