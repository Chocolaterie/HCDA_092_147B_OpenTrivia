import { Injectable } from '@angular/core';
import { Anwser } from '../models/anwser';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  public questions = [
    // 1er
    new Question("Entertainment: Japanese Anime & Manga", "multiple",
      "easy", "In \"Fairy Tail\", what is the nickname of Natsu Dragneel?",
      new Anwser("The Salamander"), [new Anwser("The Dragon Slayer"), new Anwser("The Dragon"), new Anwser("The Demon")]),
    // 2eme
    new Question("Entertainment: Video Games", "boolean",
      "medium", "\"Return to Castle Wolfenstein\"; was the only game of the Wolfenstein series where you don't play as William \"B.J.\" Blazkowicz",
      new Anwser("False"), [new Anwser("True")]),

  ]
  constructor() { }

  /**
   * Récupérer les questions
   * @returns 
   */
  public getQuestions() : Promise<Array<Question>>{
    return new Promise((resolve, reject) => {
      resolve(this.questions);
    })
  }
}
