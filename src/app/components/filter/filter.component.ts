import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';

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

  constructor(private popoverCtrl: PopoverController) { }

  
  ngOnInit() {
    this.getLocalStore();
  }

  close() { // cierra el modal
    this.popoverCtrl.dismiss();   
  }

  saveLocalStore(categoria: string) { // guarda en el local store
    localStorage.setItem('categoria', JSON.stringify(categoria));
  }

  getLocalStore() { // obtiene los valores de local storage
    const categoria = JSON.parse(localStorage.getItem('categoria'));
    this.categoria = categoria;
  }

  selectCategoria(categoria: string) {
    this.popoverCtrl.dismiss({ categoria: categoria }, 'confirm'); // envio los datos
    this.saveLocalStore(this.categoria); // guarda en el local store para cuando el usuario vuelva a la vista de filtro
  }

}
