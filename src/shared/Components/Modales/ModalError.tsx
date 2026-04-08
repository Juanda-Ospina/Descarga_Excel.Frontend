import { useEffect, useState } from "react";
import { ModalErrorProps } from "../../types";
import styles from "./Modal.module.css"
import Modal from "./Modal";
import { useConsultaEmpleados } from "@/src/features/employee-query/hooks/useConsultaEmpleados";

export default function ModalError(
    {
    abierto,
    mensajeError,
    codigoError,
    textoBoton,
    titulo,
    onClose
}: ModalErrorProps) {
    const [seccion, setSeccion] = useState("")
    const [validacion, setValidacion] = useState("")
    const { mjError } = useConsultaEmpleados();

    useEffect(() => {
        if (abierto) setSeccion("")
    }, [abierto])

    return (
        <Modal 
            abierto={abierto}
            onClose={onClose}
            className={styles.modalError}
            variant="danger"
            // titulo={titulo} <- Descomenta esto SOLO si tu Modal base necesita esta prop
        >
            <div className={styles.contenido}>
                {/* Título del error */}
                <h2 className={styles.titleMain}>
                    {titulo}
                </h2>
                
                {/* Mensaje que viene desde tu backend */}
                <p className={styles.formLabel}>
                    {mensajeError}
                </p>
                
                {/* Código de error (solo se renderiza si existe) */}
                {codigoError && (
                    <p className={styles.codigoError}>
                        Código de error: {codigoError}
                    </p>
                )}

                {/* Si tienes un botón de cerrar en este nivel, puedes usar textoBoton */}
                <div className="flex justify-center mt-2">
                    <button 
                        onClick={onClose}
                        className={styles.btnSubmit}
                    >
                        {textoBoton || "Aceptar"}
                    </button>
                </div>
            </div>
        </Modal>
    )
    
  
}