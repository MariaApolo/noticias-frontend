import { Component, OnInit } from '@angular/core';
import { AnyForUntypedForms } from '@angular/forms';
import { OutputService } from 'src/app/services/output.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-etiquetador',
  templateUrl: './etiquetador.component.html',
  styleUrls: ['./etiquetador.component.css']
})
export class EtiquetadorComponent implements OnInit {

  public data: any;
  public i: any;
  public id_user:any;
  public no_data: boolean = false;
  public hl_words_1:any;
  public hl_words_2:any;
  public color_1: any;
  public color_2: any;
  public selection: any;

  constructor( private OutputService: OutputService) { 

    this.i = 0;
    this.id_user =1; //por defecto maria
    this.hl_words_1 = [];
    this.hl_words_2 = [];
    this.selection = "";
    
  }

  ngOnInit(): void {

    {
      //Aquí se realiza el llamado al servicio para obtener la data y luego generar el gráfico
      this.OutputService.getOutputs().subscribe(data => {
        this.data = data;  
        this.color_1 = Array(data[0].sentence1.split(' ').length).fill(false);
        this.color_2 = Array(data[0].sentence2.split(' ').length).fill(false);


      })
    }

  } 

  next(id_output: any, value: any){

    const body = {
      id_output: id_output,
      id_user: this.id_user,
      value: value,
      s1_highlight: {data: this.hl_words_1},
      s2_highlight: {data: this.hl_words_2}
    }
    this.OutputService.createEtiqueta(body).subscribe(res => {
      console.log(res);
      this.hl_words_1 = [];
      this.hl_words_2 = [];

    })

    if(this.i == (this.data.length -1) ){
      this.no_data = true;
      console.log('boolean:', this.no_data);
      this.i = 0;
    }

    else{
      this.i+=1;
      this.color_1 = Array(this.data[this.i].sentence1.split(' ').length).fill(false);
      this.color_2 = Array(this.data[this.i].sentence2.split(' ').length).fill(false);
    }
    return
  }

  highlight(word:any, sentence:any, i:any){
    if(sentence == 1){
      if(this.color_1[i] == true){
        var index = this.hl_words_1.indexOf(word)
        this.hl_words_1.splice(index,1)
      }
      else{
        this.hl_words_1.push(word);
      }

      this.color_1[i] = !this.color_1[i]  //cambiar de true a false

    }
    else{
      if(this.color_2[i] == true){
        var index = this.hl_words_2.indexOf(word)
        this.hl_words_2.splice(index,1)
      }
      else{
        this.hl_words_2.push(word);
      }

      this.color_2[i] = !this.color_2[i]  //cambiar de true a false

     
    }
  }



}
