import { Component, OnInit } from '@angular/core';
 import { ToastrManager } from 'ng6-toastr-notifications';
import { BlankLayoutCardComponent } from 'app/components/blank-layout-card';

@Component({
  selector: 'app-teste-toasrt',
  templateUrl: './teste-toasrt.component.html',
  styleUrls: ['./teste-toasrt.component.scss']
})
export class TesteToasrtComponent extends BlankLayoutCardComponent{

  constructor(public toastr: ToastrManager) {
    super();
  }
 
  showSuccess() {
      this.toastr.successToastr('This is success toast.', 'Success!');
  }

  showError() {
      this.toastr.errorToastr('This is error toast.', 'Oops!');
  }

  showWarning() {
      this.toastr.warningToastr('This is warning toast.', 'Alert!');
  }

  showInfo() {
      this.toastr.infoToastr('This is info toast.', 'Info');
  }

  showCustom() {
      this.toastr.customToastr(
      '<span style="color: green; font-size: 16px; text-align: center;">Custom Toast</span>',
      null,
      { enableHTML: true }
      );
  }

  showToast(position: any = 'top-left') {
      this.toastr.infoToastr('This is a toast.', 'Toast', {
          position: position
      });
  }

}
