import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private platform: Platform) {}

  ngOnInit(): void {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      setTimeout(() => {
        //SplashScreen.hide();
      }, 3000);

      this.platform.backButton.subscribeWithPriority(-1, () => { // prioridad para salir de la app en el boton back button hardware
        App.exitApp();
      });
    })
  }

}