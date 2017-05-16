import { Component } from '@angular/core';

import { NavParams , AlertController } from 'ionic-angular';

import { ServicesPage } from '../services/services';
import { TicketsPage } from '../tickets/tickets';
import { ClientService } from '../../providers/client';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = ServicesPage;
  tab2Root: any = TicketsPage;
  
  public usedServices = [];
  public countSelectedServices: number = 0;

	constructor(navParams: NavParams,private clientService: ClientService,private alertCtrl : AlertController) {

	}
	updateTicketsCount() {
		this.clientService.getTickets().subscribe(
			data => {
				let reservations = data.json();
				for(var k = 0;k < reservations.length;k++)
				if(reservations[k]['eTicket'] != null) {
					console.log(reservations[k]['service'].id);
					this.usedServices.push(reservations[k]['service'].id);
				}			
					this.countSelectedServices = this.usedServices.length;
			},
			err =>  { 
				console.error(err)
				this.showAlert();
			},
			() => console.log('getRepos completed')
		);
	}
	ionViewDidLoad() {
		this.updateTicketsCount();
	}
	showAlert() {
        let alert = this.alertCtrl.create({
            title: "Erreur!",
            subTitle: "Erreur lors de la connexion au serveur...\n",
            buttons: ["OK"]
        });
        alert.present();
    }	
}
