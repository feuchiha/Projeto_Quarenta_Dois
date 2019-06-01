import { Component, OnInit } from '@angular/core';
// import * as google from  '../src/assets/jscustom/googlechart.js';
import * as google from 'assets/jscustom/googlechart'
@Component({
  selector: 'app-cardcolumn',
  templateUrl: './cardcolumn.component.html',
  styleUrls: ['./cardcolumn.component.css']
})
export class CardcolumnComponent implements OnInit {

  constructor() { }

  myData = [
    ['London', 8136000],
    ['New York', 8538000],
    ['Paris', 2244000],
    ['Berlin', 3470000],
    ['Kairo', 19500000],
  ];

  myColumnNames = ['City', 'Inhabitants'];

  ngOnInit() {
    //  // Load the Visualization API and the corechart package.
    //  google.charts.load('current', {'packages':['corechart']});

    //  // Set a callback to run when the Google Visualization API is loaded.
    //  google.charts.setOnLoadCallback(drawChart);

    //  // Callback that creates and populates a data table,
    //  // instantiates the pie chart, passes in the data and
    //  // draws it.
    //  function drawChart() {

    //    // Create the data table.
    //    var data = new google.visualization.DataTable();
    //    data.addColumn('string', 'Topping');
    //    data.addColumn('number', 'Slices');
    //    data.addRows([
    //      ['Mushrooms', 3],
    //      ['Onions', 1],
    //      ['Olives', 1],
    //      ['Zucchini', 1],
    //      ['Pepperoni', 2]
    //    ]);

    //    // Set chart options
    //    var options = {'title':'How Much Pizza I Ate Last Night',
    //                   'width':400,
    //                   'height':300};

    //    // Instantiate and draw our chart, passing in some options.
    //    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    //    chart.draw(data, options);
    //  }
  }



}
