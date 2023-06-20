import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

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
  // pour teste si erreur
  public haveErrors = false;

  // les réponses possibles
  public replies = ["Blanc", "Noir", "Marron", "Je ne sais pas"];

  // Etat
  public state = "step_1";

  public displayNextQuestionBtn = false;

  constructor() { }

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
  public onSubmit() {
    // Contrôle de surface
    // Si erreur
    if (this.pseudonyme.length < 4) {
      this.haveErrors = true;
    }
    else {
      // je change d'etat (step_2)
      this.changeState("step_2");
    }
  }

  /**
   * Lors du clic d'un bouton réponse
   */
  public onReply() {
    // Afficher le button suivant
    this.displayNextQuestionBtn = true;
  }
}
