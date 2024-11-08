import { Injectable } from '@nestjs/common';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService){}
  create(createTodoInput: CreateTodoInput) {
    return this.prisma.todo.create({
      data:{title:createTodoInput.title,
            content:createTodoInput.content,
            deadline:createTodoInput.deadline,
      },
    });
  }

  findAll() {
    return this.prisma.todo.findMany({});
  }

  findOne(id: number) {
    return this.prisma.todo.findUnique({where:{id:id}});
  }

  update(id: number, updateTodoInput: UpdateTodoInput) {
    return this.prisma.todo.update({
      where:{id:id},
      data:{title:updateTodoInput.title,
        content:updateTodoInput.content,
        deadline:updateTodoInput.deadline,}
    });
  }

  remove(id: number) {
    return this.prisma.todo.delete({where:{id:id}});
  }
}
