"use client"; 
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Layout from "../../components/Layout"; // Ajuste conforme necessário

interface Produto {
  id: string; // Adicionado id
  nome: string;
  categoria: string;
  valor: number;
  estoque: number; // Adicionado estoque
  dt_venci: string; // Adicionado dt_venci
  dt_fabrica: string; // Adicionado dt_fabrica
  marca: string; // Adicionado marca
  unidadeMedida: string; // Adicionado unidadeMedida
  peso_volume: number; // Adicionado peso_volume
}

const EditarProdutoPage = () => {
  const [produto, setProduto] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const id = params.id; // Obtém o id do produto a partir da URL

  // Função para buscar os dados do produto com base no ID
  const fetchProduto = async () => {
    try {
      const response = await axios.get(`http://localhost:8082/produtos/${id}`);
      setProduto(response.data);
      setLoading(false);
    } catch (err) {
      setError("Erro ao buscar os dados do produto");
      setLoading(false);
    }
  };

  // Função para atualizar os dados do produto
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8082/produtos/${id}`, produto);
      alert("Produto atualizado com sucesso");
      router.push("/produtos"); // Redireciona para a lista de produtos após a atualização
    } catch (err) {
      setError("Erro ao atualizar o produto");
    }
  };

  // UseEffect para buscar os dados do produto assim que o ID estiver disponível
  useEffect(() => {
    if (id) {
      fetchProduto(); // Busca os dados do produto se o ID for válido
    }
  }, [id]);

  // Mostra uma mensagem de carregamento enquanto os dados estão sendo buscados
  if (loading) {
    return <p>Carregando dados do produto...</p>;
  }

  // Mostra uma mensagem de erro caso haja algum problema na requisição
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800">Editar Produto</h1>

        {produto && (
          <form onSubmit={handleUpdate} className="mt-8">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nome"
                value={produto.nome}
                onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
                className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              />
              <input
                type="text"
                placeholder="Categoria"
                value={produto.categoria}
                onChange={(e) => setProduto({ ...produto, categoria: e.target.value })}
                className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              />
              <input
                type="number"
                placeholder="Valor"
                value={produto.valor}
                onChange={(e) => setProduto({ ...produto, valor: Number(e.target.value) })}
                className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              />
              <input
                type="number"
                placeholder="Estoque"
                value={produto.estoque}
                onChange={(e) => setProduto({ ...produto, estoque: Number(e.target.value) })}
                className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              />
              <input
                type="date"
                placeholder="Data de Fabricação"
                value={produto.dt_fabrica}
                onChange={(e) => setProduto({ ...produto, dt_fabrica: e.target.value })}
                className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              />
              <input
                type="date"
                placeholder="Data de Validade"
                value={produto.dt_venci}
                onChange={(e) => setProduto({ ...produto, dt_venci: e.target.value })}
                className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              />
              <input
                type="text"
                placeholder="Marca"
                value={produto.marca}
                onChange={(e) => setProduto({ ...produto, marca: e.target.value })}
                className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              />
              <input
                type="text"
                placeholder="Unidade de Medida"
                value={produto.unidadeMedida}
                onChange={(e) => setProduto({ ...produto, unidadeMedida: e.target.value })}
                className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              />
              <input
                type="number"
                placeholder="Peso/Volume"
                value={produto.peso_volume}
                onChange={(e) => setProduto({ ...produto, peso_volume: Number(e.target.value) })}
                className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Atualizar Produto
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default EditarProdutoPage;
