import { gql } from '@apollo/client';

export const LOG_IN = gql`
  query logIn ($email: String!, $password: String!) {
    accountLogIn(user: { email: $email, password: $password }) {
      userId
      token
      avatar
      userName
      tokenExpiration
      err {
        errorCode
        errorDesc
      }
    }
  }
`

export const ADD_USER = gql`
  mutation addUser( $userName: String! $email: String! $password: String! $avatar: String!) {
    createUser( user: { userName: $userName, email: $email, password: $password, avatar: $avatar } ){
      hasCreated
      err {
        errorCode
        errorDesc
      }
    }
  }
`

export const GET_CONTACTS = gql`
  query getContacts($token: String!){
    getContacts(token: $token){
      contacts {
        _id
        userName
        email
        avatar
      }
    }
  }
`

export const ADD_CONTACT = gql`
  mutation addContact($token: String! $email: String!) {
    createContact(contact: {token: $token,email: $email}) {
      contactHasCreated
      err {
        errorCode
        errorDesc
      }
    }
  }
`