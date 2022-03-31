import { ArgsType, Field, ID, ObjectType } from "type-graphql";
import { IsNotEmpty } from "class-validator";

@ObjectType()
export class Post {
  constructor(title: string, description: string) {
    this.id = new Date().toISOString();
    this.title = title;
    this.description = description;
  }

  @Field(() => ID)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  description!: string;
}

@ArgsType()
export class CreatePostArgs {
  @Field(() => String)
  @IsNotEmpty()
  title!: string;

  @Field(() => String)
  @IsNotEmpty()
  description!: string;
}

@ArgsType()
export class UpdatePostArgs extends CreatePostArgs {
  @Field(() => String)
  @IsNotEmpty()
  id!: string;
}
