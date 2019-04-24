import { Component, OnInit } from '@angular/core';

import {BlankLayoutCardComponent} from 'app/components/blank-layout-card';




@Component({
  selector: 'app-importacao',
  templateUrl: './importacao.component.html',
  styleUrls: ['/importacao.component.css']
})
export class ImportacaoComponent extends BlankLayoutCardComponent implements OnInit{

  arrSelect: string[];
  ngOnInit() {
    this.arrSelect=['7 dias','15 dias','30 dias', '90 dias'];
    document.getElementById('ButtonImportURL')['addEventListener']("click", function() {
      document.querySelector('.bg-modal')['style']['display'] = "flex";
    });

    document.querySelector('.close').addEventListener("click", function() {
      document.querySelector('.bg-modal')['style']['display'] = "none";
    });

  }
}