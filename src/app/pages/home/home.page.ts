import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { QuestionService } from '../../services/question.service';
import { Router } from '@angular/router';


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

  constructor(private alertCtrl: AlertController, private router : Router) {
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
      // Naviguer sur la page game avec le param pseudo
      this.router.navigate(['/game', this.pseudonyme]);
    }
  }
}
