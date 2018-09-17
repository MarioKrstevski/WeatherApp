export class User {

    //Properties are public because they need to be binded with ngModel in the forms
    constructor(
        public name: string,
        public email: string,
        public message: string,
        public imageUploaded: boolean,
        public imageFile: any
    ) { }
}
