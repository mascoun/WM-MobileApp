import {Injectable} from '@angular/core';  
import {Http} from '@angular/http';

@Injectable()
export class ClientService {  
    constructor(private http: Http) {
    }

    getClientFromToken(tokenId) {
        let client = this.http.get(`http://127.0.0.1:8080/wait-management/client/${tokenId}`);
        return client;
    }
}