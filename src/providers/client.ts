import {Injectable} from '@angular/core';  
import { Http, Headers, RequestOptions } from '@angular/http';
import {SharedService} from './shared';
import 'rxjs/Rx';

@Injectable()
export class ClientService {
	private client:any = {};
	
    constructor(private http: Http,private sharedService:SharedService) {
    }

    getClientFromToken() {
        let client = this.http.get(this.sharedService.url+`/client/token/`+this.client.tokenId);
        return client;
    }
	
	setTokenId(value) {
		this.client['tokenId'] = value;
	}

	getTokenId() {
		return this.client['tokenId'];
	}

	setClient(value) {
		this.client = value;
	}

	getClient() {
		return this.client;
	}
	
	addClient(client,successCallback,errorCallback) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		client['tokenId'] = this.getTokenId();
		return this.http.post(this.sharedService.url+`/client/add` , JSON.stringify(client) , options).toPromise().then(
		data => { 
			this.setClient(data.json());
			successCallback(data);
		}
		).catch(errorCallback);
	}
	
	getServices() {
		return this.http.get(this.sharedService.url+`/service`);
	}
	
	getTickets() {
		return this.http.get(this.sharedService.url+`/client/`+this.client.id+`/reservations`);
	}
	
	addReservation(id,successCallback,errorCallback) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(this.sharedService.url+`/reservation/save/`+ this.getClient().id + `/` + id , {} , options).toPromise().then(successCallback ).catch(errorCallback);
	}
	
	deleteTickets(id) {
		return this.http.delete(this.sharedService.url+`/eticket/delete/`+ id );
	}
}