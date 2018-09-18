import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileItem, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// const CLOUDINARY_URL='cloudinary://295464739934565:E3nd8figX26VtvW1b4PTx6ToAUw@dprdrh0oz';

const URL = 'http://localhost:3000/api/upload';

// another endpoint just for receiving the userModel information, without the image
const URL1 = 'http://localhost:3300/sendData';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {

    private unsubscribe: Subject<void> = new Subject;

    imageUrl: string = null;
    fileToUpload: File = null;
    selectedFile: File = null;
    uploader: FileUploader = new FileUploader({
        url: URL,
        itemAlias: 'photo',
        allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
        maxFileSize: 10485760
    });

    attachmentList: any = [];

    userModel = new User('', '', '', false, null);

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.uploader.onAfterAddingFile = (file: FileItem) => {
            this.settingTheFile(file);
        };

        this.uploader.onCompleteItem = (items: any, response: any, status: any, headers: any) => {
            console.log('ImageUpload:uploaded', items, status, response, headers);
            this.attachmentList.push(JSON.parse(response));
        };
    }

    settingTheFile(newFile: FileItem) {
        this.userModel.imageUploaded = true;
        this.userModel.imageFile = newFile.file;
        newFile.withCredentials = false;
    }

    // Displays the image in an image tag above the button
    showImagePreview(file: FileList) {
        this.fileToUpload = file.item(0);
        let reader = new FileReader();
        reader.onload = (event: any) => {
            this.imageUrl = event.target.result;
        };
        reader.readAsDataURL(this.fileToUpload);
    }

    uploadData() {
        let temp = this.uploader.queue[this.uploader.queue.length - 1];
        this.uploader.queue = [];
        this.uploader.queue.push(temp);
        this.uploader.queue[this.uploader.queue.length - 1].upload(); //Upload only the last item
        this.sendUserData(this.userModel);
    }

    //Sends the form filled data as a User object
    sendUserData(user: User) {

        return this.http.post<User>(URL1, user).pipe(takeUntil(this.unsubscribe)).subscribe(data => console.log(data));
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
