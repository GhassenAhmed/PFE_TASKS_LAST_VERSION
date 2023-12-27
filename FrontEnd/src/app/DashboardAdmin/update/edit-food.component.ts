import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminServiceService, food } from 'src/app/services/admin-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-food',
  templateUrl: './edit-food.component.html',
  styleUrls: ['./edit-food.component.css']
})
export class EditFoodComponent implements OnInit{
  updateForm:FormGroup
  foodById:food={id:'',name:'',price:'',photo:''}
  foodId:any
constructor(private route : ActivatedRoute,private adminService :AdminServiceService,private formBuilder:FormBuilder,private MatSnackBar:MatSnackBar,private cdr: ChangeDetectorRef){
  this.updateForm = this.formBuilder.group({
    Name:this.NameForm,
    Price:this.PriceForm,
  });
}
  ngOnInit(): void {
    this.route.params.subscribe((params:any)=>{
      this.foodId= params['id'];
      console.log(this.foodId);

    })
    this.getFoodById(this.foodId);
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

  updateFood(){
    if (this.updateForm.valid) {
      this.adminService.updateFood(this.foodById,this.foodId).subscribe((res:any)=>{
        console.log(res);
        this.MatSnackBar.open('Food updated successfully', '', {
          duration: 2000,
        });
      },(error:any)=>{
        console.log(error);
      }
      )
    }
  }
  updatePhoto(){
    this.adminService.updatePhoto(this.image,this.foodId).subscribe((res:any)=>{
      console.log(res);
      this.MatSnackBar.open('Photo updated successfully', '', {
        duration: 2000,
      });
    },(error:any)=>{
      console.log(error);
    }
    )
  }
  getFoodById(id:any){
    this.adminService.getFoodById(id).subscribe((res:any)=>{
      this.foodById=res;
      this.cdr.detectChanges();

      console.log(this.foodById);
    },(error:any)=>{
      console.log(error);
    }
    )
  }
}
