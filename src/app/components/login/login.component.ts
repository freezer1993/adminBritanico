import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

declare var jQuery:any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   public user : any = {};
   public usuario: any = {};
   public token:any='';

   constructor(
    private _adminService: AdminService,
    private _router: Router){
    this.token = this._adminService.getToken();
   }
   ngOnInit(): void {
     //console.log(this.token);
     if(this.token){
      this._router.navigate(['/']);
     }else{
      null;
     }
   }

   login(loginForm:any){
    if(loginForm.valid){
      console.log(this.user);

      let data={
        email: this.user.email,
        password: this.user.password
      }
      this._adminService.login_admin(data).subscribe(
        response =>{
          if(response.data == undefined){
              iziToast.show({
              title:'Error',
              titleColor: '#ff0000',
              class: 'text-danger',
              position: 'topRight',
              message: response.message
            })
          }else{
            this.usuario = response.data;
            localStorage.setItem('token',response.token);
            localStorage.setItem('_id',response.data.ID_ADMIN);

            this._router.navigate(['/']);
          }
        },
        error => {
          console.log(error);
        }
      );    
    }else{
      iziToast.show({
        title:'Error',
        titleColor: '#ff0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formuario no son correctos'
      })
    }

   }

   view_password(){
    let type = $('#password').attr('type');

    if(type == 'text'){
      $('#password').attr('type','password');
      
    }else if(type == 'password'){
      $('#password').attr('type','text');
    }
  }
}
