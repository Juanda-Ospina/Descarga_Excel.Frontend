import { useForm } from 'react-hook-form';
import { useConsultaEmpleados } from '../hooks/useConsultaEmpleados';
import { ParametrosConsulta } from '../../../shared/types';
import { Download, Search } from 'lucide-react';

export const PaginaConsulta = () => {
  const { register, handleSubmit } = useForm<ParametrosConsulta>();
  const { descargarReporte, cargando, error } = useConsultaEmpleados();

  const onSubmit = (data: ParametrosConsulta) => {
    descargarReporte(data);
  };

  return (
    
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800 flex justify-center items-center">
      <div className="w-full max-w-xl">

      <header className="mb-10 text-center flex flex-col items-center">
      <img
      src="/Logo_Crystal.png" 
      alt="Crystal SAS" 
      className="h-32 w-auto mb-4 object-contain mx-auto" 
      />
        <h1 className="text-3xl font-bold text-gray-900">Gestion de Reporte</h1>
        <p className="text-gray-600">Gestión de reportes y consulta por secciones operativas.</p>
      </header>

      <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100">
        {/* Descarga de Reporte */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-6 text-blue-600">
            <Download size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Descarga de Reporte</h2>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicial</label>
                <input {...register('fechaInicio')} type="date" className="w-full border border-gray-300 rounded-lg p-2.5" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Final</label>
                <input {...register('fechaFin')} type="date" className="w-full border border-gray-300 rounded-lg p-2.5" required />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Código de Sección</label>
              <select {...register('codigoSeccion')} className="w-full border border-gray-300 rounded-lg p-2.5" required>
                <option value="">Seleccione una sección</option>  
                <option value="7">Empaque manual</option>
                {/* <option value="8">Sección...</option>
                <option value="9">Sección...</option> */}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Archivo</label>
              <select {...register('tipoArchivo')} className="w-full border border-gray-300 rounded-lg p-2.5" required>
                <option value="">Seleccione un formato</option>
                <option value="1">Informe Primeras</option>
                {/* <option value="2">Informe Segundas</option>
                <option value="3">Informe Paros</option> */}
              </select>
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors" disabled={cargando}>
              <Download size={18} />
              {cargando ? 'Descargando...' : 'Descargar Excel'}
            </button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </section>



        {/* Consulta de Secciones */}
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
        </section> */}
      </div>
      </div>
    </div>
  );
};
