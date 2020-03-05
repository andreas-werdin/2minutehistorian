import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IArticle } from './articles';
import {ArticleService} from './article.service';
import {DialogContentComponent} from './dialogComponent';
import {MatDialog} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material';
import { Inject } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import * as angular from 'angular';
import { Options, LabelType } from 'ng5-slider';

@Component({
    selector: 'pm-articles',
    templateUrl: './article-list.html',
    styleUrls: ['./article-list.css', './mat-tab.css']
    
})

export class ArticleListComponent implements OnInit{
    articles: IArticle[] = [];
    errorMessage: string;
    _listFilter: string = "";
    _sortOrder: string;
    dropdownSettings = {};
    sortOrder: dropdownList[] = [
        {value: 'newest', viewValue: 'Newest'},
        {value: 'oldest', viewValue: 'Oldest'},
        {value: 'alphafront', viewValue: 'A - Z'},
        {value: 'alphaback', viewValue: 'Z - A'},
        {value: 'yearoldest', viewValue: 'Past - Present'},
        {value: 'yearnewest', viewValue: 'Present - Past'}
      ];
    filterTags: string[] = ['People', 'Events', 'Places'];

    value: number = 800;
    highValue: number = 2020;
    options: Options = {   
      floor: 800,
      ceil: 2020,
      ticksArray: [1453, 1789, 1914, 1989],
      showTicksValues: true,
      animate: false,
      draggableRange: true,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return value + ' A.D.';
          case LabelType.High:
            return value + ' A.D.';
          default:
            return value + '';
        }
      }
    };
    encapsulation: ViewEncapsulation.None

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value:string) {
        this._listFilter = value;
        this.filteredArticles = this.performFilter(this.listFilter);
    }

    tagFilter() {
      this.filteredArticles = this.performFilter(this._listFilter);
    }


    set listSorting(value:string) {
        this._sortOrder = value;
        if(value == "alphafront") {
            this.filteredArticles = this._sortOrder ? this.sortArticlesHeader(this.filteredArticles) : this.articles;
        } else if(value == "alphaback") {
            this.filteredArticles = this._sortOrder ? this.sortArticlesHeaderReverese(this.filteredArticles) : this.articles;
        } else if(value == "oldest") {
            this.filteredArticles = this._sortOrder ? this.sortArticlesAddedReverse(this.filteredArticles) : this.articles;
        } else if(value == "newest") {
            this.filteredArticles = this._sortOrder ? this.sortArticlesAdded(this.filteredArticles) : this.articles;
        } else if(value == "yearoldest") {
          this.filteredArticles = this._sortOrder ? this.sortArticlesStartYear(this.filteredArticles) : this.articles;
        } else if(value == "yearnewest") {
          this.filteredArticles = this._sortOrder ? this.sortArticlesStartYearReverse(this.filteredArticles) : this.articles;
        }
        console.log(this.filteredArticles);
    }


    filteredArticles: IArticle[];

    constructor(private articleService: ArticleService,
        public dialog: MatDialog){
            this.filteredArticles = this.articles;
            this.listFilter;
    }

    ngOnInit(): void {
        this.articleService.getArticles().subscribe({
            next: articles => {
                this.articles = this.sortArticlesAdded(articles)
                this.filteredArticles = this.articles;
            },
            error: err => this.errorMessage = err
        });
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: false
        };
    }
    sortArticlesHeader(sortedArticles: IArticle[]): IArticle[] {
        sortedArticles = sortedArticles.sort((a, b) => {
            if(a.header > b.header) {
              return 1;
            } else if(a.header < b.header) {
              return -1;
            } else {
              return 0;
            }
          });
          return sortedArticles
    }

    sortArticlesHeaderReverese(sortedArticles: IArticle[]): IArticle[] {
      sortedArticles = sortedArticles.sort((a, b) => {
            if(a.header > b.header) {
              return 1;
            } else if(a.header < b.header) {
              return -1;
            } else {
              return 0;
            }
          });
          return sortedArticles.reverse()
    }

    sortArticlesAdded(sortedArticles: IArticle[]): IArticle[] {
      sortedArticles = sortedArticles.sort((a, b) => {
            if(a.addedDate > b.addedDate) {
              return 1;
            } else if(a.addedDate < b.addedDate) {
              return -1;
            } else {
              return 0;
            }
          });
          return sortedArticles.reverse()
    }
    sortArticlesAddedReverse(sortedArticles: IArticle[]): IArticle[] {
      sortedArticles = sortedArticles.sort((a, b) => {
            if(a.addedDate > b.addedDate) {
              return 1;
            } else if(a.addedDate < b.addedDate) {
              return -1;
            } else {
              return 0;
            }
          });
          return sortedArticles
    }
    sortArticlesStartYear(sortedArticles: IArticle[]): IArticle[] {
      sortedArticles = sortedArticles.sort((a, b) => {
            if(a.startYear > b.startYear) {
              return 1;
            } else if(a.startYear < b.startYear) {
              return -1;
            } else {
              return 0;
            }
          });
          return sortedArticles
    }

    sortArticlesStartYearReverse(sortedArticles: IArticle[]): IArticle[] {
      sortedArticles = sortedArticles.sort((a, b) => {
            if(a.startYear > b.startYear) {
              return 1;
            } else if(a.startYear < b.startYear) {
              return -1;
            } else {
              return 0;
            }
          });
          return sortedArticles.reverse()
    }

    performFilter(filterBy: string): IArticle[] {
        console.log(filterBy);
        filterBy = filterBy.toLocaleLowerCase();
        var returnArticles = this.articles.filter((article: IArticle)=>
        article.header.toLocaleLowerCase().indexOf(filterBy) !== -1);
        console.log(this.filteredArticles);
        var elements = (<HTMLInputElement[]><any>document.getElementsByName("drama"));
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].type == "checkbox") {
              if (elements[i].checked) {
              }
              else {
                returnArticles = returnArticles.filter((returnArticle: IArticle)=>
                returnArticle.tags.indexOf(this.filterTags[i]) == -1);
              }
            }
          }
        returnArticles = returnArticles.filter((returnArticle: IArticle)=>
        returnArticle.startYear <= this.highValue && returnArticle.endYear >= this.value);
        return returnArticles
    }

    openDialog(article: IArticle) {
        const dialogRef = this.dialog.open(DialogContentComponent, {
            data: article,
          });
      }
    }

     export interface dropdownList {
        value: string;
        viewValue: string;
      }

      

