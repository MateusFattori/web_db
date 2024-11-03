"use client"; // Certifica que o componente será renderizado no cliente

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Layout from "../../components/Layout"; // Ajuste o caminho do layout conforme necessário

interface Cliente {
  id: string; // ID como String para corresponder ao tipo no modelo
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  genero: string;
  dt_nascimento: string; // Pode ser tratado como uma data
  pontos: number;
  fidelidade: string; // Pode ser "FILIADO" ou "NÃO FILIADO"
  ativo: string; // Novo campo
}

const EditarClientePage = () => {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  // Função para buscar os dados do cliente com base no ID da URL
  const fetchCliente = async () => {
    try {
      const response = await axios.get(`http://localhost:8082/clientes/${id}`);
      setCliente(response.data);
    } catch (err) {
      setError("Erro ao buscar os dados do cliente");
    } finally {
      setLoading(false);
    }
  };

  // Função para enviar as alterações do cliente para a API
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cliente) return;

    try {
      await axios.put(`http://localhost:8082/clientes/${id}`, cliente);
      alert("Cliente atualizado com sucesso");
      router.push("/editar"); // Redireciona para a lista de clientes
    } catch (err) {
      setError("Erro ao atualizar o cliente");
    }
  };

  useEffect(() => {
    if (id) {
      fetchCliente();
    }
  }, [id]);

  if (loading) {
    return <p>Carregando dados do cliente...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800">Editar Cliente</h1>

        {cliente && (
          <form onSubmit={handleUpdate} className="mt-8">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nome"
                value={cliente.nome}
                onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
                className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              />
              <input
                type="text"
                placeholder="CPF"
                value={cliente.cpf}
                onChange={(e) => setCliente({ ...cliente, cpf: e.target.value })}
                className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              />
              <input
                type="email"
                placeholder="Email"
                value={cliente.email}
                onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
                className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              />
              <input
                type="text"
                placeholder="Telefone"
                value={cliente.telefone}
                onChange={(e) => setCliente({ ...cliente, telefone: e.target.value })}
                className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              />
              <select
                value={cliente.genero}
                onChange={(e) => setCliente({ ...cliente, genero: e.target.value })}
                className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              >
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Não-binário">Não-binário</option>
              </select>
              <input
                type="date"
                value={cliente.dt_nascimento}
                onChange={(e) => setCliente({ ...cliente, dt_nascimento: e.target.value })}
                className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              />
              <input
                type="number"
                placeholder="Pontos"
                value={cliente.pontos}
                onChange={(e) => setCliente({ ...cliente, pontos: Number(e.target.value) })}
                className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              />
              <select
                value={cliente.fidelidade}
                onChange={(e) => setCliente({ ...cliente, fidelidade: e.target.value })}
                className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              >
                <option value="FILIADO">FILIADO</option>
                <option value="NÃO FILIADO">NÃO FILIADO</option>
              </select>
              <select
                value={cliente.ativo}
                onChange={(e) => setCliente({ ...cliente, ativo: e.target.value })}
                className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              >
                <option value="SIM">SIM</option>
                <option value="NÃO">NÃO</option>
              </select>
            </div>

            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Atualizar Cliente
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default EditarClientePage;
