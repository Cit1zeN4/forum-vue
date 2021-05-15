import gql from "graphql-tag";

export function getUserQuery() {
  return gql`
    query Query($getUserId: String!) {
      getUser(id: $getUserId) {
        id
        username
        email
        name
        surname
        threads {
          id
          title
          description
        }
        messages {
          id
          text
          date
        }
      }
    }
  `;
}
