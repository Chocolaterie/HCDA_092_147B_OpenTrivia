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
      "easy", "In &quot;Fairy Tail&quot;, what is the nickname of Natsu Dragneel?",
      new Anwser("The Salamander"), [new Anwser("The Dragon Slayer"), new Anwser("The Dragon"), new Anwser("The Demon")]),
    // 2eme
    new Question("Entertainment: Video Games", "boolean",
      "medium", "&quot;Return to Castle Wolfenstein&quot; was the only game of the Wolfenstein series where you don&#039;t play as William &quot;B.J.&quot; Blazkowicz",
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
