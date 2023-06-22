import { Injectable } from '@angular/core';
import { Anwser } from '../models/anwser';
import { Question } from '../models/question';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Récupérer les questions
   * @returns 
   */
  public getQuestions() : Observable<any>{
    return this.httpClient.get("https://opentdb.com/api.php?amount=2").
    pipe(
      map((data : any) => {
        // transform chaque question
        let newData = data.results.map((question : any) => {
          // Dans chaque question on transform la réponse correcte
          question.correct_answer = new Anwser(question.correct_answer);
          
          // les réponses incorrectes
          question.incorrect_answers = question.incorrect_answers.map((anwser : any) => { return new Anwser(anwser); });
        
          return new Question(question.category, question.type, question.difficulty, question.question, question.correct_answer, question.incorrect_answers);
        });

        return newData;
      })
    );
  }
}
