export interface IPost {
  id: string;
  title: string;
  description: string;
}

export interface IGetPosts {
  getPosts: IPost[];
}

export interface ICreatePost {
  title: string;
  description: string;
}

export interface INewPostSubscriptionData {
  newPostSubscription: IPost;
}
