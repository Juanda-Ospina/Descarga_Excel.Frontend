import apiClient from '../../../infrastructure/api/apiClient';
import { RespuestaSeccion } from '../../../shared/types';
import React from 'react';

export const obtenerSecciones = async (): Promise<RespuestaSeccion[]> => {
  
    const Secciones = await apiClient.get('/api/Seccion');

    return Secciones.data;
  
}