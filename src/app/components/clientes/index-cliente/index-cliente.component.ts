import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit {
  
  public clientes : Array<any>=[];
  public filtro_apellidos = '';
  public filtro_correo = '';
  public page = 1;
  public pageSize = 10;
  public token:any;

  constructor(
    private _clienteService : ClienteService,
    private _adminService : AdminService
  ){
    this.token = this._adminService.getToken();
    console.log(this.token);
  }

  ngOnInit():void{
    this._clienteService.listar_clientes_filtro_admin(null,null, this.token).subscribe(
      response=>{
        this.clientes = response.data;
        console.log(this.clientes);
      },
      error=>{
        console.log(error);
      }
    )
  }

  filtro(tipo:any){
    var filtro;

    if (tipo == 'apellidos'){
      filtro = this.filtro_apellidos;
    }else if (tipo == 'correo'){
      filtro = this.filtro_correo;
    }

    this._clienteService.listar_clientes_filtro_admin(tipo,filtro, this.token).subscribe(
      response=>{
        this.clientes = response.data;
        console.log(this.clientes);
      },
      error=>{
        console.log(error);
      }
    )
  }
}
