import { ReactNode } from "react";

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

export interface ModalProps {
  abierto: boolean
  titulo?: React.ReactNode
  icono?: ReactNode
  children: ReactNode
  onClose: () => void
  onConfirm?: () => void
  botonConfirmar?: string
  mostrarCerrar?: boolean
  mostrarCancelar?: boolean
  ancho?: "sm" | "md" | "lg"
  variant?: "default" | "info" | "success" | "danger" | "closure"
  tipoBoton?: "default" | "peligro" | "exito"
  modo?: "default" | "bottom-sheet"
  frameless?: boolean
  className?: string
  cerrarAlClickFuera?: boolean
  mensajeError?: string
  codigoError?: string
}

export interface ModalErrorProps {
  abierto: boolean
  mensajeError: string
  codigoError: string
  textoBoton: string
  titulo: string
  mostrarCerrar?: boolean
  onClose: () => void
}

export interface RespuestaSeccion {
  coSeccion: number;
  deSeccion: string;
}
