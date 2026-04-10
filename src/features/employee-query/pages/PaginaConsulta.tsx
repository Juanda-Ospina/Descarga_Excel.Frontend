import { set, useForm } from 'react-hook-form';
import { useConsultaEmpleados , } from '../hooks/useConsultaEmpleados';
import { ParametrosConsulta } from '../../../shared/types';
import { Download, Search } from 'lucide-react';
import React, { useState } from 'react';
import ModalError from '@/src/shared/Components/Modales/ModalError/ModalError';
import styles from './PaginaConsulta.module.css';
import { data } from 'react-router-dom';
import { obtenerSecciones } from '../services/servicioSecciones';
import { useConsultaSecciones } from '../hooks/useConsultaSecciones';


export const PaginaConsulta = () => {
  const { register, handleSubmit } = useForm<ParametrosConsulta>();
  const { descargarReporte, cargando, error , modalAbierto, setModalAbierto, mjError } = useConsultaEmpleados();
  const { secciones, cargandoSecciones, errorSecciones } = useConsultaSecciones();
  const [mensajeError, setMensajeError] = useState('');
 
  
  const onSubmit = async (data: ParametrosConsulta) => {
    try {
    const respuesta = await descargarReporte(data);

    } catch (error) {
      setMensajeError('Error al descargar');
      setModalAbierto(true);
    }
  };


  return (
    
  <div className={styles.pageContainer}>
    <div className={styles.contentWrapper}>

      <header className={styles.headerContainer}>
        <img
          src="/Logo_Crystal.png" 
          alt="Crystal SAS" 
          className={styles.logoImage} 
        />
        <p className={styles.titleMain}>Gestión de Reporte</p>
        <p className={styles.titleSub}>Gestión de reportes y consulta por secciones operativas.</p>
      </header>

      <div className={styles.cardOuter}>
        {/* Descarga de Reporte */}
        <section className={styles.cardInner}>
          <div className={styles.sectionHeader}>
            <Download size={24} />
            <h2 className={styles.sectionTitle}>Descarga de Reporte</h2>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
            <div className={styles.formGrid}>
              <div>
                <label className={styles.formLabel}>Fecha Inicial</label>
                <input {...register('fechaInicio')} type="date" className={styles.formControl} required />
              </div>
              <div>
                <label className={styles.formLabel}>Fecha Final</label>
                <input {...register('fechaFin')} type="date" className={styles.formControl} required />
              </div>
            </div>
            
            <div>
              <label className={styles.formLabel}>Código de Sección</label>
              <select {...register('codigoSeccion')} className={styles.formControl} required>
                <option value="">Seleccione una sección</option>  
                {secciones.map((seccion) => (
                  <option value={seccion.coSeccion}>
                    {seccion.deSeccion}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={styles.formLabel}>Tipo de Archivo</label>
              <select {...register('tipoArchivo')} className={styles.formControl} required>
                <option value="">Seleccione un formato</option>
                <option value="1">INFORME PRIMERAS</option>
                <option value="2">INFORME SEGUNDAS</option>
                <option value="3">INFORME PAROS</option>
              </select>
            </div>

            <button 
              type="submit" 
              className={styles.btnSubmit} 
              disabled={cargando}
            >
              <Download size={18} />
              {cargando ? 'Descargando...' : 'Descargar Excel'}
            </button>
          </form>

          {error && <p className={styles.errorMessage}>{error}</p>}
        </section>
      </div>
      </div>

     <ModalError
        abierto={modalAbierto}
        mensajeError={mjError} 
        codigoError={'Desconocido'} 
        textoBoton="Cerrar"
        titulo="Se produjo un error al descargar el reporte"
        mostrarCerrar={true}
        onClose={() => setModalAbierto(false)}
      />

     
    </div>

  
  );
};


{/* <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-6 text-emerald-600">
            <Search size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Consulta de Secciones</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Sección</label>
              <input placeholder="Ej. Norte" className="w-full border border-gray-300 rounded-lg p-2.5" />
            </div>
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
              <Search size={18} />
              Consultar Sección
            </button>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">RESULTADOS</h3>
            <p className="text-gray-400 text-center py-8">Ingresa un nombre para buscar secciones.</p>
          </div>
        </section>  */}