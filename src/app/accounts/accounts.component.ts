import {Component, OnInit} from '@angular/core';
import {AccountService} from "../services/account.service";
import {BankAccount} from "../models/Accounts";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit{

  bankAccount! : BankAccount;
  searchOperationForm! : FormGroup;
  page : number = 0;
  size : number = 5;
  operationForm! : FormGroup;
  accountId :number = 0;


  constructor(private service : AccountService, private fb : FormBuilder,public login : LoginService) {
  }


  ngOnInit(): void {
    this.searchOperationForm = this.fb.group({
      accountId : this.fb.control("",Validators.required)
    });

    this.operationForm = this.fb.group({
       type : this.fb.control(null),
      amount : this.fb.control(0),
      description : this.fb.control(""),
      idDestination : this.fb.control("")
    });


  }


  searchAccountOperations( ) {
    let id = this.searchOperationForm.value.accountId;

    return this.service.getAccountHistory(id,this.page,this.size).subscribe(data => {
            this.bankAccount = data;
    },error => {
      console.log(error)
    })
  }

  goToPage(p: number) {
    this.page = p;
    this.searchAccountOperations();
  }

  performOperation() {
    let accountId : string= this.searchOperationForm.value.accountId;
    let amount : number = this.operationForm.value.amount;
    let description  : string= this.operationForm.value.description;
    let idDestination : string= this.operationForm.value.idDestination;

    switch (this.operationForm.value.type){
      case 'CREDIT' :
      this.service.credit(accountId,amount,description).subscribe({
        next: (data) =>{
          console.log(data)
          alert("CREDIT Succeeded");
          this.searchAccountOperations();
      }
      });
        break;
      case 'DEBIT' :
        this.service.debit(accountId,amount,description).subscribe({
          next: (data) =>{
            console.log(data)
            alert("DEBIT Succeeded");
            this.searchAccountOperations();
          }
        });
        break;
      case 'TRANSFER':
        this.service.transfer(accountId,idDestination,amount).subscribe({
          next: (data) =>{
            console.log(data)
            alert("TRANSFER Succeeded");
            this.searchAccountOperations();
          },error : (err)=>{
            console.log(err)
          }
        });
        break;
    }


    this.operationForm.reset();
  }
}
