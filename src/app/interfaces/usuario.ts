export interface Usuario {
  nombre: string;
  apellido: string;
  cedula: string;
  correo: string;
  edad : number;
  curso: string;
  ciudad: string;
}

export interface Curso {
  nombre: string; // Nombre del curso
  costo: number; // Costo del curso (se asume que es un valor numérico)
  horas: number; // Horas de duración del curso (se asume que es un valor numérico)
  modalidad: string; // Modalidad del curso (puede ser 'Matutina', 'Vespertina', etc.)
  inicio: Date; // Fecha de inicio del curso
  finaliza: Date; // Fecha de finalización del curso
}

