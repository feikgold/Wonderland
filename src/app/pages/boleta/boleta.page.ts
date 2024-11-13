import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-boleta',
  templateUrl: './boleta.page.html',
  styleUrls: ['./boleta.page.scss'],
})
export class BoletaPage implements OnInit {

  infoUsuario: any = {};
  totalCarrito: number = 0;
  albumsComprados: any[] = [];
  idusuario!: number;

  constructor(
    private router: Router,
    private bd: ServicebdService,
    private storage: NativeStorage
  ) {
    const nav = this.router.getCurrentNavigation();
    if (nav && nav.extras.state) {
      this.infoUsuario = nav.extras.state['usuario'] || {};  
      this.totalCarrito = nav.extras.state['total'] || 0;
      this.albumsComprados = nav.extras.state['albums'] || [];

      console.log('Total en la boleta:', this.totalCarrito);
      console.log('Álbumes comprados en la boleta:', this.albumsComprados);
    } else {
      console.warn('No se recibieron datos del estado de navegación.');
    }
  }

  ngOnInit() {
    this.obtenerIdUsuario();
  }

  async obtenerIdUsuario() {
    try {
      const usuario = await this.storage.getItem('usuario_logueado');
      if (usuario && usuario.id_usuario) {
        this.idusuario = usuario.id_usuario;
        console.log('ID Usuario obtenido:', this.idusuario);
      } else {
        console.error('No se pudo obtener el ID del usuario');
      }
    } catch (error) {
      console.error('Error al obtener el usuario logueado:', error);
    }
  }

  volverAlInicio() {
    this.router.navigate(['/home']);
  }
}
