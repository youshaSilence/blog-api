import * as post from '../db/post';
import * as user from '../db/user';

interface Post {
    id?: number,
    userId?: number,
    title?: string,
    bodyText?: string,
}

export async function addPost(
    params: { userId: number; title: string; bodyText: string },
): Promise<Post> {
    const newPost = await post.create({ userId: params.userId, title: params.title, bodyText: params.bodyText });

    return newPost;
}

export async function list(): Promise<Post[]> {
    const posts = await post.list();

    return posts;
}

export async function getById({ id }: Post): Promise<Post> {
    const userPost = await post.getById({ id });

    return userPost;
}

export async function updateById(postId: number, { title, bodyText }: Post): Promise<Post> {
    const updatedPost = await post.updateById(postId, { bodyText, title });

    return updatedPost;
}

export async function setDeleted(postId: number): Promise<Post> {
    const updatedPost = await post.setDeleted(postId);

    return updatedPost;
}
