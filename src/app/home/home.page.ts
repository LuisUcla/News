import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FilterComponent } from '../components/filter/filter.component';
import { NoticiasService } from '../services/noticias.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  loaded: boolean = false; // se usa para mostrar los skeleton de simulacion de carga de las noticias
  categoria: string = 'general'; // general por defecto
  pais: string = 've'; // venezuela por defecto
  listNews: any[] = []; // listado de noticias 
  error: boolean = false; // para mostrar mjs en cosa de error de internet o otros.

  constructor(private modalCtrl: ModalController, private noticiasServices: NoticiasService) {}

  ngOnInit(): void {
    this.getNews(); // carga las noticias con los parametros por defecto 've', 'general'
    this.clearLocalStore(); // limpia el store al inicio de la app.
  }

  doRefresh(event) { // refresca la pagina haciendo pull hacia abajo
    this.loaded = false;
    this.error = false;
    this.listNews = [];

    const parametros = { // default
      categoria: this.categoria,
      pais: this.pais
    }

    this.noticiasServices.getNoticias(parametros).subscribe((news:any) => {
      this.loaded = true;
      this.listNews = news.articles;
      event.target.complete();
    }, () => {
      event.target.complete();
      this.error = true;
      this.loaded = true;
      // colocar toast para mostrar un mjs en caso de error
    })

  }

  async openFilter() { // lanza el  modal para aplicar los filtros
    const modal = await this.modalCtrl.create({
      component: FilterComponent,
      canDismiss: true,
      //presentingElement: this.routerOutlet.nativeEl,
      initialBreakpoint: 0.50,
      backdropBreakpoint: 0.25,
      breakpoints: [0, 0.25, 0.5, 0.75, 1]
    });

    await modal.present();  

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.pais = data.pais;
      this.categoria = data.categoria;
      this.getNews();
    }

  }

  clearLocalStore() { // limpia las variables del local store
    localStorage.removeItem('data');
  }

  getNews() {
    this.loaded = false;
    this.error = false;
    this.listNews = [];

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
      this.error = true;
      this.loaded = true;
      // colocar toast para mostrar un mjs en caso de error
    })
  }

}
