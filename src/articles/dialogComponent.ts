import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IArticle } from './articles';
import {ArticleService} from './article.service';
import {MatDialog} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material';
import { Inject } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Options } from 'ng5-slider';

    @Component({
        selector: 'dialog-content-example-dialog',
        templateUrl: 'dialog-content.html',
        styleUrls: ['./dialog-content.css', './header.css']
      })
      export class DialogContentComponent {
         lengthShort: boolean;
         lengthMedium: boolean;
         lengthLong: boolean;
 
         constructor(
         @Inject(MAT_DIALOG_DATA) public article: IArticle
          ){}
          
          ngOnInit() {
             this.article.articleWordCount = 0
             this.article.articleText.forEach( (element) => {
                 this.article.articleWordCount = this.article.articleWordCount + element.split(" ").length
             });
             if (this.article.articleWordCount < 400 ) {
                 this.lengthShort = true;
             } else if (this.article.articleWordCount >= 400 && this.article.articleWordCount < 600) {
                 this.lengthMedium = true;
             } else {
                 this.lengthLong = true;
             }
          }
         countOf(str) {
             console.log(str);
             return str.split(" ").length;
           }
      }