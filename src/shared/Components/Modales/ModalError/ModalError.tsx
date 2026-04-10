import { useEffect, useState } from "react";
import { ModalErrorProps } from "../../../types";
import styles from "./ModalError.module.css";
import Modal from "../Modal";
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
    const [seccion, setSeccion] = useState("");

    useEffect(() => {
        if (abierto) setSeccion("")
    }, [abierto])

    return (
    <Modal
      abierto={abierto}
      onClose={onClose}
      mostrarCerrar={false}
      ancho="sm"
      frameless={true}
    >
      <div className={styles.wrapper}>
        <div className={styles.iconWrap}>
          <div className={styles.icono}></div>
        </div>

        <h2 className={styles.titulo}>Atención</h2>

        <p className={styles.mensaje}>{mensajeError}</p>

        <button className={styles.boton} onClick={onClose}>
          Entendido
        </button>
      </div>
    </Modal>
    )
    
}