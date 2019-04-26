import { Component, OnInit, Input, Output, AfterViewInit, EventEmitter } from '@angular/core';
import * as $ from "jquery";
import { OutletContext } from '@angular/router';
@Component({
  selector: 'app-qd-select',
  templateUrl: './qd-select.component.html',
  styleUrls: ['./qd-select.component.scss']
})
export class QdSelectComponent implements OnInit {

  @Input() arrSelect: string[];
  @Output() retPlaceholder = new EventEmitter<string>();;
  @Input() titulo: string;

  arrSelectAux: string[];
  placeholder: string;

  constructor() { }
  finalWidth: any
  ngOnInit() {
    this.arrSelectAux = this.arrSelect;
    if (!this.titulo){
      this.titulo = "Escolha uma opção";
      this.placeholder = "placeholder";
    } else {
      this.onUpdate();
    }
    
    $(".drop").click(function(){
      var val = $(this).attr("data-value"),
        $drop = $(".drop"),
        prevActive = $(".drop .option.active").attr("data-value"),
        options = $(".drop .option").length;
      $drop.find(".option.active").addClass("mini-hack");
      $drop.toggleClass("visible");
      $drop.removeClass("withBG");
      $(this).css("top");
      $drop.toggleClass("opacity");
      $(".mini-hack").removeClass("mini-hack");
      if ($drop.hasClass("visible")) {
        setTimeout(function () {
        }, 400 + options * 100);
      }

      if (val !== "placeholder" || prevActive === "placeholder") {
        $(".drop").removeClass("active");
        $(this).addClass("active");
      }
    })
  }
  selection(attr: string){
    this.titulo = attr;
    this.retPlaceholder.emit(attr);
    this.onUpdate();
  }
  onUpdate(){
    this.arrSelect = Array.from(this.arrSelectAux);
    for( var i = 0; i < this.arrSelect.length; i++){ 
      if ( this.arrSelect[i] === this.titulo) {
        this.arrSelect.splice(i, 1); 
      }
   }
  }

  openCloseSelect(index:string){
    $(".drop")["children"][index]
  }
  }