import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PropertyClass } from './property-class';

@Injectable({
  providedIn: 'root'
})
export class ProservService {

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<PropertyClass[]>("http://localhost:8080/property/");
  }
  public postAll(data:FormData){
    return this.http.post<PropertyClass>("http://localhost:8080/property",data);
  }
  DeleteAll(id:number){
    return this.http.delete<any>("http://localhost:8080/property/"+id);
  }
  updateAll(data:any,id:number){
    console.log(data,id);
    return this.http.put<any>("http://localhost:8080/property/"+id,data);
  }

  getPropertyById(propertyId:any){
    return this.http.get<PropertyClass>("http://localhost:8080/property/"+propertyId)
  }
  
}
