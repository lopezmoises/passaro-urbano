import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
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

    constructor(private route: ActivatedRoute, private ofertasService: OfertasService) { }

    ngOnInit(): void {
        this.ofertasService.getOfertaPorid(this.route.snapshot.params['id'])
            .then((oferta: Oferta) => {
                this.oferta = oferta
                console.log(oferta)
            })
            .catch((param: any) => {
                console.log(param)
            })
    }

}
