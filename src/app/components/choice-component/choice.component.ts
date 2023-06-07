import { Component, OnInit } from '@angular/core';
import { AchieveAnswerDto } from 'src/app/shared/models/achieve-answer-mode';
import { ExecutionResult } from 'src/app/shared/models/execution-result';
import { AchieveService } from 'src/app/shared/services/achieve.service';
import { QuoteService } from 'src/app/shared/services/quote.service';
import * as jwt_decode from 'jwt-decode';
import { UserManagementService } from 'src/app/shared/services/user-management.service';

@Component({
  selector: 'app-choice-component',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.css']
})
export class ChoiceComponent implements OnInit {

  showAnswerParagraph = false;
  showAnswerParagrapWrong = false;
  showNextButton = false;

  currentQuoteId: number = 0
  currentQuestion: string = ''
  possibleAnswers: string[] = []
  correctAnswer = '';

  achieveModel: AchieveAnswerDto = {
    user: '',
    quouteId: 0,
    quote: '',
    quoteAuthor: '',
    answer: ''
  }

  constructor(private quoteService: QuoteService,
    private achieveService: AchieveService,
    private userService: UserManagementService) { }

  ngOnInit(): void {
    this.getRandomQuestion()
  }

  private get userName(): string {
    const token = localStorage.getItem('token');
    return (jwt_decode.default(token ?? "") as { sub: string }).sub;
  }

  public get isLoggedIn(): boolean {
    return this.userService.isLoggedIn
  }

  protected getRandomQuestion() {
    this.showNextButton = false;

    this.quoteService.getRandomQuoteForChoice().subscribe({
      next: (data: ExecutionResult) => {
        console.log(data);
        this.currentQuestion = data.data.quoteName;
        this.possibleAnswers = data.data.possibleAuthors;
        this.currentQuoteId = data.data.id;
      }
    });
  }

  protected onAnswerClick(possibleAnswer: string) {

    this.quoteService.getQuoteById(this.currentQuoteId).subscribe({
      next: (data: ExecutionResult) => {
        console.log(data);

        if (data.data.author == possibleAnswer) {
          this.correctAnswer = possibleAnswer
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
        this.achieveModel.answer = possibleAnswer
        this.achieveModel.quoteAuthor = data.data.author
        this.achieveModel.quote = this.currentQuestion
        this.achieveModel.quouteId = this.currentQuoteId

        this.achieveUserAnswer();

      }
    });

  }

  private achieveUserAnswer() {
    this.achieveService.achieveUserAnswer(this.achieveModel).subscribe({
      next: (data: ExecutionResult) => {
        console.log('dasavebis shedegi: ');
        console.log(data);
      }
    });
  }

}
