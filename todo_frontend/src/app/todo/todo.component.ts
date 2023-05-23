import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'app-todo',
  styleUrls: ['./todo.component.scss'],
  templateUrl: './todo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent {

}
