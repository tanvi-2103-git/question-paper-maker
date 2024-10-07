export class Question{
    constructor(
       public question:string,
       public answer_type: string,
       public answer_choice: string,
       public marks_alloted: number,
    ){

    }
}