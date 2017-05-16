import {Injectable} from '@angular/core';  

@Injectable()
export class SharedService {
	url:string;
  
	constructor() {
		this.url = "http://127.0.0.1:8080/wait-management";
	}
	
}