import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { FilterComponent } from '../components/filter/filter.component';
import { NoticiasService } from '../services/noticias.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  loaded: boolean = false;
  categoria: string = 'general'; // general por defecto
  pais: string = 've'; // venezuela por defecto
  listNews: any[] = [];

  constructor(private modalCtrl: ModalController,  
    private noticiasServices: NoticiasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getNews();
  }

  async openFilter() {
    const modal = await this.modalCtrl.create({
      component: FilterComponent,
      canDismiss: true,
      //presentingElement: this.routerOutlet.nativeEl,
      initialBreakpoint: 0.75,
      backdropBreakpoint: 0.25,
      breakpoints: [0, 0.25, 0.5, 0.75, 1]
    });

    await modal.present();  

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.loaded = false;
      this.pais = data.pais;
      this.categoria = data.categoria;
      this.getNews();
    }

  }

  getNews() {
    this.loaded = false;

    const parametros = { // default
      categoria: this.categoria,
      pais: this.pais
    }
    this.noticiasServices.getNoticias(parametros).subscribe((news:any) => {
      this.loaded = true;
      this.listNews = news.articles;
      console.log(this.listNews);
    }, (error) => {
      console.log(error);
      this.loaded = true;
      // colocar toast para mostrar un mjs en caso de error
    })
  }

}
