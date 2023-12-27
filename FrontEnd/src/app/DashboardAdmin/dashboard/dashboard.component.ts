import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminServiceService, food } from 'src/app/services/admin-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  allFood:any
  AddForm:FormGroup;
  newFood:food={id:'',name:'',price:'',photo:''}
  food:food = { id:'',name:'',price:'',photo:''}
  constructor(private adminService :AdminServiceService,private formBuilder:FormBuilder,private MatSnackBar:MatSnackBar,private cdr: ChangeDetectorRef){
    this.AddForm = this.formBuilder.group({
      Name:this.NameForm,
      Price:this.PriceForm,
    });



  }


  NameForm=new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]);
  PriceForm=new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(10),Validators.pattern("^[0-9]*$")]);

  NameFormError(){
    if(this.NameForm.touched){
      if(this.NameForm.hasError("required")){
         return 'You must enter a first name';
      } else if(this.NameForm.hasError("minlength")){
        return 'Your first name length must be at least 3' ;
      }else if(this.NameForm.hasError("maxlength")){
        return 'Your first name length must be at least 20';
      }
    }
    return '';
  }

  PriceFormError(){
    if(this.PriceForm.touched){
      if(this.PriceForm.hasError("required")){
         return 'You must enter a first name';
      } else if(this.PriceForm.hasError("minlength")){
        return 'Your first name length must be at least 1' ;
      }else if(this.PriceForm.hasError("maxlength")){
        return 'Your first name length must be at least 10';
      }else{
        return 'Product price must accept only numbers' ;
      }
    }
    return '';
  }

  imageError:String=""
  image:any

  onFileChanged(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.image = reader.result as string;
      console.log(this.image);
    };
  }

  addFood(){
    if (this.AddForm.valid) {
      if (this.image){
        this.food.name = this.AddForm.value['Name'];
        this.food.price = this.AddForm.value['Price'];
        this.food.photo= this.image;
        this.adminService.addFood(this.food).subscribe(
          res=>{
            console.log(res);
            this.AddForm.reset();
            this.MatSnackBar.open('Food added successfully', '', {
              duration: 2000,
            });
          },
          err=>{
            console.log(err);
          }
        );
      }else{
        this.imageError = "You must upload an image";
      }
    }else{
      this.AddForm.markAllAsTouched();
    }
  }
  getAllFood(){
    this.adminService.getAllFood().subscribe((res:any)=>{
      this.allFood = res;
      console.log(res);

    },(error:any)=>{
      console.log(error);
    }
    );
  }

  deleteFood(id:any){
    this.adminService.deleteFood(id).subscribe((res:any)=>{
      console.log(res);
      this.MatSnackBar.open('Food deleted successfully', '', {
        duration: 2000,
      });
    },(error:any)=>{
      console.log(error);
    }
    )
  }

  ngOnInit(): void{
    this.getAllFood();
  }



}
