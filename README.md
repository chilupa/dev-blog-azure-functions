# Posts Server using Azure functions

This application uses Azure functions to implement GraphQL APIs.

## GraphQL playground

https://posts-graphql.azurewebsites.net/api/posts

This application is deployed using [azure-functions](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions) VS code extension.

## Queries

Some of the useful GraphQL queries that have been consumed by the [dev-blog]() UI.

### Get all the posts

```js
query GetPosts {
  getPosts {
    id
    title
    description
    author
    createdAt
  }
}
```

### Get a single post

```js
query GetSinglePost{
  getPost(id:"2aa0b36f-c0d6-431e-87cf-e110684d0341"){
     id
    title
    description
    author
    createdAt
  }
}
```

### Create a post

```js
mutation CreatePost {
  createPost(
    input: {
      title: "React"
      description: "JS Library"
      createdAt: "Feb 17, 2022"
      author: "John Snow"
    }
  ) {
    id
    title
    description
    createdAt
    author
  }
}
```

### Delete a post

```js
mutation DeletePost {
  deletePost(id:"6f009c53-749e-45a5-a15e-73e0dbf84e35"){
    title
  }
}
```
