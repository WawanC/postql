import { Field, ID, ObjectType } from "type-graphql";

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
