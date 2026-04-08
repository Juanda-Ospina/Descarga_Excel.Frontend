import { useState } from 'react';
import { ParametrosConsulta } from '../../../shared/types';
import { obtenerReporteEmpleados } from '../services/servicioEmpleados';
import React from 'react';
import { set } from 'react-hook-form';
 

export const useConsultaEmpleados = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false)
  const [mjError, setMjError] = useState<string>('');
  const [codigoError, setCodigoError] = useState<number >();

  const descargarReporte = async (params: ParametrosConsulta) => {
    setCargando(true);
    setMjError('');//
    setCodigoError(undefined);//
    try {
      const paramsParaBackend = {
        FechaInicial: params.fechaInicio,
        FechaFinal: params.fechaFin,
        CodigoSeccion: Number(params.codigoSeccion),
        TipoArchivo: Number(params.tipoArchivo),
      }
      const response = await obtenerReporteEmpleados(paramsParaBackend as any);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', response.nombreArchivo);
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (err: any) {
      let mensajeBack = '';
      
      if (err.response.data instanceof Blob) {
        mensajeBack = err.response.data?.message || err.response.data || "Error interno del servidor";
      } else if (err.request) {
        mensajeBack = "No se pudo establecer conexión con el servidor.";
      } else {
        mensajeBack = err.message;
      }

      setMjError(typeof mensajeBack === 'string' ? mensajeBack : JSON.stringify(mensajeBack));
      setModalAbierto(true); 

    } finally {
      setCargando(false);
    }
  };
 
  return { descargarReporte, cargando, error, modalAbierto, setModalAbierto , mjError };
};
