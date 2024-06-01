import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL_CC } from '../BASE_URL/BASE_RUL';
const baseURL = BASE_URL_CC + 'api/employeecharge/'
@Injectable({
  providedIn: 'root'
})
export class EmployeeBillingService {

  constructor(
    private http: HttpClient,
  ) { }

  get():Observable<any>{
    return this.http.get(baseURL,{})
  }
  create(obj:any):Observable<any>{
    console.log(obj)
    return this.http.post(baseURL,{
      userid:obj.userid,
      chargetype:obj.chargetype,
      chargerate:obj.chargerate,
    })
  }
  delete(id:number):Observable<any>{
    return this.http.delete(baseURL+id,{})
  }
}
