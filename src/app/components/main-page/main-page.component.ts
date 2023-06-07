import { Component, OnInit } from '@angular/core';
import { AchieveAnswerDto } from 'src/app/shared/models/achieve-answer-mode';
import { ExecutionResult } from 'src/app/shared/models/execution-result';
import { AchieveService } from 'src/app/shared/services/achieve.service';
import { QuoteService } from 'src/app/shared/services/quote.service';
import * as jwt_decode from 'jwt-decode';
import { SwitcherService } from 'src/app/shared/services/switcher.service';
import { UserManagementService } from 'src/app/shared/services/user-management.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  protected currentMode: boolean = true

  showAnswerParagraph = false;
  showAnswerParagrapWrong = false;
  showNextButton = false;

  correctAnswer = '';
  currentQuestion: string = ''
  possibleAnswer: string = ''

  currentQuoteId:number = 0
  currentAuthor: string = ''

  achieveModel: AchieveAnswerDto = {
    user: '',
    quouteId: 0,
    quote: '',
    quoteAuthor: '',
    answer: ''
  }

  constructor(private quoteService: QuoteService, 
      private achieveService: AchieveService,
    private switcherService: SwitcherService,
  private userService: UserManagementService) {}

  ngOnInit(): void {
    this.currentMode = this.switcherService.isSimplemode;
    this.GetRandomQuestion()
  }

  public get userName(): string {
    const token = localStorage.getItem('token');
    return (jwt_decode.default(token ?? "") as {sub: string}).sub;
  }

  public get userId(): string {
    const token = localStorage.getItem('token');
    return (jwt_decode.default(token ?? "") as {id: string}).id;
  }

  public get isLoggedIn():boolean {
    return this.userService.isLoggedIn
  }

  GetRandomQuestion() {
    this.showNextButton = false;

    this.quoteService.getRandomQuote().subscribe({
      next: (data : ExecutionResult) => {
        console.log(data);
        this.currentQuestion = data.data.quoteName;
        this.possibleAnswer = data.data.author;
        this.currentQuoteId = data.data.id;
      }
    });
  }

  protected onAnswerClickYes() {
    this.quoteService.getQuoteById(this.currentQuoteId).subscribe({
      next: (data : ExecutionResult) => {
        if(data.data.author == this.possibleAnswer) {
          this.correctAnswer = this.possibleAnswer
          this.showAnswerParagraph = true;

          setTimeout(() => {
            this.showAnswerParagraph = false;
            this.showNextButton = true;
          }, 1000);

        } else {
          this.correctAnswer = data.data.author
          this.showAnswerParagrapWrong = true;

          setTimeout(() => {
            this.showAnswerParagrapWrong = false;
            this.showNextButton = true;
          }, 1000);
        }
          this.achieveModel.user = this.userName
          this.achieveModel.answer = "Yes"
          this.achieveModel.quoteAuthor = data.data.author
          this.achieveModel.quote = this.currentQuestion
          this.achieveModel.quouteId = this.currentQuoteId

          this.achieveUserAnswer();

      }
    });
  }

  private achieveUserAnswer() {
    this.achieveService.achieveUserAnswer(this.achieveModel).subscribe({
      next: (data : ExecutionResult) => {
        console.log('dasavebis shedegi: ');
        console.log(data);
      }
    });
  }

  protected onAnswerClickNo() {

    this.quoteService.getQuoteById(this.currentQuoteId).subscribe({
      next: (data : ExecutionResult) => {
        console.log(data);
        if(data.data.author == this.possibleAnswer) {
          this.correctAnswer = data.data.author
          this.showAnswerParagrapWrong = true;

          setTimeout(() => {
            this.showAnswerParagrapWrong = false;
            this.showNextButton = true;
          }, 1000);
        } else {
          this.correctAnswer = data.data.author
          this.possibleAnswer = this.correctAnswer
          this.showAnswerParagraph = true;
  
          setTimeout(() => {
            this.showAnswerParagraph = false;
            this.showNextButton = true;
          }, 1000);
        }

          this.achieveModel.user = this.userName
          this.achieveModel.answer = "No"
          this.achieveModel.quoteAuthor = data.data.author
          this.achieveModel.quote = this.currentQuestion
          this.achieveModel.quouteId = this.currentQuoteId

          this.achieveUserAnswer();

      }
    });

  }
  
  
}
