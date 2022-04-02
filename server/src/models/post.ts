import { ArgsType, Field, ID, ObjectType } from "type-graphql";
import { IsNotEmpty } from "class-validator";
import { GraphQLUpload } from "graphql-upload";
import { Upload } from "../interfaces/upload";
import { v4 } from "uuid";

@ObjectType()
export class Post {
  constructor(title: string, description: string) {
    this.id = v4();
    this.title = title;
    this.description = description;
  }

  @Field(() => ID)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  description!: string;

  @Field(() => String, { nullable: true })
  image?: string;
}

@ArgsType()
export class CreatePostArgs {
  @Field(() => String)
  @IsNotEmpty()
  title!: string;

  @Field(() => String)
  @IsNotEmpty()
  description!: string;

  @Field(() => GraphQLUpload, { nullable: true })
  image?: Promise<Upload>;
}

@ArgsType()
export class UpdatePostArgs extends CreatePostArgs {
  @Field(() => String)
  @IsNotEmpty()
  id!: string;
}
