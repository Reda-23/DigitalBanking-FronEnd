import {Component, OnInit} from '@angular/core';
import {Customer} from "../models/Customer";
import {BankService} from "../services/bank.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{

  constructor(private service : BankService,
  private fb : FormBuilder) {
  }

  customers! : Customer[] ;
  customerSearchForm!  : FormGroup;

  ngOnInit(): void {
    this.service.getCustomers().subscribe(data =>{
      this.customers = data;
    },error => {
      console.log(error)
    });
    this.customerSearchForm = this.fb.group({
      keyword : this.fb.control("")
    });



  }

  deleteCustomer(id: number) {
    let c = confirm("delete customer ?");
    if (c)  {this.service.deleteCustomer(id).subscribe(data=>{
      alert("DELETED SUCCESSFULLY")
      this.customers = this.customers.filter(custId => custId.id != id);
    },error => {
      console.log(error)
    });
  }}


  searchCustomer(){
    let kw = this.customerSearchForm.value.keyword;
     this.service.serchCustomers(kw).subscribe(data=>{
      this.customers = data;
    },error => {
      console.log(error)
    })
  }


}
