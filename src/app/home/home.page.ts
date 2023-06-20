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

  constructor() {}

  public onSubmit(){
    // Contrôle de surface
    // Si erreur
    if (this.pseudonyme.length < 4){
      this.haveErrors = true;
    }
  }
}
