import { Component } from '@angular/core';
import { App, NavController, NavParams , AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ClientService } from '../../providers/client';
import { TutorialPage } from '../tutorial/tutorial';
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

	signup: {firstname?: string, lastname?: string, birthday?: Date,adress? : string, phonenumber?: number} = {};
	submitted = false;

  
	constructor(public app:App, public navCtrl: NavController, public navParams: NavParams,private clientService:ClientService,public alertCtrl: AlertController) {}
	showAlert() {
        let alert = this.alertCtrl.create({
            title: "Erreur!",
            subTitle: "Verifier votre connexion internet...\n",
            buttons: ["OK"]
        });
        alert.present();
    }
	signupDone(res: Response) {
		
	}
	signupError(error: Response | any) {
		
	}
	onSignup(form: NgForm) {
		this.submitted = true;
		console.log(this.clientService.getTokenId());
		console.log(this.signup);
		if (form.valid) {
			console.log("valid form");
			this.clientService.addClient(this.signup,res => {
				let nav = this.app.getRootNav(); 
				nav.setRoot(TutorialPage);
			},error => {
				console.log(error);
				this.showAlert();
			});
		}
	}
}
