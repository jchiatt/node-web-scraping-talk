/* eslint-disable functional/prefer-readonly-type */
type UserId = number;

type Todo = {
  userId: UserId;
  id: number;
  title: string;
  completed: boolean;
};

type TodosResponseData = Todo[];

type UserPostsMeta = {
  postsCount: number;
};

type UserPosts = {
  meta: UserPostsMeta;
  posts: number[];
};

type ParsedTodosData = Record<UserId, UserPosts>;

export const todosParser = async (
  response: TodosResponseData
): Promise<ParsedTodosData | []> => {
  try {
    const userPosts = response.reduce((acc, curr) => {
      const userId = curr.userId;
      const postId = curr.id;

      if (!(userId in acc)) {
        return {
          ...acc,
          [userId]: { meta: { postsCount: 1 }, posts: [postId] },
        };
      }

      return {
        ...acc,
        [userId]: {
          meta: {
            ...acc[userId].meta,
            postsCount: acc[userId].meta.postsCount + 1,
          },
          posts: [...acc[userId].posts, postId],
        },
      };
    }, {});

    return userPosts;
  } catch (err) {
    console.error('Failed to parse todos', err);
    return [];
  }
};
