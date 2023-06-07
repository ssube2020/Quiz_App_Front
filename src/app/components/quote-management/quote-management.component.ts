import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExecutionResult } from 'src/app/shared/models/execution-result';
import { QuoteModel } from 'src/app/shared/models/quote';
import { QuoteEditDto } from 'src/app/shared/models/quote-edit-model';
import { QuoteService } from 'src/app/shared/services/quote.service';
import { UserManagementService } from 'src/app/shared/services/user-management.service';

@Component({
  selector: 'app-quote-management',
  templateUrl: './quote-management.component.html',
  styleUrls: ['./quote-management.component.css']
})
export class QuoteManagementComponent implements OnInit {
  quoteForm!: FormGroup;
  editQuoteModel: QuoteEditDto =  {
    id: 0,
    author: '',
    quoteName: ''
  };
  isDialogueOpen: boolean = false
  isEditDialogueOpen: boolean = false
  creationMessage: boolean = false
  responseMessage: string = ''
  quotes: QuoteModel[] = []

  editQuoteName: string = ''
  editAuthor: string = ''


  constructor(private quoteService: QuoteService,
    private userService: UserManagementService,
    private formBuilder: FormBuilder) {}

  public get isLoggedIn(): boolean {
    return this.userService.isLoggedIn
  }

  ngOnInit(): void {
    this.getQuotes();

    this.quoteForm = this.formBuilder.group({
      quoteName: ['', Validators.required],
      author: ['', Validators.required]
    })

    // this.editQuoteForm = this.formBuilder.group({
    //   id: [0, Validators.required],
    //   quoteName: ['', Validators.required],
    //   author: ['', Validators.required]
    // })
    

  }

  private getQuotes() {
    this.quoteService.getQuotes().subscribe({
      next: (data : ExecutionResult) => {
        console.log(data)
        this.quotes = data.data;
      }
    });
  }

  protected openAddQuoteDialogue() {
    this.isDialogueOpen = true
  }

  protected createQuote() {

    this.quoteService.addQuote(this.quoteForm.value).subscribe({
      next: (data : ExecutionResult) => {
        this.isDialogueOpen = false
        console.log('damatebis shedegad migebuli pasuxi');
        console.log(data)
        if(data.success) {
          this.quoteForm.reset();
          this.creationMessage = true
          this.responseMessage = data.message
          this.isDialogueOpen = false
          setTimeout(() => {
            this.creationMessage = false;
          }, 1500);
          this.getQuotes()
        } else if(!data.success) {
          this.isDialogueOpen = true
          this.creationMessage = true
          this.responseMessage = data.message
        }
      }
    });
  }

  protected cancelCreate() {
    this.isDialogueOpen = false
    this.creationMessage = false
  }

  protected cancelEdit() {
    this.isEditDialogueOpen = false
    //this.creationMessage = false
  }

  

  protected deleteQuote(itemId: number) {
    this.quoteService.deleteQuote(itemId).subscribe({
      next: (data : ExecutionResult) => {
        if(data.success) {
          this.getQuotes()
        }
      }
    });
  }

  protected editQuote(itemId: number, quote: string, author: string) {
    
    this.isEditDialogueOpen = true

    this.editQuoteName = quote
    this.editAuthor = author

    this.editQuoteModel.id = itemId
    this.editQuoteModel.quoteName = this.editQuoteName
    this.editQuoteModel.author = this.editAuthor
    
    console.log('minichebuli: ')
    console.log(this.editQuoteModel)
  }

  protected SaveChanges() {
    this.editQuoteModel.quoteName = this.editQuoteName
    this.editQuoteModel.author = this.editAuthor

    this.quoteService.UpdateQuote(this.editQuoteModel).subscribe({
      next: (data : ExecutionResult) => {
        this.isDialogueOpen = false
        console.log('updates shedegad migebuli pasuxi');
        console.log(data)
        if(data.success) {
          this.quoteForm.reset();
          this.creationMessage = true
          this.responseMessage = data.message
          this.isEditDialogueOpen = false
          setTimeout(() => {
            this.creationMessage = false;
          }, 1500);
          this.getQuotes()
        } else if(!data.success) {
          this.isDialogueOpen = true
          this.creationMessage = true
          this.responseMessage = data.message
        }
      }
    });
  }
}
