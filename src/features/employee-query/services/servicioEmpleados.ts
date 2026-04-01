import apiClient from '../../../infrastructure/api/apiClient';
import { ParametrosConsulta, RespuestaConsulta } from '../../../shared/types';

export const obtenerReporteEmpleados = async (params: ParametrosConsulta): Promise<RespuestaConsulta> => {
  const response = await apiClient.get('/DescargarExcel', {
    params,
    responseType: 'blob',
  });

  const contentDisposition = response.headers['content-disposition'];
  const nombreArchivo = contentDisposition
    ? contentDisposition.split('filename=')[1].replace(/"/g, '')
    : 'reporte.xlsx';

  return { data: response.data, nombreArchivo };
};
