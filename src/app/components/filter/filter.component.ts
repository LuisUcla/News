import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  pais: string = ''; // variable 'pais' para capturar dicho dato en el formulario
  categoria: string = ''; //variable 'categoria' para capturar dicho dato en el formulario

  categorias: any[] = [ // listado de las categorias para aplicar en el filtro
    { value: "general", nombre: "General" },
    { value: "business", nombre: "Negocios" },
    { value: "entertainment", nombre: "Entretenimiento" },
    { value: "health", nombre: "Salud" },
    { value: "science", nombre: "Ciencia" },
    { value: "sports", nombre: "Deportes" },
    { value: "technology", nombre: "Tecnologia" },
  ];

  paises: any[] = [ // listado de paises para aplicar el filtro
    { value: "ve", nombre: "Venezuela" },
    { value: "ar", nombre: "Argentina"  },
    { value: "br", nombre: "Brasil" },
    { value: "fr", nombre: "Francia" },
  ];

  constructor(private modalCtrl: ModalController) { }

  
  ngOnInit() {
    this.getLocalStore();
  }

  close(action: string) { // cierra el modal
    if (action == 'aply' && this.pais && this.categoria) { // verifico que las dos variables tengan datos
      const data = { // creo un objeto con los datos del formulario
        pais: this.pais,
        categoria: this.categoria
      }

      this.modalCtrl.dismiss(data, 'confirm'); // envio los datos
    } else {
      this.modalCtrl.dismiss(null, 'cancel');
    }

    this.saveLocalStore(this.pais, this.categoria); // guarda en el local store para cuando el usuario vuelva a la vista de filtro
  }

  saveLocalStore(pais: string, categoria: string) { // guarda en el local store
    const data = {
      categoria: categoria,
      pais: pais
    }

    localStorage.setItem('data', JSON.stringify(data));
  }

  getLocalStore() { // obtiene los valores de local storage
    const data = JSON.parse(localStorage.getItem('data'));

    if (data) {
      this.categoria = data.categoria;
      this.pais = data.pais;
    }
  }

}
