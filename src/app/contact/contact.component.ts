import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { User } from '../user';

const CLOUDINARY_URL='cloudinary://295464739934565:E3nd8figX26VtvW1b4PTx6ToAUw@dprdrh0oz';

const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  // imageUrl: string = '../../assets/Images/default.png';
  imageUrl: string = null;
  fileToUpload: File = null;

  selectedFile: File = null;
  uploader: FileUploader = new FileUploader(
    {
      url: URL,
      itemAlias:'photo',
      allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
      maxFileSize: 10485760
     });
  
  attachmentList:any = [];


 userModel = new User('Mario Krstevski','mariokrstevski@hotmail.com','', false);
 

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (items:any , response: any, status:any, headers:any ) => {
      console.log('ImageUpload:uploaded', items, status, response);
      
      this.attachmentList.push(JSON.parse(response));
    };

  }
  handleFileInput(file: FileList){
    
    this.fileToUpload = file.item(0);

    let reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  formValid(){



  }
  onFileSelected(event){

    // console.log(event);
    this.selectedFile = <File> event.target.files[0];

  }

  onUpload(){

  const fd= new FormData();
  fd.append('image',this.selectedFile, this.selectedFile.name)

    this.http.post(URL,fd,{
      reportProgress:true,
      observe:'events'
    })
    .subscribe( event => {
      if (event.type === HttpEventType.UploadProgress ){
        console.log('Upload progress: ' + Math.round(event.loaded/event.total * 100 )+ '%');
      } else if (event.type === HttpEventType.Response){
        console.log(event);
      }
   
    })
  }
}
