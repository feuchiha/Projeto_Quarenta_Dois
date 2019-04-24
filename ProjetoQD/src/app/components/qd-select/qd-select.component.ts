import { Component, OnInit, Input } from '@angular/core';
import * as $ from "jquery";
@Component({
  selector: 'app-qd-select',
  templateUrl: './qd-select.component.html',
  styleUrls: ['./qd-select.component.scss']
})
export class QdSelectComponent implements OnInit {
  @Input() arrSelect: string;

  constructor() { }
  finalWidth: any
  ngOnInit() {
    $(".drop .option").click(function () {
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
          // $drop.addClass("withBG");
        }, 400 + options * 100);
      }
      this.triggerAnimation();
      if (val !== "placeholder" || prevActive === "placeholder") {
        $(".drop .option").removeClass("active");
        $(this).addClass("active");
      }
    })
  }
  triggerAnimation() {
    this.finalWidth = $(".drop").hasClass("visible") ? 22 : 20;
    $(".drop").css("width", "24em");
    setTimeout(function () {
      $(".drop").css("width", this.finalWidth + "em");
    }, 400);
  }

}