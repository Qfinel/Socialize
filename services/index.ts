import { request, gql } from 'graphql-request'
import { Post } from '@/components/Feed';

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT || "";

interface PostEdge {
    node: {
      author: {
        name: string;
        photo: {
          url: string;
        };
      };
      createdAt: string;
      content: string;
      id: string,
      likes: number;
      comments: {
        text: string;
        createdBy: {
          name: string;
          picture: string;
        };
      }[];
    };
}

interface SubmitPostProps {
    content: string,
    email: string
}

export const getPosts = async (): Promise<PostEdge[]> => {
    const query = gql`
    query MyQuery {
        postsConnection {
          edges {
            node {
              author {
                name
                photo {
                  url
                }
              }
              createdAt
              content
              id
              likes
              comments {
                text
                createdBy {
                  name
                  picture
                }
              }
            }
          }
        }
      }
    `

    const result = await request(graphqlAPI, query)

    return (result as any).postsConnection.edges as PostEdge[];
}

export const submitPost = async (obj: SubmitPostProps) => {
    const mutationSubmit = gql`
      mutation Submit {
          createPost(
            data: {content: "${obj.content}", likes: 0, 
            author: {connect: {email: "${obj.email}"}}}
          ) {
            id
          }
    }`

    const resultSubmit = await request(graphqlAPI, mutationSubmit) as any
    console.log(resultSubmit)

    const mutationPublish = gql`
      mutation Publish {
        publishPost(where: {id: "${resultSubmit.createPost.id}"}) {
          id
        }
    }`

    const resultPublish = await request(graphqlAPI, mutationPublish)

    return resultPublish
};

export const deletePost = async (id: string) => {

  const mutationDelete = gql`
    mutation Delete {
      deletePost(where: {id: "${id}"}){
        id
      }
    }`
  
  const resultDelete = await request(graphqlAPI, mutationDelete) as any
  
  return resultDelete
}