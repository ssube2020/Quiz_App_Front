import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExecutionResult } from '../models/execution-result';
import { AchieveAnswerDto } from '../models/achieve-answer-mode';

@Injectable({
  providedIn: 'root'
})
export class AchieveService {

  constructor(private http: HttpClient) { }
  
  apiUrl: string = environment.apiHostUrl;

  getAchieve() : Observable<ExecutionResult> {
    return this.http.get<ExecutionResult>(this.apiUrl+"/Achieve/GetAchieve");
  }

  achieveUserAnswer(model: AchieveAnswerDto) : Observable<ExecutionResult> {
    return this.http.post<ExecutionResult>(this.apiUrl+"/Achieve/AddUserAchievement",  model );
  }

}
