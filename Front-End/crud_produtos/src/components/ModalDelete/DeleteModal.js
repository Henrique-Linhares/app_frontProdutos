import React from "react";
import "./DeleteModal.css";

const DeleteModal = ({ categoria, confirmar, cancelar }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h3 className="modal-title">Confirmar Exclusão</h3>
      <p className="modal-message">
        Tem certeza que deseja deletar a categoria:{" "}
        <span className="font-semibold">{categoria.nome}</span> (ID:{" "}
        {categoria.id})?
      </p>
      <div className="modal-actions">
        <button onClick={cancelar} className="btn-cancel-modal">
          Cancelar
        </button>
        <button
          onClick={() => confirmar(categoria.id)}
          className="btn-delete-confirm-modal"
        >
          Deletar
        </button>
      </div>
    </div>
  </div>
);

export default DeleteModal;
