import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';


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

  selectedFile = null;
  uploader: FileUploader = new FileUploader(
    {
      url: URL,
      itemAlias:'photo',
      allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
      maxFileSize: 10485760
     });
  
  attachmentList:any = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (items:any , response: any, status:any, headers:any ) => {
      console.log('ImageUpload:uploaded', items, status, response);
      // alert('File uploaded successfully');
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
    this.uploader.uploadAll();
  }

  checkStuff(){
    console.log("Data Sent");

    return false;
  }

  

  onFileSelected(event){
    console.log(event);
    this.selectedFile = event.target.files[0];
  }

  onUpload(){


    // this.http.post('')
  }
}
