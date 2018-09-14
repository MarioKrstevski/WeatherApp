export class DateWrapper{

    constructor(
        public day: number = 0 ,
        public month: number = 0,
        public year: number = 0,
    ){}

    createDateString(){
        let dateZ = new Date(`${this.month}-${this.day+1}-${this.year}`).toISOString().substr(0,10) + 'Z';
        return dateZ;
    }
}
