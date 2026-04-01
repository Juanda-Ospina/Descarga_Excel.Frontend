export interface ParametrosConsulta {
  fechaInicio: string;
  fechaFin: string;
  codigoSeccion: number;
  tipoArchivo: 1 | 2 | 3;
}

export interface RespuestaConsulta {
  data: Blob;
  nombreArchivo: string;
}
