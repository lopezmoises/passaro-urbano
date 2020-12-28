import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from 'src/app/oferta.service';

@Component({
    selector: 'app-onde-fica',
    templateUrl: './onde-fica.component.html',
    styleUrls: ['./onde-fica.component.scss'],
    providers: [OfertasService]
})
export class OndeFicaComponent implements OnInit {

    public ondeFica: string = ''

    constructor(
        private route: ActivatedRoute,
        private OfertasService: OfertasService
    ) { }

    ngOnInit(): void {
        this.OfertasService.getOndeFicaOfertaPorId(this.route.parent.snapshot.params['id'])
            .then((descricao: string) => {
                this.ondeFica = descricao
            })
    }

}
