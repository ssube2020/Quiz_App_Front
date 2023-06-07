import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ExecutionResult } from 'src/app/shared/models/execution-result';
import { QuoteAddDto } from 'src/app/shared/models/quote-add';
import { QuoteEditDto } from '../models/quote-edit-model';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private http: HttpClient) { }

  apiUrl: string = environment.apiHostUrl; 

  getRandomQuote() : Observable<ExecutionResult> {
    return this.http.get<ExecutionResult>(this.apiUrl+"/Quote/GetRandomQuote");
  }

  getRandomQuoteForChoice() : Observable<ExecutionResult> {
    return this.http.get<ExecutionResult>(this.apiUrl+"/Quote/GetRandomQuoteChoice");
  }

  getQuoteById(quoteId: number) : Observable<ExecutionResult> {
    return this.http.get<ExecutionResult>(this.apiUrl+"/Quote/GetQuoteById" + "?quoteId="+quoteId);
  }

  getQuotes() : Observable<ExecutionResult> {
    return this.http.get<ExecutionResult>(this.apiUrl+"/Quote/GetQuotes");
  }

  addQuote(model: QuoteAddDto) : Observable<ExecutionResult> {
    return this.http.post<ExecutionResult>(this.apiUrl+"/Quote/AddQuote",  model );
  }

  UpdateQuote(model: QuoteEditDto) : Observable<ExecutionResult> {
    return this.http.put<ExecutionResult>(this.apiUrl+"/Quote/UpdateQuote",  model );
  }

  deleteQuote(quoteId: number): Observable<ExecutionResult> {
    return this.http.put<ExecutionResult>(`${this.apiUrl}/Quote/DeleteQuote?quoteId=${quoteId}`, {});
  }

}
