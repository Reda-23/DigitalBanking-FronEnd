import { Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
@Injectable({
  providedIn : 'root'
})
export class LoginService{


  url : string = "http://localhost:8080/";


      isAuthenticated : boolean = false  ;
      username : string =  "";
      accessToken : string  = "";
      roles : any;

  constructor(private http : HttpClient ,
              private router : Router) {

  }



  public login(username : string , password : string) : Observable<string>{
    let params = new HttpParams().set("username",username).set("password",password);
    let options = {headers : new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")}
    return this.http.post<string>(`${this.url}security/auth`,params,options);
  }

  extractData(data : any) {
      this.isAuthenticated = true;
      this.accessToken = data['ACCESS_TOKEN'];
      let decode : any = jwtDecode(this.accessToken);
      this.username = decode.sub;
      this.roles = decode.scope;
      window.localStorage.setItem('jwt-token',this.accessToken);
  }

  logout() {
    this.isAuthenticated = false;
    this.username = "";
    this.roles = undefined;
    this.accessToken = "" ;
    window.localStorage.removeItem('jwt-token');
    this.router.navigateByUrl('/login');
  }

  loadAccessTokenFromLS() {
    let token = window.localStorage.getItem('jwt-token');
    if (token){
      this.extractData({'ACCESS_TOKEN' : token});
      this.router.navigateByUrl('/admin/customers');
    }

  }
}
