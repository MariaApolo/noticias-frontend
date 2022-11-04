import { Component, OnInit } from '@angular/core';
import { AnyForUntypedForms } from '@angular/forms';
import { OutputService } from 'src/app/services/output.service';
import { UserService } from 'src/app/services/user.service';
import * as $ from 'jquery';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-etiquetador',
  templateUrl: './etiquetador.component.html',
  styleUrls: ['./etiquetador.component.css']
})
export class EtiquetadorComponent implements OnInit {

  public data: any;
  public i: any;
  public id_user:any;
  public no_data: number = 0;  /*0 = no_consent  1 = encuesta 2 = finished*/
  public hl_words_1:any;
  public hl_words_2:any;
  public color_1: any;
  public color_2: any;
  public selection: any;
  public consent: any;
  public terms: any;
  public comment:any;
  public user:any = {
    email: '',
    nombre: '',
    pass: ''
  };
  title = 'appBootstrap';
  closeResult: string = '';

  constructor( private OutputService: OutputService,
               private UserService: UserService,
               private modalService: NgbModal,
               private router: Router,) { 

    this.i = 0;
    this.id_user; //por defecto maria
    this.hl_words_1 = [];
    this.hl_words_2 = [];
    this.selection = "";

    
  }

  ngOnInit(): void {

    {
      this.terms = false;
      this.consent = false;
      //Aquí se realiza el llamado al servicio para obtener los pares a consultar
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
      this.selection = ''
    })


    if(this.i == (this.data.length -1) ){
      this.no_data = 2; 
      console.log('estado:', this.no_data);
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

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  changeConsent(){
    this.consent = !this.consent;
  }

  changeTerms(){
    this.terms = !this.terms;
  }


  startForm(){

    this.user = {
      email: 'anonimo@anonimo.cl',
      nombre: 'user_anonimo',
      pass: '123'
    };

    try{
      this.UserService.Register(this.user).subscribe(res => {
        this.id_user = res.id_user;
        console.log(this.id_user);
        this.no_data = 1;
        console.log("Cambio de estado a inicio de formulario");
      })
    }
    catch (error) {
      console.log("error");
    }

  }

  sendComment(){
    const body = {
      id_user: this.id_user,
      comment_text: this.comment,
    };
    try{ 
      this.OutputService.createComment(body).subscribe(res => {
        console.log("Formulario enviado");
        this.router.navigateByUrl('/')
      })
    }
    catch (error) {
      console.log("error");
    }
    
  }

  finalizar() {
    this.no_data = 2;
  }

}
