/// <reference types="cypress" />

import { PortalPage } from "../page-objects/portal-page"

describe("Testes em um grande portal de comércio online", () => {

  const portalpage = new PortalPage

  const txtPesquisa = 'Fifa 20 ps4'
  const txtProduto = 'FIFA 20 - Edição Padrão - PlayStation 4'
  const btCarrinho = '#hlb-view-cart-announce'
  const checkbox = '#huc-v2-order-row-mark-gift > .a-checkbox > label > input'
 
    beforeEach(() => {
      portalpage.url()
      portalpage.pesquisarProduto(txtPesquisa)
      portalpage.selecionarProduto(txtProduto)
    })

    it("Adicionar e validar um produto no carrinho de compras", () => {
      portalpage.addProdutoAoCarrinho()
      portalpage.textoEstaVisivel('Adicionado ao carrinho')
      portalpage.textoEstaVisivel('Subtotal do carrinho (1 item):')
    })

    it("Marcar um produco como 'Presente' e adiciona-lo ao carrinho de compras", () => {
      portalpage.marcarCheckbox()
      portalpage.addProdutoAoCarrinho()
      portalpage.validarCheckboxMarcados(checkbox)
    })

    it("Ver alerta quando o mesmo produdo é adicionado duas vezes ao carrinho", () => {
      portalpage.addProdutoAoCarrinho()
      portalpage.pesquisarEadicionarNoCarrinho(txtPesquisa,txtProduto)
      portalpage.addProdutoAoCarrinho()
      portalpage.textoEstaVisivel('Este item já está no seu Carrinho. Caso não queira comprar todos, edite seu carrinho.')
      portalpage.textoEstaVisivel('Subtotal do carrinho (2 itens):')
    })

    it("Adicionar e exluir um produto do carrinho de compras", () => {
      portalpage.addProdutoAoCarrinho()
      portalpage.clicar(btCarrinho)
      portalpage.excluirItem()
    })

    it("Ver alerta de limite de compra de 3 unidades por cliente", () => {
      portalpage.addProdutoAoCarrinho()
      portalpage.pesquisarEadicionarNoCarrinho(txtPesquisa,txtProduto)
      portalpage.selecionarQuantidade("3")
      portalpage.addProdutoAoCarrinho()
      portalpage.textoEstaVisivel('Não adicionado')
      portalpage.textoEstaVisivel('Houve um problema ao adicionar este item ao carrinho.')
    })
})
