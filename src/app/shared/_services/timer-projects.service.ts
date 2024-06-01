import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL_PM } from '../BASE_URL/BASE_RUL';

@Injectable({
  providedIn: 'root'
})
export class TimerProjectsService {
  baseURL = BASE_URL_PM+'api/project/';
  constructor(private http: HttpClient) { }

  gettimeprojects(): Observable<any> {
    return this.http.get(this.baseURL,
      {});
  }
  posttimeprojects(project:any): Observable<any> {
    return this.http.post(this.baseURL,
      {

        id: project.id,
        projectCode: project.projectCode,
        projectname: project.projectname,
        projectDescription: project.projectDescription,

      });
  }
  deleteprojects(id: number) {
    return this.http.delete(this.baseURL + id)
  }
}
