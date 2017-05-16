import { Component } from "@angular/core";  
import { Platform , App, NavController, NavParams , LoadingController, AlertController } from 'ionic-angular';
import { ClientService } from '../../providers/client';
import { SignupPage } from '../signup/signup'
import { TabsPage } from '../tabs/tabs'

declare var FCMPlugin;	
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {  
	public client;
	public tokenId;
	public loader;
	
    constructor(public platform: Platform, public navCtrl: NavController,public navParams: NavParams,public appCtrl: App,private clientService: ClientService,public loadingCtrl: LoadingController,public alertCtrl: AlertController) {
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
            subTitle: "Verifier votre connexion internet...\n",
            buttons: ["OK"]
        });
        alert.present();
    }
	setupNotification() {
		FCMPlugin.onNotification(
			(data) => {
				let alert = this.alertCtrl.create({
					title: "Notification!",
					subTitle: data,
					buttons: ["OK"]
				});
				alert.present();
			},
			(e) => {
				console.log(e);
			}
		)
	}
    getClient() {
		console.log("Getting Client Infos");
        this.clientService.getClientFromToken().subscribe(
            data => {
				this.client = data.json();
				this.setupNotification();
				if(Object.keys(this.client).length === 0) {
					this.navCtrl.setRoot(SignupPage);
				}else {
					this.clientService.setClient(this.client);
					this.navCtrl.setRoot(TabsPage);
				}
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
					self.clientService.setTokenId(token);
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