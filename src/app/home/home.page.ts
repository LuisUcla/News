import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, PopoverController } from '@ionic/angular';
import { FilterComponent } from '../components/filter/filter.component';
import { NoticiasService } from '../services/noticias.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  loaded: boolean = false; // se usa para mostrar los skeleton de simulacion de carga de las noticias
  categoria: string = 'general'; // general por defecto
  pais: string = 've'; // venezuela por defecto
  listNews: any[] = []; // listado de noticias 
  error: boolean = false; // para mostrar mjs en caso de error de internet u otros.

  constructor(private popoverCtrl: PopoverController, private noticiasServices: NoticiasService) {}

  ngOnInit(): void {
    this.getNews();
    this.clearLocalStore();
  }

  doRefresh(event) { // refresca la pagina haciendo pull hacia abajo
    this.loaded = false;
    this.error = false;
    this.listNews = [];

    const parametros = { // default
      categoria: this.categoria,
      pais: this.pais
    }

    this.noticiasServices.getNoticias(parametros).subscribe((news: any) => {
      this.loaded = true;
      this.listNews = news.articles;
      event.target.complete();
    }, () => {
      event.target.complete();
      this.error = true;
      this.loaded = true;
    });

  }

  async openFilter(e: Event) { // lanza el modal para aplicar los filtros
    const popover = await this.popoverCtrl.create({
      component: FilterComponent,
      event: e
    });

    await popover.present();  

    const { data, role } = await popover.onDidDismiss(); // obtiene los datos del componente hijo (modal)

    console.log(data);
    if (role === 'confirm') {
      this.categoria = data.categoria;
      this.getNews();
    }

  }

  clearLocalStore() { // limpia las variables del local store al inicio de la app
    localStorage.removeItem('categoria');
  }

  getNews() { // carga las noticias con los parametros por defecto: 've', 'general'
    this.loaded = false; // se muestran los skeleton mientras se carga la data
    this.error = false;
    this.listNews = [];

    const parametros = { // default
      pais: this.pais,
      categoria: this.categoria,
      
    }

    this.noticiasServices.getNoticias(parametros).subscribe((news: any) => {
      this.loaded = true; // se oculta los skeleton
      this.listNews = news.articles; // datos cargados
    }, () => {
      this.error = true;
      this.loaded = true;
    })
  }

  scrollToTop() {
    // Passing a duration to the method makes it so the scroll slowly
    // goes to the bottom instead of instantly
    this.content.scrollToTop(500);
  }

}
