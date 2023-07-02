import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImageService } from "src/app/services/image.service";
import { AdminService } from 'src/app/services/admin.service';
import { TextInfService } from "src/app/services/text-inf.service";
declare var iziToast:any;

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit{
  public imagenes: any[] | undefined;
  public token:any;
  public id_sucursal: String = "5";
  public textInf: any= {
    titulo: '',
    introduccion: '',
    cuerpo: '',
    id_sucursal: this.id_sucursal
  };
  public isTextInfLoaded: boolean = false;

  selectedFile: any;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>; 
  constructor(
    private _imageService : ImageService,
    private _adminService : AdminService,
    private _textInfService: TextInfService)
  {
    this.token = _adminService.getToken();
  }  
  

  ngOnInit() {
    this.listarImagenes();
    this.listarTextInf();

     // Redimensionamiento de los textarea
     const textarea1 = document.getElementById('introduccionTextarea') as HTMLTextAreaElement;
     const textarea2 = document.getElementById('cuerpoTextarea') as HTMLTextAreaElement;
 
     textarea1.addEventListener('input', () => {
       textarea1.style.height = 'auto';
       textarea1.style.height = textarea1.scrollHeight + 'px';
     });
 
     textarea2.addEventListener('input', () => {
       textarea2.style.height = 'auto';
       textarea2.style.height = textarea2.scrollHeight + 'px';
     });
  }

  listarImagenes() {
    this._imageService.listar_slides2(this.token, this.id_sucursal)
      .subscribe(data => {
        this.imagenes = data;
        console.log(this.imagenes);
      });
  }

  onFileSelected(event:any) {
    this.selectedFile = event.target.files[0];
  }

  cargarImagen(fileInput:any) {
    const fd = new FormData();
    fd.append('image', this.selectedFile);
    this._imageService.cargar_imagne(fd, this.token, this.id_sucursal)
      .subscribe(response => {
        console.log(response);
        iziToast.show({
          title:'SUCCESS',
          titleColor: '#0B6121',
          class: 'text-success',
          position: 'topRight',
          message: response.message
        });
        // Actualizar la lista de imágenes
        this.listarImagenes();
        
        // Limpiar el campo de archivo
        fileInput.value='';
      });
  }

  eliminarImagen(id:any) {
    this._imageService.eliminar_imagen(id, this.token, this.id_sucursal)
      .subscribe(response => {
        console.log(response);
        iziToast.show({
          title:'SUCCESS',
          titleColor: '#0B6121',
          class: 'text-success',
          position: 'topRight',
          message: response.message
        });
        // Actualizar la lista de imágenes
        this.listarImagenes();

      },
      error=>{
        console.log(error);

      });
      
  }

  //texto informativo
registro(registroForm: any, accion: string) {
  if (registroForm.valid) {
    if (accion === 'insertar') {
      console.log('Insertar');
      console.log(this.textInf);
      this._textInfService.registro_text_inf_suc(this.textInf, this.token).subscribe(
        response=>{
          console.log(response);
          iziToast.show({
            title:'SUCCESS',
            titleColor: '#0B6121',
            class: 'text-success',
            position: 'topRight',
            message: 'Se registro correctamente el texto informativo'
          });
          this.listarTextInf();
        },
        error=>{
          console.log(error.error.message);
          iziToast.show({
            title: error.error.message,
            titleColor: '#ff0000',
            class: 'text-danger',
            position: 'topRight',
            message: error.error.error
          });
        }
        )
    } else if (accion === 'modificar') {
      console.log('Modificar');
      console.log(this.textInf);
      this._textInfService.update_text_inf_suc(this.textInf, this.token).subscribe(
        response=>{
          console.log(response);
          iziToast.show({
            title:'SUCCESS',
            titleColor: '#0B6121',
            class: 'text-success',
            position: 'topRight',
            message: 'Se modifico correctamente el texto informativo'
          });
          this.listarTextInf();
        },
        error=>{
          console.log(error.error.message);
          iziToast.show({
            title: error.error.message,
            titleColor: '#ff0000',
            class: 'text-danger',
            position: 'topRight',
            message: error.error.error
          });
        }
        )
    }
  } else {
    iziToast.show({
      title: 'Error',
      titleColor: '#ff0000',
      class: 'text-danger',
      position: 'topRight',
      message: 'Los datos del formulario no son correctos'
    });
  }
}

  listarTextInf() {
    this._textInfService.listar_text_inf_suc(this.id_sucursal, this.token)
      .subscribe(data => {
        if (data.data[0]!){
          this.textInf = data.data[0];
          this.isTextInfLoaded = true;
          console.log(this.textInf);
        }else{
          console.log('no existen datos cargados');
          this.isTextInfLoaded = false;
        }
          
      });
  }


}
