import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BankAccount} from "../models/Accounts";


@Injectable({
  providedIn: 'root'
})
export class AccountService {


  bankUrl : string = "http://localhost:8080/bank/";
  constructor(private http : HttpClient) {
  }

  public getAccountHistory(accountId : string , page : number, size : number) : Observable<BankAccount>{
    return this.http.get<BankAccount>(`${this.bankUrl}operations/${accountId}?page=${page}&size=${size}`);
  }

   public credit(accountId : string , amount : number , description : string){
    let data = {accountId , amount , description}
         return  this.http.post(`${this.bankUrl}credit`,data);
  }

  public debit (accountId : string , amount : number , description : string){
    let data = {accountId , amount , description}
     return this.http.post(`${this.bankUrl}debit`,data);
  }

  public transfer(idSource : string , idDestination : string , amount : number ){
    let data = {idSource , idDestination ,amount}
    return this.http.post(`${this.bankUrl}transfer`,data);
  }









}
