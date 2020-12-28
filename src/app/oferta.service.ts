import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Oferta } from './shared/oferta.model'

import { URL_API } from './app.api'

@Injectable()
export class OfertasService {

    //private url_api = 'http://localhost:3000/ofertas'

    constructor(private http: HttpClient) { }

    public getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta: any) => resposta) //resposta.json() Angular4
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
            .toPromise()
            .then((resposta: any) => resposta)
    }

    public getOfertaPorid(id: number): Promise<Oferta> {
        return this.http.get(`${URL_API}/ofertas?id=${id}`)
            .toPromise()
            .then((resposta: any) => resposta[0])
    }

    public getComoUsarOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API}/como-usar?id=${id}`)
            .toPromise()
            .then((resposta: any) => resposta[0].descricao)
    }
    
    public getOndeFicaOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API}/onde-fica?id=${id}`)
            .toPromise()
            .then((resposta: any) => resposta[0].descricao)
    }

    // public getOfertas2(): Promise<Oferta[]> {
    //     return new Promise((resolve, reject) => {

    //         let deu_certo = true
    //         if (deu_certo) {
    //             setTimeout(() => resolve(this.ofertas), 3000)
    //         } else {
    //             reject({ codigo_erro: 404, mensagem_erro: 'Servidor nao encontrado' })
    //         }
    //     })
    //         .then((ofertas: Oferta[]) => {
    //             console.log('primeiro then')
    //             return ofertas
    //         })
    // }
}