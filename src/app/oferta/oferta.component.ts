import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { CarrinhoService } from '../carrinho.service';
import { OfertasService } from '../oferta.service'
import { Oferta } from '../shared/oferta.model'

@Component({
    selector: 'app-oferta',
    templateUrl: './oferta.component.html',
    styleUrls: ['./oferta.component.scss'],
    providers: [OfertasService]
})
export class OfertaComponent implements OnInit {

    public oferta: Oferta

    constructor(
        private route: ActivatedRoute,
        private ofertasService: OfertasService,
        private carrinhoService: CarrinhoService
    ) { }

    ngOnInit(): void {

        this.route.params.subscribe((parametros: Params) => {
            this.ofertasService.getOfertaPorid(parametros.id)
                .then((oferta: Oferta) => {
                    this.oferta = oferta
                })
        })
    }

    public adicionarItemCarrinho(): void {
        this.carrinhoService.incluirItem(this.oferta)
    }
}
