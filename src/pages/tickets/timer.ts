import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AlertController  } from 'ionic-angular';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
    selector: 'timer',
    template: `
  <p>
    Temps restant: {{message}}
  </p>
`
})
export class TimerComponent implements OnInit, OnDestroy {
	@Input() inputTime:string;
    private diff: number;
    private $counter: Observable<number>;
    private subscription: Subscription;
    private message: string;

    constructor(private alertCtrl : AlertController) {
    }

    dhms(t) {
        var hours, minutes, seconds;
        hours = Math.floor(t / 3600);
        t -= hours * 3600;
        minutes = Math.floor(t / 60) % 60;
        t -= minutes * 60;
        seconds = t % 60;

        return [
            hours + 'h',
            minutes + 'm',
            seconds + 's'
        ].join(' ');
    }

	ngOnInit() {
		let str:string = this.inputTime;
		//str = "T" + str + "Z";
		let time = str.split(":");
		
		this.diff = Number(time[0])*3600+Number(time[1])*60+Number(time[2]);
		this.$counter = Observable.interval(1000).map((x) => {
			if(this.diff != 0)
				this.diff -= x;
            return x;
        });

        this.subscription = this.$counter.subscribe((x) => this.message = this.dhms(this.diff));
	}

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
	showAlert(message) {
        let alert = this.alertCtrl.create({
            title: "Erreur!",
            subTitle: message,
            buttons: ["OK"]
        });
        alert.present();
    }
}