<<<<<<< HEAD:src/app/ui/date-wraper.model.ts
export class DateWrapper{
=======
// TODO, even though the class is camel case, the file should be dash case - If class is DateWrapper then file name should be date-wrapper.model.ts
export class DateModel{
>>>>>>> 49ad8c487a94d21d875fd6ae4d680d4d12d845b5:src/app/ui/dateModel.ts

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
