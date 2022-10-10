import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  categorias: any[] = [
    { value: "general", nombre: "General" },
    { value: "business", nombre: "Negocios" },
    { value: "entertainment", nombre: "Entretenimiento" },
    { value: "health", nombre: "Salud" },
    { value: "science", nombre: "Ciencia" },
    { value: "sports", nombre: "Deportes" },
    { value: "technology", nombre: "Tecnologia" },
  ];

  paises: any[] = [
    { value: "ve", nombre: "Venezuela" },
    { value: "ar", nombre: "Argentina"  },
    { value: "br", nombre: "Brasil" },
    { value: "fr", nombre: "Francia" },
  ];

  constructor(private modalCtrl: ModalController) { }

  pais: string = '';
  categoria: string = '';

  ngOnInit() {
    this.getLocalStore();
  }

  close(action: string) {
    if (action == 'aply' && this.pais && this.categoria) {
      const data = {
        pais: this.pais,
        categoria: this.categoria
      }

      this.modalCtrl.dismiss(data, 'confirm');
    } else {
      this.modalCtrl.dismiss(null, 'cancel');
    }

    this.saveLocalStore(this.pais, this.categoria); // guarda en el local store para cuando el usuario vuelva a la vista de flitro

  }

  saveLocalStore(pais: string, categoria: string) {
    const data = {
      categoria: categoria,
      pais: pais
    }
    localStorage.setItem('data', JSON.stringify(data));
  }

  getLocalStore() {
    const data = JSON.parse(localStorage.getItem('data'));

    if (data) {
      this.categoria = data.categoria;
      this.pais = data.pais;
    }
  }

}
