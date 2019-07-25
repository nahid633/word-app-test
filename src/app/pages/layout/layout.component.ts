import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  tab = 1;
  lang;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private translateService: TranslateService) {

  }

  ngOnInit() {
    this.getTab(this.router.url);
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.getTab(event.url);
      }
    });
    this.lang = this.translateService.currentLang;
  }

  getTab(url: string) {
    if (url === '/documentation') {
      this.tab = 2;
    } else if (url === '/websites') {
      this.tab = 1;
    }
  }
  /**
   * Changing language
   * @param lang : string
   */
  changeLanguage(lang: string) {
    this.translateService.use(lang);
    this.lang = lang;
    }
}
