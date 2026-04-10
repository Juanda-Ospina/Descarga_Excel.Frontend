import { useEffect, useState } from "react";
import { obtenerSecciones } from "../services/servicioSecciones";
import { RespuestaSeccion } from "@/src/shared/types";


export const useConsultaSecciones = () => {
    
    const [secciones, setSecciones] = useState<RespuestaSeccion[]>([]);
    const [cargandoSecciones, setCargandoSecciones] = useState<boolean>(false);
    const [errorSecciones, setErrorSecciones] = useState<string | null>(null);

    const cargarSecciones = async () => {
        setCargandoSecciones(true);
        setErrorSecciones(null);
        
        try {
            const seccionesData = await obtenerSecciones();
            setSecciones(seccionesData);
            console.log('Secciones cargadas:', seccionesData);
        } catch (err) {
            console.error("Fallo al traer las secciones:", err);
            setErrorSecciones('Error al cargar la lista de secciones.');
        } finally {
            setCargandoSecciones(false);
        }
    };

    useEffect(() => {
        cargarSecciones();
    }, []); 

    return { 
        secciones, 
        cargandoSecciones, 
        errorSecciones, 
        cargarSecciones 
    };
}