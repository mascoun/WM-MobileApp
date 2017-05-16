import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';

import { SharedService } from '../providers/shared';
import { ClientService } from '../providers/client';

import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { ServicesPage } from '../pages/services/services';
import { TicketsPage } from '../pages/tickets/tickets';
import { TutorialPage } from '../pages/tutorial/tutorial';

import { TimerComponent } from '../pages/tickets/timer';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
	SignupPage,
	TabsPage,
	ServicesPage,
	TicketsPage,
	TutorialPage,
	TimerComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp), 
	IonicStorageModule.forRoot(),
	BrowserModule,
	HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	SignupPage,
	TabsPage,
	ServicesPage,
	TicketsPage,
	TutorialPage,
	TimerComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
	SharedService,
	ClientService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
