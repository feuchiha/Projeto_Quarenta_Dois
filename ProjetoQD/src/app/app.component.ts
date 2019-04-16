import { Component } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {

  constructor(public toastr: ToastrManager) {
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
