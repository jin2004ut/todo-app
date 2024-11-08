import { CreateTodoInput } from './create-todo.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTodoInput extends PartialType(CreateTodoInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String, {nullable:false})
  title!: string;

  @Field(() => String, {nullable:true})
  content!: string | null;

  @Field(() => Date, {nullable:true}) 
  deadline!: Date | null;
}
