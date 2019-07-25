import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {RestapiService} from '../../services/restapi.service';
import {takeUntil} from 'rxjs/operators';
import {Item} from '../../entities/item';
import {ClrDatagridSortOrder} from '@clr/angular';
import * as moment from 'moment';
import {AlertService} from '../../services/alert.service';
import {ExcelService} from '../../services/excel.service';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.scss']
})
export class WebsitesComponent implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any>;
  items: Item[];
  itemsCopy: Item[];
  columnHide = {
    url: false,
    latest_content: false,
    frequency: false,
    visitors: false,
    pageviews: false,
    referring: false,
    outbound: false,
    projects: false,
    templates: false,
  };
  descSort = ClrDatagridSortOrder.DESC;
  rowSelected  = [];
  translations  = [];
  constructor(
    private service: RestapiService,
    private alertService: AlertService,
    private excelService: ExcelService,
    private translateService: TranslateService) {
    this.unsubscribeAll = new Subject();
    this.translateService.get(['app.success_export', 'app.success_remove', 'app.success', 'app.error']).subscribe(res => {
      this.translations = res;
    });
  }

  ngOnInit() {
    if (localStorage.getItem('userConfig')) {
      this.columnHide = JSON.parse(localStorage.getItem('userConfig'));
    }
    this.service.getWebsites()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(res => {
        const today = moment();
        res.items.forEach(item => {
          item.analytics.last_updated_post.days_ago =
            today.diff(moment(item.analytics.last_updated_post.post_date, 'YYYY-MM-DDTHH:mm:SS'), 'days');
          item.analytics.frequency.post_per_month = Math.round(31 * item.analytics.frequency.post_per_day);
          item.analytics.referring_domains_length = item.analytics.referring_domains ? item.analytics.referring_domains.length : 0;
          item.analytics.outbound_links_length = item.analytics.outbound_links ? item.analytics.outbound_links.length : 0;
          item.analytics.visits = item.analytics.visits ? item.analytics.visits : 0;
          item.analytics.pageviews = item.analytics.pageviews ? item.analytics.pageviews : 0;
        });
        this.items = res.items;
        this.itemsCopy = res.items;
      });
  }

  /**
   * helper for getting keys in array.
   * @param object
   */
  objectKeys(object) {
    return Object.keys(object);
  }

  /**
   * Remove data selected at least one row.
   */
  onDelete() {
    this.rowSelected.forEach(selectedItem => {
      const index = this.items.indexOf(selectedItem);
      if (index !== -1) {
        this.items.splice(index, 1);
        this.itemsCopy.splice(index, 1);
      } else {
        this.alertService.showAlert(this.translations['app.error'], this.translations['app.error_remove'], 'error');
      }
      this.rowSelected = [];
      this.alertService.showAlert(this.translations['app.success'], this.translations['app.success_remove'], 'success');
    });
  }

  /**
   * Export selected data to Excel.if not selected All the data.
   */
  onExport() {
    if (this.rowSelected.length) {
      this.excelService.exportAsExcelFile(this.rowSelected, 'websites');
      this.alertService.showAlert(this.translations['app.success'], this.translations['app.success_export'], 'success');
    } else {
      this.excelService.exportAsExcelFile(this.items, 'websites');
      this.alertService.showAlert(this.translations['app.success'], this.translations['app.success_export'], 'success');
    }
  }
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    localStorage.setItem('userConfig', JSON.stringify(this.columnHide));
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
