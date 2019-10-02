import { Component, OnInit, Input, Output, AfterViewInit, EventEmitter } from '@angular/core';
import * as $ from "jquery";
import { CardsComponent } from '../../graficos/cards/cards.component';
import { OutletContext } from '@angular/router';
@Component({
  selector: 'app-qd-select',
  templateUrl: './qd-select.component.html',
  styleUrls: ['./qd-select.component.scss']
})
export class QdSelectComponent extends CardsComponent implements OnInit {

  @Input() arrSelect: string[];
  @Output() retPlaceholder = new EventEmitter<string>();
  elementId: string;
  @Input() titulo: string;
  @Input() id: string;

  arrSelectAux: string[];
  placeholder: string;

  finalWidth: any
  ngOnInit() {
    //console.log(this.id)
    this.arrSelectAux = this.arrSelect;
    if (!this.titulo) {
      this.titulo = "Escolha uma opção";
      this.placeholder = "placeholder";
    } else {
      this.onUpdate();
    }

    this.elementId = `user_${this.id}`;
    this.retPlaceholder.emit(this.titulo);
  }

  clickSelect(id) {
    //console.log('click ' + id)
    var $drop = $("#" + id),
      prevActive = $("#" + id).attr("data-value"),
      options = $("#" + id).children.length;
    $drop.find(".option.active").addClass("mini-hack");
    $drop.toggleClass("visible");
    $drop.removeClass("withBG");
    $('#' + id).css("top");
    $drop.toggleClass("opacity");
    $(".mini-hack").removeClass("mini-hack");
    if ($drop.hasClass("visible")) {
      setTimeout(function () {
      }, 400 + options * 100);
    }

    if (prevActive === "placeholder") {
      $(".drop").removeClass("active");
      $('#' + id).addClass("active");
    }
  }

  selection(attr: string) {
    this.titulo = attr;
    this.retPlaceholder.emit(attr);
    this.onUpdate();
  }
  onUpdate() {
    this.arrSelect = Array.from(this.arrSelectAux);
    //console.log(this.arrSelect)
    for (var i = 0; i < this.arrSelect.length; i++) {
      //console.log(this.titulo)
      if (this.arrSelect[i] === this.titulo) {
        this.arrSelect.splice(i, 1);
      }
    }
  }

  openCloseSelect(index: string) {
    $(".drop")["children"][index]
  }
}