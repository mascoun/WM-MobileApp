import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ClientService } from '../../providers/client';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'page-tickets',
  templateUrl: 'tickets.html'
})

export class TicketsPage implements OnInit{
	
	@ViewChild('list') list;
	
	disables:boolean[] = [false, false, false];
	public tickets:any = [];
	
	constructor(public navCtrl: NavController, public navParams: NavParams, public clientService:ClientService) {
	}

	public rendreETicket(id:number,k:number,event:any) {
		var elem = event.target || event.srcElement || event.currentTarget;
		elem.setAttribute('disabled',true);
		this.disables[k] = true;
		this.clientService.deleteTickets(id).subscribe(
			data => {
				let obj = this.list.nativeElement.children[k];
				let counter = Observable.interval(25).map((x) => x + 1);
				let subscriber = counter.subscribe(
				(x) => {
					obj.style['opacity'] = (100 - (x * 5)) / 100;
					if( (100 - (x * 5)) == 0 ) {
						subscriber.unsubscribe();
						obj.style['display'] = 'none';
					}
				}
				);
				console.log(obj);
				console.log(data);
			},
			err => {
				console.log("error");
			}
		);
	}
	ionViewDidLoad() {
		this.ngOnInit();
	}
	ngOnInit() {
	  this.clientService.getTickets().subscribe(
			data => {
					console.log(this.clientService.getClient());
					console.log(data);
					let reservations = data.json();
					var m = 0;
					for(var k = 0;k < reservations.length;k++)
						if(reservations[k]['eTicket'] != null) {
							this.tickets[m] = {};
							this.tickets[m]['eTicket'] = reservations[k]['eTicket'];
							this.tickets[m]['service'] = reservations[k]['service'];
							//let time = Date.parse("T" + );
							//console.log(time);
							//this.tickets[m]['timeleft'] = reservations[k]['eTicket']['timeleft'];
							m++;
						}
					console.log(this.tickets);
			},
			err => console.error(err),
			() => console.log('getRepos completed')
		);
		
			
	}
	ionViewWillEnter() {
		this.ngOnInit();
	}
}
