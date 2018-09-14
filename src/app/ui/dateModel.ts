// TODO, even though the class is camel case, the file should be dash case - If class is DateWrapper then file name should be date-wrapper.model.ts
export class DateModel{

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
