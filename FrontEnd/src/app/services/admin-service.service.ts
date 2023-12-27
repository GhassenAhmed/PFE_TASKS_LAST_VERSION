import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { port } from 'src/env';
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http:HttpClient){
  }

  getAllFood(){
    return this.http.get(`${port}/food/getAllFood`);
  }

  addFood(food:any){
    return this.http.post(`${port}/food/addFood`,food);
  }

  deleteFood(id:any){
    return this.http.delete(`${port}/food/deleteFood?id=${id}`);
  }

  updateFood(food:any,id:any){
    return this.http.post(`${port}/food/updateFood?id=${id}`,food);
  }

  updatePhoto(photo:any,id:any){
    return this.http.post(`${port}/food/updatePhoto?id=${id}`,photo);
  }

  getFoodById(id:any){
    return this.http.get(`${port}/food/getById?id=${id}`)
  }
}
export interface food {
  id:any
  name: any
  photo: any
  price:any
}
