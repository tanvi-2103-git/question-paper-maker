import { Question } from "./question";

export class QuestionPaper {
    constructor(
      public _id:string ="",
       public questions: Question[] = [],
  public sub_name: string = "",
  public user_id:string = "",
  public createdAt: Date 
    ){}
}