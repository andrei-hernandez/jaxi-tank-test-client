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

export const UPDATE_USER = gql`
  mutation updateUser($token: String!, $userName: String!, $avatar: String!) {
    editUser(user: { token: $token,userName: $userName,avatar: $avatar }) {
      userHasUpdated
      err {
        errorCode
        errorDesc
      }
    }
  }
`

export const DELETE_USER = gql`
  mutation deleteContact($token: String!,$email: String!) {
    deleteContact(contact: { token: $token, email:$email }) {
      contactHasDeleted
      err {
        errorCode
        errorDesc
      }
    }
  }
`

export const GET_PROYECTS = gql`
  query getProyects($token: String!) {
    getProyects(token: $token) {
      proyects {
        id
        title
        creator {
          id
          userName
          avatar
          email
        }
        members {
          email
          avatar
          role
        }
        tasks {
          id
          proyectId
          title
          members {
            email
            avatar
          }
          status
          startAt
          endsAt
          createdAt
          updatedAt
        }
        startAt
        endsAt
        createdAt
        updatedAt
      }
      err {
        errorCode
        errorDesc
      }
    }
  }
`

export const ADD_PROYECT = gql`
  mutation addProyect( $token: String!, $title: String!, $members: [String!]!, $creator: String!, $startAt: String!, $endsAt: String!) {
    createProyect(proyect: {token: $token, title: $title, members: $members, creator: $creator, startAt: $startAt, endsAt: $endsAt}) {
      proyectHasCreated
      err {
        errorCode
        errorDesc
      }
    }
  }
`

export const GET_ONE_PROYECT = gql`
  query getOneProyect ($token: String!, $proyectId: String!) {
    getOneProyect(proyect: {token: $token, proyectId: $proyectId}) {
      proyect {
        id
        title
        creator {
          id
          userName
          avatar
          email
        }
        members {
          id
          email
          avatar
          role
        }
        tasks {
          id
          proyectId
          title
          members {
            id
            email
            avatar
          }
          status
          startAt
          endsAt
          createdAt
          updatedAt
        }
        startAt
        endsAt
        createdAt
        updatedAt
      }
    }
  }
`
export const ADD_PROYECT_MEMBER = gql`
  mutation addMember($token: String!, $proyectId: String!, $email: String!, $role: String!) {
    addMember(member: {token: $token, proyectId: $proyectId, email: $email, role: $role}) {
      memberHasAdded
      err {
        errorCode
        errorDesc
      }
    }
  }
`

export const UPDATE_PROYECT = gql`
  mutation updateProyect($token: String!, $proyectId: ID!, $title: String!, $startAt: String!, $endsAt: String!) {
    editProyect(proyect: {token: $token, proyectId: $proyectId, title: $title, startAt: $startAt, endsAt: $endsAt}) {
      proyectHasUpdated
      err {
        errorCode
        errorDesc
      }
    }
  }
`

export const GET_ONE_TASK = gql`
  query getOneTask($token: String!, $taskId: String!) {
    getOneTask(task: { token: $token, taskId: $taskId }) {
      task {
        id
        proyectId
        title
        description
        members {
          id
          email
          avatar
        }
        status
        startAt
        endsAt
        createdAt
        updatedAt
      }
    }
  }
`

export const ADD_TASK_MEMBER = gql`
  mutation createTaskMember($token: String!, $memberEmail: ID!, $taskId: ID!) {
    addTaskMember(member: {token: $token, memberEmail: $memberEmail, taskId: $taskId}) {
      memberHasAdded
      err {
        errorCode
        errorDesc
      }
    }
  }
`