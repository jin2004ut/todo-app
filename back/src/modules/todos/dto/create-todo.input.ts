import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field(() => Int, {nullable:true})
  id: number | null;
  
  @Field(() => String, {nullable:false})
  title!: string;

  @Field(() => String, {nullable:true})
  content!: string | null;

  @Field(() => Date, {nullable:true}) 
  deadline!: Date | null;
}
