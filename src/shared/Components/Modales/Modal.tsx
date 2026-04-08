import { useEffect, useRef } from "react"
import { ModalProps } from "../../types";
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"
import styles from "./Modal.module.css"

export default function Modal({
  abierto,
  titulo,
  icono,
  children,
  onClose,
  onConfirm,
  botonConfirmar,
  mostrarCerrar = true,
  mostrarCancelar = true,
  ancho = "md",
  variant = "default",
  tipoBoton = "default",
  modo = "default",
  frameless = false,
  className = "",
  cerrarAlClickFuera = true
}: ModalProps) {
  void mostrarCerrar

  const botonCerrarRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "Enter" && onConfirm) onConfirm()
    }
    if (abierto) document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [abierto, onClose, onConfirm])

  useEffect(() => {
    if (abierto && mostrarCerrar && botonCerrarRef.current) {
      setTimeout(() => botonCerrarRef.current?.focus(), 10)
    }
  }, [abierto, mostrarCerrar])

  return createPortal(
    <AnimatePresence>
      {abierto && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => {
            if (cerrarAlClickFuera) onClose()
          }}
        >
          <motion.div
            className={`${styles.modal} ${styles[ancho]} ${styles[variant]} ${
              modo === "bottom-sheet" ? styles.bottomSheet : ""
            } ${frameless ? styles.frameless : ""} ${className}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titulo ? "modal-titulo" : undefined}
            initial={
              modo === "bottom-sheet"
                ? { y: "100%", opacity: 0 }
                : { scale: 0.9, opacity: 0, y: -25 }
            }
            animate={
              modo === "bottom-sheet"
                ? { y: 0, opacity: 1 }
                : { scale: 1, opacity: 1, y: 0 }
            }
            exit={
              modo === "bottom-sheet"
                ? { y: "100%", opacity: 0 }
                : { scale: 0.9, opacity: 0, y: -25 }
            }
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {(titulo || mostrarCerrar) && (
              <div className={styles.header}>
                {mostrarCerrar && (
                  <button
                    ref={botonCerrarRef}
                    type="button"
                    aria-label="Cerrar modal"
                    className={styles.cerrarBtn}
                    onClick={() => onClose()}
                  >
                    <span className={styles.X}></span>
                    <span className={styles.Y}></span>
                  </button>
                )}
                {titulo && (
                  <div className={styles.iconoTitulo}>
                    {icono && <span className={styles.icono}>{icono}</span>}
                    <h2
                      id="modal-titulo"
                      className={`${styles.titulo} ${styles[variant]}`}
                    >
                      {titulo}
                    </h2>
                  </div>
                )}
              </div>
            )}

            <div className={styles.contenido}>{children}</div>

            {(onConfirm || botonConfirmar) && (
              <div className={styles.footer}>
                {mostrarCancelar && (
                  <button
                    type="button"
                    className={styles.btnCancelar}
                    onClick={() => {
                      if (typeof onClose === "function") onClose()
                    }}
                  >
                    Cancelar
                  </button>
                )}

                <button
                  type="button"
                  onClick={onConfirm}
                  className={`${styles.btnConfirmar} ${
                    tipoBoton === "peligro"
                      ? styles.btnPeligro
                      : tipoBoton === "exito"
                      ? styles.btnExito
                      : styles.btnNormal
                  }`}
                >
                  {botonConfirmar ?? "Aceptar"}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}