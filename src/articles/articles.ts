export interface IArticle{
    "articleId": number;
    "header": string;
    "subheader": string;
    "imageUrl": string;
    "articleUrl": string;
    "articleText": Array<string>;
    "articleWordCount": number;
    "addedDate": string;
    "tags": string;
    "startYear": number;
    "endYear": number;
}