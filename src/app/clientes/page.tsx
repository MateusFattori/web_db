"use client"; // Certifica que este componente será renderizado no cliente

import { useState, useEffect } from 'react';
import axios from 'axios'; // Importando o Axios para fazer a requisição
import Layout from '../components/Layout'; // Certifique-se de ajustar o caminho para o layout

interface Cliente {
  id: string; // Adicionado id
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  genero: string; // Alterado para genero
  dt_nascimento: string; // Atualizado para dt_nascimento
  pontos: number;
  fidelidade: string;
  ativo: string; // Adicionado ativo
}

const ClientesPage = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar os clientes da API
  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:8082/clientes');
      setClientes(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao buscar clientes da API');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes(); // Faz a requisição quando o componente é montado
  }, []);

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Olá Mateus, <br />
          <span className="text-lg text-gray-600">Bem-vindo a seus clientes 👋</span>
        </h1>

        {loading ? (
          <p className="mt-4 text-gray-500">Carregando clientes...</p>
        ) : error ? (
          <p className="mt-4 text-red-600">{error}</p>
        ) : (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-blue-600">Todos os Clientes</h2>
            <div className="flex justify-between mt-4">
              <input type="text" placeholder="Pesquisar..." className="px-4 py-2 border rounded-md" />
              <select className="border px-4 py-2 rounded-md">
                <option>Filtrar por: Recente</option>
                <option>Filtrar por: Antigo</option>
              </select>
            </div>

            <table className="min-w-full mt-4 bg-white border border-gray-200 rounded-md shadow-md">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-500">Nome de Cliente</th>
                  <th className="px-4 py-2 text-left text-gray-500">CPF</th>
                  <th className="px-4 py-2 text-left text-gray-500">Email</th>
                  <th className="px-4 py-2 text-left text-gray-500">Telefone</th>
                  <th className="px-4 py-2 text-left text-gray-500">Gênero</th>
                  <th className="px-4 py-2 text-left text-gray-500">Nasc.</th>
                  <th className="px-4 py-2 text-left text-gray-500">Pontos</th>
                  <th className="px-4 py-2 text-left text-gray-500">Fidelidade</th>
                  <th className="px-4 py-2 text-left text-gray-500">Ativo</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((cliente) => (
                  <tr key={cliente.id} className="border-t hover:bg-gray-100 transition">
                    <td className="px-4 py-2">{cliente.nome}</td>
                    <td className="px-4 py-2">{cliente.cpf}</td>
                    <td className="px-4 py-2">{cliente.email}</td>
                    <td className="px-4 py-2">{cliente.telefone}</td>
                    <td className="px-4 py-2">{cliente.genero}</td>
                    <td className="px-4 py-2">{cliente.dt_nascimento}</td>
                    <td className="px-4 py-2">{cliente.pontos}</td>
                    <td className="px-4 py-2">{cliente.fidelidade}</td>
                    <td className="px-4 py-2">{cliente.ativo === 'Sim' ? 'Sim' : 'Não'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ClientesPage;
