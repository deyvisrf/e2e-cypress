export class PortalPage {

    url() {
        cy.visit('https://www.amazon.com.br/')
    }

    pesquisarProduto(textoPesquisa) {
        cy.get("#twotabsearchtextbox").type(textoPesquisa + "{enter}")
    }

    clicar(elemento) {
        cy.get(elemento).click()
    }

    textoEstaVisivel(texto) {
        cy.contains(texto).should("be.visible")
    }

    selecionarProduto(nomeProduto) {
        cy.contains(nomeProduto)
          .as('produto')
          .should("be.visible")
          .click()
    }

    addProdutoAoCarrinho() {
        cy.get('#add-to-cart-button').click()  
    }

    marcarCheckbox() {
        cy.get('#gift-wrap').check()
    }

    validarCheckboxMarcados(checkbox) {
        cy.get(checkbox).should("be.checked") 
    }

    pesquisarEadicionarNoCarrinho(textoPesquisar, textoProduto) {
        this.pesquisarProduto(textoPesquisar)
        this.selecionarProduto(textoProduto)
    }

    excluirItem() {
        cy.get('.sc-action-delete > .a-declarative > input').click()
        cy.get('#nav-cart-count').should('have.text', '0')
    }

    selecionarQuantidade(numero) {
        cy.get('#quantity').select(numero)
    }
}