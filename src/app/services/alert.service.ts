import { Injectable } from '@angular/core';
import swal, { SweetAlertType } from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  translations = [];
  constructor(private translateService: TranslateService) {
    this.translateService.get(['btn.cancel', 'btn.confirm']).subscribe(res => {
      this.translations = res;
    });
  }

  showAlert(title: string, msg: string, status: SweetAlertType) {
    swal(title, msg, status);
  }


  confirm(title: string, msg: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      swal({
        title: title,
        text: msg,
        type: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#24a933',
        confirmButtonText: this.translations['btn.confirm'],
        cancelButtonText: this.translations['btn.cancel']
      }).then((result) => {
        if (result.value) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  }

}
