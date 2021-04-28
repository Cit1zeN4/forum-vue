import gql from "graphql-tag";

export function getThreadMessages() {
  return gql`
    query Query($getThreadMessagesId: String!) {
      getThreadMessages(id: $getThreadMessagesId) {
        id
        text
        date
      }
    }
  `;
}

export function subscribeMessageQuery() {
  return gql`
    subscription Subscription {
      newMessage {
        id
        text
        date
      }
    }
  `;
}
