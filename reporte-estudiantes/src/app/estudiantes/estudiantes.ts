import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EstudianteService, Estudiante } from '../services/estudiante';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './estudiantes.html'
})
export class Estudiantes implements OnInit {
  estudiantes: Estudiante[] = [];

  constructor(private servicio: EstudianteService) {}

  ngOnInit(): void {
    this.servicio.obtenerEstudiantes().subscribe({
      next: (data) => {
        console.log('Cantidad de estudiantes:', data.length);
        this.estudiantes = data;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}