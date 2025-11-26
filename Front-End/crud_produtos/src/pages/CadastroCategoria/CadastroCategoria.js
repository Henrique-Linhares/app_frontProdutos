import React, { useState, useEffect, useCallback } from "react";
import "./CadastroCategoria.css";
import Swal from "sweetalert2";

const API_BASE_URL = "http://localhost:4567/categorias";

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
        <button onClick={cancelar} className="btn-cancel">
          Cancelar
        </button>
        <button
          onClick={() => confirmar(categoria.id)}
          className="btn-delete-confirm"
        >
          Deletar
        </button>
      </div>
    </div>
  </div>
);

export default function CadastroCategoria() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [novoNome, setNovoNome] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [nomeEmEdicao, setNomeEmEdicao] = useState("");
  const [confirmarDelete, setConfirmarDelete] = useState(null);

  const carregarCategorias = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL);
      Swal.fire({
              title: "Cadastro realizado com Sucesso!",
              icon: "success",
              draggable: true,
            });

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      const data = await response.json();
      setCategorias(data);
    } catch (err) {
       Swal.fire({
              icon: "error",
              title: "Erro!",
              text: "Erro ao cadastrar a categoria!",
            });
      setCategorias([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarCategorias();
  }, [carregarCategorias]);
  const handleAdicionarCategoria = async (e) => {
    e.preventDefault();
    if (!novoNome.trim()) {
      setError("O nome não pode ser vazio.");
      return;
    }

    setError(null);
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: novoNome }),
      });

      if (!response.ok) {
        throw new Error(`Falha ao cadastrar. Status: ${response.status}`);
      }

      const novaCategoria = await response.json();
      setCategorias([...categorias, novaCategoria]);
      setNovoNome("");
    } catch (err) {
      setError("Falha ao cadastrar a categoria.");
    }
  };

  const handleEditar = (categoria) => {
    setEditandoId(categoria.id);
    setNomeEmEdicao(categoria.nome);
  };

  const handleSalvar = async (id) => {
    setError(null);

    if (!nomeEmEdicao.trim()) {
      setError("O nome não pode ser vazio.");
      return;
    }

    const dadosAtualizados = {
      id: id,
      nome: nomeEmEdicao,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosAtualizados),
      });

      if (!response.ok) {
        throw new Error(`Falha ao salvar. Status: ${response.status}`);
      }

      setCategorias(
        categorias.map((c) => (c.id === id ? dadosAtualizados : c))
      );
      setEditandoId(null);
       Swal.fire({
              title: "Categoria Atualizada com Sucesso!",
              icon: "success",
              draggable: true,
            });
    } catch (err) {
       Swal.fire({
              icon: "error",
              title: "Erro!",
              text: "Erro ao atualizar a categoria!",
            });
    }
  };

  const handleDeletar = async (id) => {
    setConfirmarDelete(null);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok && response.status !== 204) {
        throw new Error(`Falha ao deletar. Status: ${response.status}`);
      }

      setCategorias(categorias.filter((c) => c.id !== id));
       Swal.fire({
              title: "Categoria deletada com Sucesso!",
              icon: "success",
              draggable: true,
            });
    } catch (err) {
        Swal.fire({
              icon: "error",
              title: "Erro!",
              text: "Erro ao deletar a categoria!",
            });
    }
  };

  return (
    <div className="page-container">
      {confirmarDelete && (
        <DeleteModal
          categoria={confirmarDelete}
          confirmar={handleDeletar}
          cancelar={() => setConfirmarDelete(null)}
        />
      )}

      <div className="main-content-box">
        <h2 className="main-title">Gerenciador de Categorias</h2>

        <form onSubmit={handleAdicionarCategoria} className="add-form">
          <h3 className="form-title">Adicionar Nova Categoria</h3>
          <div>
            <label className="input-label" htmlFor="novoNome">
              Nome da Categoria
            </label>
            <input
              id="novoNome"
              type="text"
              placeholder="Ex: Eletrônico"
              value={novoNome}
              onChange={(e) => setNovoNome(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            Cadastrar Categoria
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Carregando categorias...</p>
          </div>
        ) : (
          <>
            <h3 className="list-title">
              Categorias Existentes ({categorias.length})
            </h3>
            {categorias.length === 0 ? (
              <p className="empty-list-message">
                Nenhuma categoria cadastrada.
              </p>
            ) : (
              <ul className="category-list">
                {categorias.map((categoria) => (
                  <li key={categoria.id} className="category-list-item">
                    {editandoId === categoria.id ? (
                      /* Modo Edição */
                      <div className="edit-mode-container">
                        <input
                          type="text"
                          value={nomeEmEdicao}
                          onChange={(e) => setNomeEmEdicao(e.target.value)}
                          className="input-field edit-input"
                          required
                        />
                        <div className="actions-group">
                          <button
                            onClick={() => handleSalvar(categoria.id)}
                            className="btn-save"
                          >
                            Salvar
                          </button>
                          <button
                            onClick={() => setEditandoId(null)}
                            className="btn-cancel"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="view-mode-container">
                        <span className="category-name">{categoria.nome}</span>
                        <div className="actions-group">
                          <button
                            onClick={() => handleEditar(categoria)}
                            className="btn-edit"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => setConfirmarDelete(categoria)}
                            className="btn-delete"
                          >
                            Deletar
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
