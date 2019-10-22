import { CardsComponent } from './cards.component';
import { ElementRef } from '@angular/core';

export class GetParent {

  static getParentComponent(el): CardsComponent {
    return el.viewContainerRef['_data'].componentView.component.viewContainerRef['_view'].component
  }

  static addObserverToFilter(el){
    this.getParentComponent(el).addObserver(el);
  }
}