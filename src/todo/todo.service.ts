import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {

  private todos: Todo[] = [
    {id: 0,descripcion: 'My first todo',done: false},
    {id: 1,descripcion: 'My second todo',done: true}
  ];

  create(createTodoDto: CreateTodoDto) {
    this.todos.push(
      {
        id: Math.max(...this.todos.map(i => i.id), 0) + 1,
        descripcion: createTodoDto.descripcion,
        done: createTodoDto.done
      }
    );
    return this.todos[this.todos.length - 1];
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    return this.todos.find(i => i.id == id);
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    this.todos.forEach(i => {
      if (i.id === id) {
        i.descripcion = updateTodoDto.descripcion,
        i.done = updateTodoDto.done
      }
    });
    return this.todos.find(i => i.id === id);
  }

  remove(id: number) {
    this.todos = this.todos.filter(i => i.id !== id);
    return this.findAll();
  }
}
