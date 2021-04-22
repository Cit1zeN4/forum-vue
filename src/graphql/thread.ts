import { Thread } from "@/models/thread.model";
import axios from "axios";

export async function threadsWithRelations(
  skip: number | null = null,
  take: number | null = null
) {
  const result = await axios.post("http://localhost:4000", {
    query: `query Query($threadsWithRelationsSkip: Int, $threadsWithRelationsTake: Int){
        threadsWithRelations(skip: $threadsWithRelationsSkip, take: $threadsWithRelationsTake){ 
          id
          title
          description
          parentTread {
            id
            title
            description
          }
          subThreads {
            id
            title
            description
          }
          messages {
            id
            text
          }
          isClosed
          isArchived
        }
      }`,
    variables: `{"threadsWithRelationsSkip": ${skip},"threadsWithRelationsTake": ${take}}`,
  });
  return result.data.data.threadsWithRelations;
}

export async function threadCount(): Promise<number> {
  const result = await axios.post("http://localhost:4000", {
    query: `query Query {
      threadCount
    }`,
  });
  return result.data.data.threadCount;
}

export async function threadWithRelations(id: string): Promise<Thread> {
  const result = await axios.post("http://localhost:4000", {
    query: `query Query($threadWithRelationId: String!) {
      threadWithRelation(id: $threadWithRelationId) {
        id
        title
        description
        author {
          id
          username
          email
        }
        parentTread {
          id
          title
          description
        }
        subThreads {
          id
          title
          description
        }
        messages {
          id
          text
          date
          author {
            id      
            username
            email      
          }
        }
        isClosed
        isArchived
      }
    }`,
    variables: `{"threadWithRelationId": "${id}"}`,
  });
  return result.data.data.threadWithRelation;
}
