const Redux = require ('redux')

//essa função é criadora de um tipo de ação
const criarContrato = (nome, taxa) => {
  //sse JSON que ela devolve é uma ação
  return {
    type: "CRIAR_CONTRATO",
    dados: {
      nome,
      taxa
    }
  }
}

//essa função é criadora de um tipo de ação
const cancelarContrato = (nome) => {
  //esse JSON que ela devolve é uma ação
  return{
    type: 'CANCELAR_CONTRATO',
    dados: {
      nome
    }
  }
}

//essa função é criadora de um tipo de ação
const solicitarCashback = (nome, valor) => {
  //esse JSON que ela devolve é uma ação
  return {
    type: 'CASHBACK',
    dados: {
      nome, valor
    }
  }
}

//esta função é um reducer
const historicoDePedidosdeCashback = (historicoDePedidosDeCashbackAtual = [], acao) => {
  if (acao.type === 'CASHBACK'){
    return [
      ...historicoDePedidosDeCashbackAtual,
      acao.dados
    ]
  }  
  return historicoDePedidosDeCashbackAtual
}

//esta função é um reducer
//caixa começa zerado
const caixa = (dinheiroEmCaixa = 1000, acao) => {
  if (acao.type === "CASHBACK"){
    dinheiroEmCaixa -= acao.dados.valor
  }
  else if (acao.type === "CRIAR_CONTRATO"){
    dinheiroEmCaixa += acao.dados.taxa
  }
  return dinheiroEmCaixa
}

//lista de contratos começa vazia
const contratos = (listaDeContratosAtual = [], acao) => {
  if (acao.type === "CRIAR_CONTRATO"){
    return [...listaDeContratosAtual, acao.dados]
  }
  if (acao.type === "CANCELAR_CONTRATO"){
    return listaDeContratosAtual.filter (c => c.nome !== acao.dados.nome)
  }
  return listaDeContratosAtual
}

const { createStore, combineReducers } = Redux

const todosOsReducers = combineReducers({
  historicoDePedidosdeCashback,
  caixa,
  contratos
})

const store = createStore (todosOsReducers)

console.log(store.getState())
const acaoContratoJose = criarContrato('José', 50)
store.dispatch(acaoContratoJose)
console.log(store.getState())
const acaoContratoMaria = criarContrato ('Maria', 50)
store.dispatch(acaoContratoMaria)
console.log(store.getState())
const acaoCashbackMaria = solicitarCashback('Maria', 10)
store.dispatch(acaoCashbackMaria)
console.log(store.getState())
const acaoCashbackJose = solicitarCashback('José', 20)
store.dispatch(acaoCashbackJose)
console.log(store.getState())
const acaoCancelarContratoMaria = cancelarContrato('Maria')
store.dispatch(acaoCancelarContratoMaria)
console.log(store.getState())
