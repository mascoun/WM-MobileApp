import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController  } from 'ionic-angular';
import { ClientService } from '../../providers/client';


@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage implements OnInit {
	public services;
	public usedServices = [];
	disables:boolean[] = [false, false, false];
	constructor(public navCtrl: NavController, public navParams: NavParams,private clientService: ClientService,private alertCtrl : AlertController, private toastCtrl: ToastController) {
		
	}
	ngOnInit() {
		 this.clientService.getServices().subscribe(
			data => {
				console.log(data);
				this.services = data.json();
				console.log(this.services);
			},
			err => {
				console.error(err);
				this.showAlert();
			},
			() => console.log('getRepos completed')
		);
		this.clientService.getTickets().subscribe(
			data => {
				let reservations = data.json();
				for(var k = 0;k < reservations.length;k++)
					if(reservations[k]['eTicket'] != null) {
						this.usedServices.push(reservations[k]['service'].id);
					}
			},
			err =>  { 
				console.error(err)
				this.showAlert();
			},
			() => console.log('getRepos completed')
		);
	}
	ionViewDidLoad() {
		this.ngOnInit();
	}
	ionViewWillEnter() {
		this.ngOnInit();
	}
	reserve(id:number,event:any,k:number) {
		var elem = event.target || event.srcElement || event.currentTarget;
		elem.setAttribute('disabled',true);
		this.disables[k] = true;
		this.showToast("Obtention d'un E-Ticket")
		this.clientService.addReservation(id,res => {
			this.showToast("E-Ticket obtenu");
		},error => {
			this.showAlert();
			elem.removeAttribute('disabled');
		});
	}
	showAlert() {
        let alert = this.alertCtrl.create({
            title: "Erreur!",
            subTitle: "Erreur lors de la connexion au serveur...\n",
            buttons: ["OK"]
        });
        alert.present();
    }
	showToast(msg) {
		let toast = this.toastCtrl.create({
		  message: msg,
		  duration: 3000,
		  position: 'middle',
		  dismissOnPageChange: true
		});

		toast.onDidDismiss(() => {
		  console.log('Dismissed toast');
		});

		toast.present();
	}
	public exists(elem):boolean {
		for(var k = 0;k < this.usedServices.length;k++)
				if(this.usedServices[k] == elem) return true;
		false;
	}
}
