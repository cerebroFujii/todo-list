import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreService, Todo } from './store/store.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  // ************************************************************************
  // 変数
  // ************************************************************************
  private _errorMessage: string = 'タスクフォームが未入力のため、タスクを登録できません。';
  taskForm: FormControl = new FormControl('', [Validators.required]);
  todoList = this.storeService.todoList;  
  // ************************************************************************
  // public関数
  // ************************************************************************
  constructor(
    private storeService: StoreService,
  ) {}

  public ngOnInit() {
    this.storeService.todoList.subscribe();
  }  

  public onClickAddButton() {
    if (this.taskForm.errors) {
      alert(this._errorMessage);
      return;
    }
    this.storeService.add(this.taskForm.value);
    this.taskForm.setValue('');
  }  

  public onClickCompletedButton(todo: Todo): void {
    this.storeService.remove(todo);
  }
}
