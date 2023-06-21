import { Anwser } from "./anwser";

export class Question {

    public constructor(public category: String,
        public type: String,
        public difficulty: String,
        public question: String,
        public correct_answer: Anwser,
        public incorrect_answers: Anwser[]
    ) {}

    public getAnwsers() : Anwser[] {
        let anwsers = Array<Anwser>();

        for (let anwser of this.incorrect_answers){
            anwsers.push(anwser);
        }
        anwsers.push(this.correct_answer);

        // Todo : Melanger

        return anwsers;
    }
}