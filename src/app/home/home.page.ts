import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { Question } from '../models/question';
import { Anwser } from '../models/anwser';
import { QuestionService } from '../services/question.service';
import { QuestionGame, GameState } from '../models/question-game';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class HomePage {

  // Juste pour la vue
  GameState = GameState;

  // 3 membres de classe
  public pseudonyme = "";
  public levels = ["easy", "medium", "hard"]
  public remember = false;

  // Etat
  public state = "step_1";
  public questionGame? : QuestionGame;

  constructor(private questionService: QuestionService, private alertCtrl: AlertController, private toastCtrl: ToastController) {

    // J'instancie le jeu
    this.questionGame = new QuestionGame();
  }

  /**
   * Naviguer à la question suivante
   */
  public nextQuestion() {
    this.questionGame!.nextQuestion();
  }

  public restart() {
    this.questionGame!.restart();
  }

  public startGame() {
    // Appeler le service pour récupérer les quesstions
    this.questionService.getQuestions().then((data) => {

      // Mettre a jour les questions
      this.questionGame?.startGame(data);

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
    if (this.pseudonyme.length < 4) {
      // dialog box
      const alert = await this.alertCtrl.create({
        header: "Information Manquante",
        message: "Veuillez rentrer un pseudo de 3 caractères minimum"
        , buttons: ["OK"]
      });

      alert.present();

    }
    else {
      this.startGame();
    }
  }

  /**
   * Connaitre la couleur du bouton selon l'etat du jeu
   * @param reply 
   * @returns 
   */
  public getReplyColor(reply: Anwser): String {
    // Si j'ai repondu
    if (this.questionGame!.isState(GameState.REPLIED)) {
      if (this.questionGame!.isCorrectAnwser(reply)) {
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

    // Tester la réponse
    let isCorrectAwnser = this.questionGame!.checkAnwser(reply);

    //  Afficher le toast sur le résultat de la réponse
    const toast = await this.toastCtrl.create({
      message: `Votre réponse : ${(isCorrectAwnser) ? 'Correcte' : 'Incorrect'}`,
      duration: 1000
    });
    toast.present();

    // Tester si le jeu est fini
    if (this.questionGame!.gameIsFinish()) {
      this.questionGame!.finishGame();
    }
  }
}
