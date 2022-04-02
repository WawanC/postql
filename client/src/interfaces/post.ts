export interface IPost {
  id: string;
  title: string;
  description: string;
  image?: string;
}

export interface IGetPosts {
  getPosts: IPost[];
}

export interface ICreatePost {
  title: string;
  description: string;
  image?: File | null;
}

export interface INewPostSubscriptionData {
  newPostSubscription: IPost;
}
