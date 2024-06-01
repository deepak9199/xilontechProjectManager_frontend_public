import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserSharingService {
  private bucket: any;
  private userStorage;
  constructor() {
    this.userStorage = 'Logout'

  }

  postCrossDomainMessage(link: any, portal = 'student') {
    let postURL: any;
    let iframeId: any;
    if (portal == 'student') {
      postURL = environment.XilontechProjectManager;
      iframeId = 'student-ifr';
    }

    const iframe = document.getElementById(iframeId);
    console.log(iframe);
    if (iframe == null) { return; }
    const iWindow = (iframe as HTMLIFrameElement).contentWindow;
    const storageData = this.userStorage;
    console.log(storageData);
    setTimeout(function () {
      iWindow?.postMessage(storageData, environment.xilontechPortal);
    }, 1000);
    
  }
}
