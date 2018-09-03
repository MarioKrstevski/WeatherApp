export class User {
    constructor(
        private name: string,
        private email: string,
        private message: string,
        public imageUploaded: boolean,
        public imageFile: any
    ){}
}
