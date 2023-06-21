import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { Question } from '../models/question';
import { Anwser } from '../models/anwser';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class HomePage {

  // 3 membres de classe
  public pseudonyme = "";
  public levels = ["easy", "medium", "hard"]
  public remember = false;

  // les réponses possibles
  public replies = ["Blanc", "Noir", "Marron", "Je ne sais pas"];

  // Etat
  public score = 0;
  public state = "step_1";
  public displayNextQuestionBtn = false;
  public displayReplayBtn = false;

  // 
  public currentQuestionIndex = -1;
  public currentQuestion?: Question;
  public questions = Array<Question>();
  public hasReply = false;

  constructor(private questionService: QuestionService, private alertCtrl: AlertController, private toastCtrl: ToastController) { }

  /**
   * Naviguer à la question suivante
   */
  public nextQuestion() {
    // reset 
    this.hasReply = false;
    // cacher le bouton question suivante
    this.displayNextQuestionBtn = false;

    // Si je peux continuer
    if (this.currentQuestionIndex < this.questions.length - 1) {
      // incrementer 
      this.currentQuestionIndex++;
      // mettre la question actuelle
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
  }

  public restart() {
    // reset
    this.score = 0;
    this.currentQuestionIndex = -1;
    this.displayReplayBtn = false;
    this.hasReply = false;

    this.startGame();
  }

  public startGame() {
    // Appeler le service pour récupérer les quesstions
    this.questionService.getQuestions().then((data) => {

      // Mettre a jour les questions
      this.questions = data;

      // La premiere fois que j'appel le next, mon index va être 0 car par défaut c'est -1
      this.nextQuestion();

      // je change d'etat (step_2)
      this.changeState("step_2");
    })
  }

  /**
   * Changer d'etat
   * @param _newState 
   */
  public changeState(_newState: string) {
    this.state = _newState;
  }

  /**
   * Tester si l'etat concorde
   * @param _state 
   * @returns 
   */
  public isState(_state: String): boolean {
    return this.state == _state;
  }

  /**
   * Lors du clic du bouton du formulaire de l'etape 1
   */
  public async tryStartGame() {
    // Contrôle de surface
    // Si erreur
    // if (this.pseudonyme.length < 4) {
    //   // dialog box
    //   const alert = await this.alertCtrl.create({
    //     header: "Information Manquante",
    //     message: "Veuillez rentrer un pseudo de 3 caractères minimum"
    //     , buttons: ["OK"]
    //   });

    //   alert.present();

    // }
    // else {
    //   this.startGame();
    // }
    this.startGame();
  }

  public getReplyColor(reply: Anwser): String {
    // Si j'ai repondu
    if (this.hasReply) {
      if (reply == this.currentQuestion!.correct_answer) {
        return "success";
      }
      return "danger";
    }

    return "primary";
  }

  /**
   * Lors du clic d'un bouton réponse
   */
  public async onReply(reply: Anwser) {

    let isCorrectAwnser = false;
    // Test si réponse correcte
    if (reply == this.currentQuestion!.correct_answer) {
      // Notifier bonne réponse
      isCorrectAwnser = true;
      // gagner des point
      this.score++;
    }
    // Afficher le button suivant
    this.displayNextQuestionBtn = true;
    //  Afficher le toast sur le résultat de la réponse
    const toast = await this.toastCtrl.create({
      message: `Votre réponse : ${(isCorrectAwnser) ? 'Correcte' : 'Incorrect'}`,
      duration: 1000
    });
    toast.present();

    // J'ai repondu
    this.hasReply = true;

    // Tester si le jeu est fini
    if (this.currentQuestionIndex >= this.questions.length - 1) {
      // voir le bouton rejouter
      this.displayReplayBtn = true;
      // cacher le bouton questio suivante
      this.displayNextQuestionBtn = false;
    }
  }
}
