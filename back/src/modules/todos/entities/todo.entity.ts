import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Todo {
  @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => String, {nullable:true})
    content!: string | null;

    @Field(() => Date, {nullable:true}) 
    deadline!: Date | null;
}
