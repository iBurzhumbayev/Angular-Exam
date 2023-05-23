import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';
import { ITodoUpdateRequest } from '../todo.model';

@Component({
  selector: 'app-edit-todo',
  templateUrl: 'todo-edit.component.html',
  styleUrls: ['todo-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoEditComponent implements OnChanges {
  @Input() todoId: string | null = null;
  todoForm: FormGroup;

  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder
  ) {
    this.todoForm = this.formBuilder.group({
      id: ['', Validators.required],
      text: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.todoId && changes.todoId.currentValue) {
      this.todoForm.patchValue({ id: changes.todoId.currentValue });
    }
  }

  onSubmit(): void {
    const formData: ITodoUpdateRequest = {
      id: this.todoForm.get('id')?.value,
      text: this.todoForm.get('text')?.value,
      isDone: false
    };

    this.todoService.updateTodo(formData).subscribe(() => {
      this.getAllTodos();
      this.todoForm.reset();
    });
  }

  getAllTodos(): void {
    this.todoService.uploadAllTodos().subscribe();
  }
}
