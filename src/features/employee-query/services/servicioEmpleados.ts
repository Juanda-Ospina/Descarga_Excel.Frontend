import apiClient from '../../../infrastructure/api/apiClient';
import { ParametrosConsulta, RespuestaConsulta , RespuestaSeccion } from '../../../shared/types';

export const obtenerReporteEmpleados = async (params: ParametrosConsulta): Promise<RespuestaConsulta> => {
  const response = await apiClient.get('/api/DescargarExcel', {
    params,
    responseType: 'blob',
  });

  console.log('Respuesta de Axios:', response.headers);

  const contentDisposition = response.headers['content-disposition'] 
  let nombreArchivo = 'reporte.xlsx';
  if (contentDisposition) {
      
      if (contentDisposition.includes("filename*=UTF-8''")) {
        
        const nombreCrudo = contentDisposition.split("filename*=UTF-8''")[1].split(';')[0];
        
        nombreArchivo = decodeURIComponent(nombreCrudo); 
      } 
    
      else if (contentDisposition.includes('filename=')) {
        nombreArchivo = contentDisposition.split('filename=')[1].split(';')[0].replace(/"/g, '');
      }
    }

  return { data: response.data, nombreArchivo };
};


