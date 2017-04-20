import { Component } from "@angular/core";  
import { Platform } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';
import { ClientService } from '../../services/client';

declare var FCMPlugin;	
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [ClientService]
})
export class HomePage {  
	public client;
	public tokenId;
	public loader;
    constructor(public platform: Platform,private clientService: ClientService,public loadingCtrl: LoadingController,public alertCtrl: AlertController) {

	}
	ngOnInit(): void {
		this.platform.ready().then(() => {
			this.getTheToken();
		});
	}
	presentLoading() {
		this.loader = this.loadingCtrl.create({
		  content: "Please wait..."
		});
		this.loader.present();
	}
	showAlert() {
        let alert = this.alertCtrl.create({
            title: "Erreur!",
            subTitle: "Oh mince ! Quelque chose s'est mal passé...\n",
            buttons: ["OK"]
        });
        alert.present();
    }
    getClient() {
		console.log("Getting Client Infos");
        this.clientService.getClientFromToken(this.tokenId).subscribe(
            data => {
				this.client = data.json();
				console.log(this.client);
            },
            err => {
				this.loader.dismiss();
				this.showAlert();
				console.error(err);
			},
            () => {
				this.loader.dismiss();
				console.log('getRepos completed');
			}
        );
    }
	
	getTheToken() {
		var self = this;
		FCMPlugin.getToken(
			(token) => {
				if (token == null) {
					console.log("null token");
				} else {
					this.tokenId = token;
					console.log("I got the token: " + this.tokenId);
					self.presentLoading();
					self.getClient();
				}
			},
			(err) => {
				console.log('error retrieving token: ' + err);
			}
		);
	}
}