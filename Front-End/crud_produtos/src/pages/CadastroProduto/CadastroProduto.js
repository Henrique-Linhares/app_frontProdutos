import "./CadastroProduto.css";
import { useEffect, useState } from "react";

export default function CadastroProduto({
  produtos,
  setProdutoscategorias,
  setCategorias,
}) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState(0);
  const [estoque, setEstoque] = useState(0);
  const [opcoes, setOpcoes] = useState([]);
  const [categoriaId, setCategoriaId] = useState("");
  const [loading, setLoading] = useState(false);

  async function carregarCategorias() {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4567/categorias");
      const data = await response.json();
      console.log("Categorias listadas com sucesso!", data);
      setOpcoes(data);
    } catch (error) {
      console.error("Erro ao buscar as categorias:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarCategorias();
  }, []);

  const adicionaProduto = async () => {
    try {
      const response = await fetch("http://localhost:4567/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome,
          preco: preco,
          estoque: estoque,
          categoria: categoriaId ? { id: categoriaId } : null,
        }),
      });

      const data = await response.json();
      console.log("Produto criado com Sucesso!", data);
      setNome("");
      setPreco(0);
      setEstoque(0);
      setCategoriaId("");
    } catch (error) {
      console.error("Erro: Erro ao criar o Produto", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adicionaProduto();
  };

  return (
    <div className="container">
      <h2>Cadastrar Produto</h2>
      <form onSubmit={handleSubmit}>
        <label className="label-form" htmlFor="nome">
          Nome:
        </label>
        <input
          type="text"
          placeholder="Digite o nome do produto: (Ex: Notebook):"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <label className="label-form" htmlFor="preco">
          Preço:
        </label>
        <input
          type="number"
          placeholder="Digite o preço do produto: (Ex: 1599.99)"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          min="0"
          step="0.01"
        />

        <label className="label-form" htmlFor="estoque">
          Estoque:
        </label>
        <input
          type="number"
          placeholder="Digite o estoque do produto: (Ex: 100)"
          value={estoque}
          onChange={(e) => setEstoque(e.target.value)}
          min="0"
        />

        <div className="select-categorias">
          <label className="label-form">Categoria:</label>
          {loading ? (
            <p>Carregando categorias...</p>
          ) : (
            <select
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
            >
              <option value="">Selecione uma categoria</option>
              {opcoes.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
            </select>
          )}
        </div>

        <button type="submit">Salvar Produto</button>
      </form>
    </div>
  );
}
