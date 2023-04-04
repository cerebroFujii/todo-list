import { TestBed } from '@angular/core/testing';

import { StoreService, Todo } from './store.service';
import { BehaviorSubject } from 'rxjs';

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('タスク追加_正常系',() => {
    const input: string = 'テスト';
    const expected: Todo[] = [{ id: service["_idPrefix"] + '1', value: input }];
    service["_todoList"] = new BehaviorSubject<Todo[]>([]);
    service.add(input);
    const actual: Todo[] = service["_todoList"].getValue();
    expect(actual).toEqual(expected);
  });

  it('タスク削除_正常系',() => {
    const input: Todo = { id: service["_idPrefix"] + '1', value: 'テスト' };
    const expected: Todo[] = [];
    service["_todoList"] = new BehaviorSubject<Todo[]>([input]);
    service.remove(input);
    const actual: Todo[] = service["_todoList"].getValue();
    expect(actual).toEqual(expected);
  });
});
