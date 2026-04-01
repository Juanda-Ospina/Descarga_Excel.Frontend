import { useState } from 'react';
import { ParametrosConsulta } from '../../../shared/types';
import { obtenerReporteEmpleados } from '../services/servicioEmpleados';

export const useConsultaEmpleados = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const descargarReporte = async (params: ParametrosConsulta) => {
    setCargando(true);
    setError(null);
    try {
      const response = await obtenerReporteEmpleados(params);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', response.nombreArchivo);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('Error al descargar el reporte');
    } finally {
      setCargando(false);
    }
  };

  return { descargarReporte, cargando, error };
};
