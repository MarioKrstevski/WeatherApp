import { FileItem } from "ng2-file-upload";

export class User {
    constructor(
        private name: string,
        private email: string,
        private message: string,
        public imageUploaded: boolean,
        public imageFile: any
    ){}
}
