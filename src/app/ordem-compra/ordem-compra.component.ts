import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarrinhoService } from '../carrinho.service';
import { OrdemCompraService } from '../ordem-compra.service'
import { ItemCarrinho } from '../shared/item-carrinho.model';
import { Pedido } from '../shared/pedido.model'

@Component({
    selector: 'app-ordem-compra',
    templateUrl: './ordem-compra.component.html',
    styleUrls: ['./ordem-compra.component.scss'],
    providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

    public idPedidoCompra: number = undefined
    public itensCarrinho: ItemCarrinho[] = []

    public formulario: FormGroup = new FormGroup({
        'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
        'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
        'complemento': new FormControl(null),
        'formaPagamento': new FormControl("", [Validators.required])
    })

    constructor(
        private ordemCompraService: OrdemCompraService,
        public carrinhoService: CarrinhoService
    ) { }

    ngOnInit() {
        this.itensCarrinho = this.carrinhoService.exibirItens()
        console.log(this.itensCarrinho)
    }

    public confirmarCompra(): void {
        if (this.formulario.status === 'INVALID') {
            this.formulario.markAllAsTouched()
        } else {

            if (this.carrinhoService.exibirItens().length === 0) {
                alert("Carrinho vazio")
            } else {

                let pedido = new Pedido(
                    this.formulario.value.endereco,
                    this.formulario.value.numero,
                    this.formulario.value.complemento,
                    this.formulario.value.formaPagamento,
                    this.carrinhoService.exibirItens()
                )
                this.ordemCompraService.efetivarCompra(pedido)
                    .subscribe((idPedido: any) => {
                        this.idPedidoCompra = idPedido
                        this.carrinhoService.limparCarrinho()
                    })
            }
        }
    }

    public adicionar(item: ItemCarrinho): void {
        this.carrinhoService.adicionarQuantidade(item)
    }

    public disminuir(item: ItemCarrinho): void {
        this.carrinhoService.disminuirQuantidade(item)
    }
}
