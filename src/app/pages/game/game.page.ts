import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Question } from '../../models/question';
import { Anwser } from '../../models/anwser';
import { QuestionGame, GameState } from '../../models/question-game';
import { QuestionService } from 'src/app/services/question.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class GamePage implements OnInit {

  // Juste pour la vue
  GameState = GameState;

  public pseudonyme : string | undefined | null;
  public questionGame? : QuestionGame;

  constructor(private activatedRoute : ActivatedRoute, private questionService: QuestionService, private toastCtrl: ToastController) {
        // J'instancie le jeu
        this.questionGame = new QuestionGame();
   }

  ngOnInit() {
    // Get le pseudo depuis l'url quand on arrive sur la page
    this.activatedRoute.paramMap.subscribe(
      params => {
          this.pseudonyme = params.get("pseudo");
          // --
          this.startGame();
      }
    );
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
      this.questionService.getQuestions().subscribe({
        next: (jsonData) => {
          console.log(jsonData);
          // Mettre a jour les questions
          this.questionGame?.startGame(jsonData);
        },
      });
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
