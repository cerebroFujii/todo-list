import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Todo {
  id: string,
  value: string,
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  // ************************************************************************
  // 変数
  // ************************************************************************
  private _idPrefix: string = 'todo-item-';
  private _todoList: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  todoList: Observable<Todo[]> = this._todoList.asObservable();

  // ************************************************************************
  // public関数
  // ************************************************************************
  constructor() {}

  add(taskName: string): void {
    const current = this._todoList.getValue();
    const newItem: Todo = { id: this._idPrefix + (current.length + 1), value: taskName };
    this._todoList.next([...current, newItem]);
  }

  remove(todo: Todo): void {
    const current = this._todoList.getValue();
    const removed = current.filter((o) => o.id !== todo.id)
                           .map((o, index) => { return { id: this._idPrefix + (index + 1), value: o.value } });
    this._todoList.next(removed);
  }
}
