import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from 'src/app/oferta.service';

@Component({
    selector: 'app-como-usar',
    templateUrl: './como-usar.component.html',
    styleUrls: ['./como-usar.component.scss'],
    providers: [OfertasService]
})
export class ComoUsarComponent implements OnInit {

    public comoUsar: string = ''

    constructor(
        private route: ActivatedRoute,
        private OfertasService: OfertasService
    ) { }

    ngOnInit(): void {
        this.OfertasService.getComoUsarOfertaPorId(this.route.parent.snapshot.params['id'])
            .then((descricao: string) => {
                this.comoUsar = descricao
            })
    }

}
