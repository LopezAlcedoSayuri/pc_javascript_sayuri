import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  Estudiante,
  EstudianteService
} from '../services/estudiante';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle.html'
})
export class Detalle implements OnInit {

  estudiante?: Estudiante;
  cargando = true;
  error = '';

  constructor(
    private ruta: ActivatedRoute,
    public servicio: EstudianteService
  ) {}

  ngOnInit(): void {
    const id = Number(this.ruta.snapshot.paramMap.get('id'));

    this.servicio.obtenerEstudiantes().subscribe({
      next: (data) => {
        // Busca al estudiante por su posición en la lista
        this.estudiante = data[id];
        this.cargando = false;

        if (!this.estudiante) {
          this.error = 'No se encontró el estudiante.';
        }
      },
      error: (err) => {
        console.error('Error al obtener el estudiante:', err);
        this.cargando = false;
        this.error = 'No se pudieron cargar los datos.';
      }
    });
  }
}