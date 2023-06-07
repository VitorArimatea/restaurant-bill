import React, { useState } from 'react';

type Cliente = {
  nome: string;
  valorPessoa: number;
  incluirGorjeta: boolean;
};

type Produto = {
  nome: string;
  valor: string;
};

const Calculator: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [resultado, setResultado] = useState<Cliente[]>([]);

  const adicionarCliente = () => {
    setClientes([...clientes, { nome: '', valorPessoa: 0, incluirGorjeta: false }]);
  };

  const adicionarProduto = () => {
    setProdutos([...produtos, { nome: '', valor: '0' }]);
  };

  const atualizarNomeCliente = (index: number, nome: string) => {
    const novosClientes = [...clientes];
    novosClientes[index].nome = nome;
    setClientes(novosClientes);
  };

  const atualizarIncluirGorjeta = (index: number, incluirGorjeta: boolean) => {
    const novosClientes = [...clientes];
    novosClientes[index].incluirGorjeta = incluirGorjeta;
    setClientes(novosClientes);
  };

  const calcularDivisaoConta = () => {
    if (clientes.length === 0 || produtos.length === 0) {
      return;
    }

    const totalClientes = clientes.length;

    const valorTotal = produtos.reduce((total, produto) => {
      return total + parseFloat(produto.valor);
    }, 0);

    const taxaServico = 0.1; // 10% de taxa de serviço

    const resultadoCalculo = clientes.map((cliente) => {
      const valorPessoa = (valorTotal / totalClientes) + ((valorTotal / totalClientes) * taxaServico);
      return { ...cliente, valorPessoa };
    });

    setResultado(resultadoCalculo);
  };

  return (
    <div className='app'>
      <h1>Divisor de conta de restaurante</h1>
      <hr />
      <h2>Clientes</h2>
      {clientes.map((cliente, index) => (
        <div key={index}>
          <input
            type="text"
            value={cliente.nome}
            onChange={(event) => atualizarNomeCliente(index, event.target.value)}
            placeholder="Nome do cliente"
          />
          <div>
            <label>
              <input
                type="checkbox"
                checked={cliente.incluirGorjeta}
                onChange={() => atualizarIncluirGorjeta(index, !cliente.incluirGorjeta)}
              />
              Incluir gorjeta
            </label>
          </div>
        </div>
      ))}
      <button onClick={adicionarCliente}>Adicionar Cliente</button>

      <h2>Produtos</h2>
      {produtos.map((produto, index) => (
        <div key={index}>
          <input
            type="text"
            value={produto.nome}
            onChange={(event) =>
              setProdutos([...produtos.slice(0, index), { ...produto, nome: event.target.value }, ...produtos.slice(index + 1)])
            }
            placeholder="Nome do produto"
          />
          <input
            type="text"
            value={produto.valor}
            onChange={(event) =>
              setProdutos([...produtos.slice(0, index), { ...produto, valor: event.target.value }, ...produtos.slice(index + 1)])
            }
            placeholder="Valor do produto"
          />
        </div>
      ))}
      <button onClick={adicionarProduto}>Adicionar Produto</button>

      <button onClick={calcularDivisaoConta}>Calcular</button>

      <h2>Resultado</h2>
      {resultado.map((cliente, index) => (
        <div key={index}>
          <p>{cliente.nome}: R$ {cliente.valorPessoa.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default Calculator;
