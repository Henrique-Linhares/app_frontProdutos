import { useEffect, useState } from "react";

export default function CadastroCategoria() {
  const [nome, setNome] = useState("");

  useEffect(() => {
    const adicionaCategoria = async () => {
    try {
      const response = await fetch("http://localhost:4567/categorias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome,
        }),
      });

      const data = await response.json();
      console.log("Produto criado com Sucesso!", data);
      setNome("");
    } catch (error) {
        console.error("Erro: Erro ao criar o Categoria", error);
    }
}
    
    adicionaCategoria();
  }, [nome]);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="container">
        <form onSubmit={handleSubmit}>
        <label className="label-form" htmlFor="nome">
          Nome:
        </label>
        <input
          type="text"
          placeholder="Digite o nome da Categoria: (Ex: Eletrônico):"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <button className="button-save">Salvar</button>
        </form>
    </div>
  );
}
