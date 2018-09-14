import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { User } from '../user';

// const CLOUDINARY_URL='cloudinary://295464739934565:E3nd8figX26VtvW1b4PTx6ToAUw@dprdrh0oz';
const URL = 'http://localhost:3000/api/upload';

//another endpoint just for receiving the userModel information, without the image
const URL1 = 'http://localhost:3300/sendData';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  imageUrl: string = null;
  fileToUpload: File = null;
  selectedFile: File = null;
  uploader: FileUploader = new FileUploader(
    {
      url: URL,
      itemAlias: 'photo',
      allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
      maxFileSize: 10485760
     });

  attachmentList:any = [];

  userModel = new User('','','', false, null);

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      this.settingTheFile(file);
    };
    this.uploader.onCompleteItem = (items:any , response: any, status:any, headers:any ) => {
      console.log('ImageUpload:uploaded', items, status, response, headers);
      this.attachmentList.push(JSON.parse(response));
    };
  }
  settingTheFile(newFile){
    this.userModel.imageUploaded = true;
    this.userModel.imageFile = newFile.file;
    newFile.withCredentials = false;
  }

  handleFileInput(file: FileList){
    this.fileToUpload = file.item(0);
    let reader = new FileReader();
    reader.onload = (event:any) => {
    this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  uploadData(){
      let temp = this.uploader.queue[this.uploader.queue.length-1];
      this.uploader.queue = [];
      this.uploader.queue.push(temp);

      this.uploader.queue[this.uploader.queue.length-1].upload();
      this.sendUserData(this.userModel);
  }
  validateImage(){
    if ( this.userModel.imageUploaded = false)
      return false;
    else if( this.userModel.imageFile = null)
      return false
      else
      return true;
  }
  sendUserData(user: User){
    return this.http.post<any>(URL1, user).subscribe(data => console.log(data));
  }

}
//Code below is for uploading the image without using angular directive 'ng2FileSelect'

//
// onFileSelected(event){
//     console.log(event);
//     this.selectedFile = <File> event.target.files[0];
//     console.log('Ova e fajlot',this.selectedFile);

//   }

//   onUpload(){
//   const fd= new FormData();

//   fd.append('image',this.selectedFile, this.selectedFile.name)
// console.log('format data: ', fd);
// console.log('format selFIle ', this.selectedFile);
// console.log('format SelFIleName: ',  this.selectedFile.name);

//     this.http.post(URL,this.selectedFile,{
//       reportProgress:true,
//       observe:'events'
//     })
//     .subscribe( event => {
//       if (event.type === HttpEventType.UploadProgress ){
//         console.log('Upload progress: ' + Math.round(event.loaded/event.total * 100 )+ '%');
//       } else if (event.type === HttpEventType.Response){
//         console.log(event);
//       }

//     })
//   }

