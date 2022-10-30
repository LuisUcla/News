import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import { AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private platform: Platform, private alertCtrl: AlertController) {}

  ngOnInit(): void {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      setTimeout(() => {
        //SplashScreen.hide();
      }, 3000);

      this.platform.backButton.subscribeWithPriority(-1, () => { // prioridad para salir de la app en el boton back button hardware
        this.presentAlert();
      });
    })
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: '¡Salir!',
      message: 'Desea salir de la app?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // pass
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            App.exitApp();
          },
        },
      ],
    });

    await alert.present();
  }

}