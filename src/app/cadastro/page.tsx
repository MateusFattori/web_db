"use client";  // Certifica que este componente será renderizado no cliente

import { useState } from 'react';
import axios from 'axios'; // Importe o Axios
import Layout from '../components/Layout'; // Importa o Layout

const CadastroPage = () => {
  // Estado para controlar se é cadastro de cliente ou produto
  const [tipoCadastro, setTipoCadastro] = useState<'cliente' | 'produto'>('cliente');

  // Estado para armazenar os dados do formulário de cliente
  const [clienteForm, setClienteForm] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    senha: '',
    genero: '',
    dtNascimento: '',
    pontos: '',
    fidelidade: 'NÃO AFILIADO', // Alterado para string com valores 'FILIADO' e 'NÃO FILIADO'
  });

  // Estado para armazenar os dados do formulário de produto
  const [produtoForm, setProdutoForm] = useState({
    nome: '',
    categoria: '',
    valor: '',
    estoque: '',
    dt_venci: '',
    dt_fabrica: '',
    marca: '',
    unidadeMedida: '',
    peso_volume: '',
  });

  // Função para lidar com mudanças nos formulários
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, form: 'cliente' | 'produto') => {
    const { name, value } = e.target;
    if (form === 'cliente') {
      setClienteForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setProdutoForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Função para enviar o formulário de cliente
  const handleClienteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8082/clientes', clienteForm);
      console.log('Cliente cadastrado com sucesso:', response.data);
      resetClienteForm();
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
    }
  };

  // Função para enviar o formulário de produto
  const handleProdutoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8082/produtos', produtoForm);
      console.log('Produto cadastrado com sucesso:', response.data);
      resetProdutoForm();
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
    }
  };

  // Função para resetar o formulário de cliente
  const resetClienteForm = () => {
    setClienteForm({
      nome: '',
      cpf: '',
      telefone: '',
      email: '',
      senha: '',
      genero: '',
      dtNascimento: '',
      pontos: '',
      fidelidade: 'NÃO AFILIADO',
    });
  };

  // Função para resetar o formulário de produto
  const resetProdutoForm = () => {
    setProdutoForm({
      nome: '',
      categoria: '',
      valor: '',
      estoque: '',
      dt_venci: '',
      dt_fabrica: '',
      marca: '',
      unidadeMedida: '',
      peso_volume: '',
    });
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Cabeçalho */}
        <h1 className="text-2xl font-bold text-gray-800">
          Cadastro de {tipoCadastro === 'cliente' ? 'Cliente' : 'Produto'}
        </h1>

        {/* Switch entre Cliente e Produto */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setTipoCadastro('cliente')}
            className={`py-2 px-6 font-semibold rounded-md transition duration-300 ease-in-out ${tipoCadastro === 'cliente' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}
          >
            Cliente
          </button>
          <button
            onClick={() => setTipoCadastro('produto')}
            className={`py-2 px-6 font-semibold rounded-md transition duration-300 ease-in-out ${tipoCadastro === 'produto' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}
          >
            Produto
          </button>
        </div>

        {/* Formulário de Cliente */}
        {tipoCadastro === 'cliente' && (
          <form onSubmit={handleClienteSubmit} className="mt-6 space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                name="nome"
                value={clienteForm.nome}
                onChange={(e) => handleChange(e, 'cliente')}
                placeholder="Nome do Cliente"
                className="flex-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                required
              />
              <input
                type="text"
                name="cpf"
                value={clienteForm.cpf}
                onChange={(e) => handleChange(e, 'cliente')}
                placeholder="CPF"
                className="flex-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div className="flex space-x-4">
              <input
                type="text"
                name="telefone"
                value={clienteForm.telefone}
                onChange={(e) => handleChange(e, 'cliente')}
                placeholder="Telefone"
                className="flex-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                required
              />
              <input
                type="email"
                name="email"
                value={clienteForm.email}
                onChange={(e) => handleChange(e, 'cliente')}
                placeholder="Email"
                className="flex-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div className="flex space-x-4">
              <input
                type="password"
                name="senha"
                value={clienteForm.senha}
                onChange={(e) => handleChange(e, 'cliente')}
                placeholder="Senha"
                className="flex-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                required
              />
              <select
                name="genero"
                value={clienteForm.genero}
                onChange={(e) => handleChange(e, 'cliente')}
                className="flex-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                required
              >
                <option value="">Selecione o Gênero</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            <div className="flex space-x-4">
              <input
                type="date"
                name="dtNascimento"
                value={clienteForm.dtNascimento}
                onChange={(e) => handleChange(e, 'cliente')}
                className="flex-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                required
              />
              <input
                type="number"
                name="pontos"
                value={clienteForm.pontos}
                onChange={(e) => handleChange(e, 'cliente')}
                className="flex-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                placeholder="Pontos"
                min="0"
              />
            </div>
            <div className="flex space-x-4 items-center">
              <label className="flex-1">
                Fidelidade:
                <select
                  name="fidelidade"
                  value={clienteForm.fidelidade}
                  onChange={(e) => handleChange(e, 'cliente')}
                  className="ml-2 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                >
                  <option value="FILIADO">AFILIADO</option>
                  <option value="NÃO FILIADO">NÃO AFILIADO</option>
                </select>
              </label>
            </div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Cadastrar Cliente
            </button>
          </form>
        )}

        {/* Formulário de Produto */}
        {tipoCadastro === 'produto' && (
          <form onSubmit={handleProdutoSubmit} className="mt-6 space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                name="nome"
                value={produtoForm.nome}
                onChange={(e) => handleChange(e, 'produto')}
                placeholder="Nome do Produto"
                className="flex-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                required
              />
              <input
                type="text"
                name="categoria"
                value={produtoForm.categoria}
                onChange={(e) => handleChange(e, 'produto')}
                placeholder="Categoria"
                className="flex-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div className="flex space-x-4">
              <input
                type="number"
                name="valor"
                value={produtoForm.valor}
                onChange={(e) => handleChange(e, 'produto')}
                placeholder="Valor"
                className="flex-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                required
                min="0"
              />
              <input
                type="number"
                name="estoque"
                value={produtoForm.estoque}
                onChange={(e) => handleChange(e, 'produto')}
                placeholder="Estoque"
                className="flex-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                required
                min="0"
              />
            </div>
            <div className="flex space-x-4">
              <input
                type="date"
                name="dt_venci"
                value={produtoForm.dt_venci}
                onChange={(e) => handleChange(e, 'produto')}
                className="flex-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                required
              />
              <input
                type="date"
                name="dt_fabrica"
                value={produtoForm.dt_fabrica}
                onChange={(e) => handleChange(e, 'produto')}
                className="flex-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div className="flex space-x-4">
              <input
                type="text"
                name="marca"
                value={produtoForm.marca}
                onChange={(e) => handleChange(e, 'produto')}
                placeholder="Marca"
                className="flex-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                required
              />
              <input
                type="text"
                name="unidadeMedida"
                value={produtoForm.unidadeMedida}
                onChange={(e) => handleChange(e, 'produto')}
                placeholder="Unidade de Medida"
                className="flex-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div className="flex space-x-4">
              <input
                type="text"
                name="peso_volume"
                value={produtoForm.peso_volume}
                onChange={(e) => handleChange(e, 'produto')}
                placeholder="Peso/Volume"
                className="flex-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Cadastrar Produto
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default CadastroPage;
