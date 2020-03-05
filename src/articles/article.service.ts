import { Injectable } from '@angular/core';
import { IArticle } from './articles';
import {HttpClient} from '@angular/common/http';
import {Observable } from 'rxjs';

@Injectable ({
    providedIn: 'root'
})

export class ArticleService {
    private articleUrl = 'api/articles/articles.json'

    constructor(private http: HttpClient){}

    getArticles(): Observable<IArticle[]> {
        this.http.get<IArticle[]>(this.articleUrl)
        return this.http.get<IArticle[]>(this.articleUrl)
    }
    getWordCount(text) {
        console.log("test")
        return 20
    }
}