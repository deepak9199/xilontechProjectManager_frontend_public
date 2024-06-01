import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL_CC } from '../BASE_URL/BASE_RUL';
const baseURL = BASE_URL_CC + 'api/costcenter/'
@Injectable({
  providedIn: 'root'
})
export class CostCenterService {

  constructor(
    private http: HttpClient,
  ) { }

  get(): Observable<any> {
    return this.http.get(baseURL, {})
  }

  create(obj: any): Observable<any> {
    console.log(obj)
    return this.http.post(baseURL, {
      projectcode: obj.projectcode,
      activitycode: obj.activitycode,
      userid: obj.userid,
      chargetype: obj.chargetype,
      chargerate: obj.chargerate,
      outsourcingtype: obj.outsourcingtype,
      outsourcingrate: obj.outsourcingrate,
    })
  }

  update(obj: any,id:number): Observable<any> {
    console.log(obj)
    return this.http.put(baseURL+id, {
      projectcode: obj.projectcode,
      activitycode: obj.activitycode,
      chargetype: obj.chargetype,
      chargerate: obj.chargerate,
      outsourcingtype: obj.outsourcingtype,
      outsourcingrate: obj.outsourcingrate,
    })
  }  

  delete(id: number): Observable<any> {
    return this.http.delete(baseURL + id, {})
  }
}
