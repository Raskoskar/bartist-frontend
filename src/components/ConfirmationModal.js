import React from "react";
import styles from "../styles/ConfirmationModal.module.css";

function ConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Confirmation de suppression</h2>
        <p>Êtes-vous sûr de vouloir supprimer cet événement ?</p>
        <div className={styles.modalActions}>
          <button onClick={onConfirm}>Confirmer</button>
          <button onClick={onClose}>Annuler</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
