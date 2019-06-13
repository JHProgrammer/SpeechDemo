import { Component,ChangeDetectorRef } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public query;
  public appPages;

  
  public items: any = [];
  matches: String[];
  isRecording = false;
  bgcolor: string = "white";
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private speechRecognition: SpeechRecognition,
    private plt: Platform,
    private cd: ChangeDetectorRef
  ) {
    this.initializeApp();
    this.initializaItems();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initializaItems(){
    this.appPages = [
      {
        title: 'Home',
        url: '/home',
        icon: 'home'
      },
      {
        title: 'List',
        url: '/list',
        icon: 'list'
      },
      {
        title: 'Papa Amarilla',
        url: '/papaAmarilla',
        icon: 'list'
      },
      {
        title: 'Papa Huairo',
        url: '/papaHuairo',
        icon: 'list'
      },
      {
        title: 'Papa Negra',
        url: '/papaNegra',
        icon: 'list'
      }
    ];
  }


getItems(ev) {
    // Reset items back to all of the items
    // set val to the value of the ev target
    this.initializaItems();
    var val = ev.target.value;


    if (val && val.trim() != '') {
      this.appPages= this.appPages.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.appPages= this.appPages.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  isIos() {
    return this.plt.is('ios');
  }

  stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false;
    });
  }

  getPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      });
  }

  startListening() {
    let options = {
      language: 'en-US'
    }
    this.speechRecognition.startListening().subscribe(matches => {
      this.matches = matches;
      this.cd.detectChanges();
    });
    this.isRecording = true;
  }
}
