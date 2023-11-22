import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../models/Customer";

@Injectable({
  providedIn: 'root'
})
export class BankService {

  customerUrl : string = "http://localhost:8080/api/";



  constructor(private http : HttpClient) {

  }

  public getCustomer(id : number) : Observable<Customer>{
    return this.http.get<Customer>(`${this.customerUrl}${id}`);
  }

  public getCustomers() : Observable<Customer[]>{
    return this.http.get<Array<Customer>>(`${this.customerUrl}customers`);
  }

  public addCustomer(customer : Customer){
    return this.http.post(`${this.customerUrl}`,customer);
  }

  public deleteCustomer(customerId : number){
    return this.http.delete(`${this.customerUrl}${customerId}`);
  }

  public serchCustomers(keyword : string) : Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(`${this.customerUrl}customers/search?keyword=${keyword}`);
  }
}
