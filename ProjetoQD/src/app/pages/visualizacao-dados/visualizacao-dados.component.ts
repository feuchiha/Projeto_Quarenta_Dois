import { Component, OnInit } from '@angular/core';
import * as NeoVis from 'neovis.js';

@Component({
  selector: 'app-visualizacao-dados',
  templateUrl: './visualizacao-dados.component.html',
  styleUrls: ['./visualizacao-dados.component.scss']
})
export class VisualizacaoDadosComponent implements OnInit {

  viz: any;
  cypher: '';
  query: {
    nodes: string[],
    relationship: string[]
  };
  divLabels: any
  cont: 0;
  constructor() { }
  public titulo: string;
  ngOnInit() {
    this.divLabels = document.getElementById('labels');
    this.query = {
      nodes: [],
      relationship: []
    }
    var config = {
      container_id: "viz",
      server_url: "bolt://52.91.116.38:37310",
      server_user: "neo4j",
      server_password: "dealers-index-morale",
      labels: {
        "User": {
          caption: "user_key",
          size: "pageRank",
          community: "community"
        },
        "Tweet": {}
      },
      relationships: {
        "POSTED": {
          caption: "text",
          thickness: "weight"
        },
        "MENTIONS": {
          caption: "text",
          thickness: "weight"
        }
      },
      arrows: true,
      // initial_cypher:"MATCH (tom:Person {name: 'Tom Hanks'})-[:ACTED_IN]->(tomHanksMovies) RETURN tom,tomHanksMovies"
      initial_cypher: "MATCH p=(u:User)-[:POSTED]->(t:Tweet) RETURN p LIMIT 3"
    }


    this.viz = new NeoVis.default(config);
    this.viz.render();
  }

  reload() {
    if (this.cypher.length > 3) {
      this.viz.renderWithCypher(this.cypher);
    } else {
      console.log("reload");
      this.viz.reload();
    }
  }

  AdicionarInput() {
    var input = document.getElementById('inputLabel');

    if (!input["value"] || !(input["value"] == 'posted' || input["value"] == 'mentions' 
    || input["value"] == 'retweet' || input["value"] == 'posted_via' 
    || input["value"] == 'user' || input["value"] == 'troll'
    || input["value"] == 'url' || input["value"] == 'tweet')){
        input["value"] = "";
        return;
    }

    var isSelectRelationship = false;
    if (input["value"] == 'posted' || input["value"] == 'mentions' 
        || input["value"] == 'retweet' || input["value"] == 'posted_via') {
        isSelectRelationship = true;
    }
    this.adicionar(isSelectRelationship, true, input["value"]);
    input["value"] = "";
 }

 adicionar(isSelectRelationship = false, isInput = false, inputValue = "") {
  var select;
  var text = "";
  var objValue = {
    queryName:'',
    value:''
  };
  var attObj = "";
  this.cont++;
  if (this.cont == 2) {
      document.getElementById('relationship')['disabled'] = true
      document.getElementById('nodes')['disabled'] = true
  }

  if (this.divLabels.innerHTML == '') {
      this.cont = 0
  }

  if (isSelectRelationship) {
      attObj = "relationship";
  } else {
      attObj = "nodes"
  }

  select = document.getElementById(attObj);
  if (!isInput) {
      objValue = JSON.parse(select.value);
  } else {
      objValue = JSON.parse(this.getObjByValue(select, inputValue))
  }

  switch (objValue.value) {
      case 'posted':
          text = "Posted";
          break;
      case 'mentions':
          text = "Mentions";
          break;
      case 'retweet':
          text = "Retweet";
          break;
      case 'posted_via':
          text = "Posted Via";
          break;
      case 'user':
          text = "User";
          break;
      case 'troll':
          text = "Troll";
          break;
      case 'url':
          text = "URL";
          break;
      case 'tweet':
          text = "Tweet";
          break;
      default:
          text = "Other";
  }
  
  if (this.query[attObj].find(s => { return s == " " })) {
      var index = this.query["relationship"].findIndex(s => { return s == " " });
      this.query[attObj][index] = objValue.queryName;
  } else {
    this.query[attObj].push(objValue.queryName);
  }    
  
  this.divLabels.innerHTML += `<span class="label ${objValue.value}" id='${this.cont}' (click)="exclui(this.id,'${attObj}','${objValue.queryName}')"> ${text}<button class='label button'>X</button></span>`;
}

Buscar() {
  var quantidade = document.getElementById('quantidade')["value"];

  var retQuery = "Match p=";
  retQuery += `(${this.query.nodes[0]})-[${this.query.relationship[0]}]-(${this.query.nodes[1]})`;
  retQuery += ` return p limit ${quantidade}`
  if (this.viz._query !== retQuery){
    this.viz.renderWithCypher(retQuery);
  } else {
    this.viz.reload();
  }
  
    
}

exclui(id, type, value) {
  console.log(id)
  var elem = document.getElementById(id);

  if (id == 'All') {
      elem = document.getElementById('labels');
      elem.innerHTML = "";
      this.query.nodes = [];
      this.query.relationship = [];
      this.cont = 0;
      document.getElementById('relationship')['disabled'] = false;
      document.getElementById('nodes')['disabled'] = false;
      return false;
  }

  elem.parentNode.removeChild(elem);

  var index = this.query[type].findIndex(s => { return s == value });
  this.query[type][index] = " ";
  this.cont--;
  document.getElementById('relationship')['disabled'] = false;
  document.getElementById('nodes')['disabled'] = false;

  return false;
}

getObjByValue(elmnt, value) {
  for (var i = 0; i < elmnt.options.length; i++) {
      if (elmnt.options[i].value.includes(value)) {
          return elmnt.options[i].value;
      }
  }
}


}
