# Askit

Quora like platform where user can post questions and other user can answer it, also they are allowed to like the posts.
ItsaA full-stack web application built with **Django (backend)** and **React (frontend)**, containerized using Docker and orchestrated with Docker Compose.

## Tech Stack

- **Backend:** Django + Django REST Framework (Python)
- **Frontend:** React + Axios
- **Database:** (Add if you're using PostgreSQL, SQLite, etc.)
- **Containerization:** Docker
- **Orchestration:** Docker Compose
- **Web Server (Frontend):** Nginx

## Key Features

- User registration and login
- Authentication via simplejwt
- API integration with React frontend
- Dockerized development environment

## Getting Started

### 1. Clone the Repository

- git https://github.com/skumar5011987/askit.git
- cd askit folder

### 2. Build and Run the App

- **Start the containers**

  - docker-compose up --build -d

- **Stop and remove containers, network, volumes**
  - docker-compose down -v

## API Endpoints

### 1. Frontend Home page

- URL: http://127.0.0.1:3000/
- Mtehod: GET

### 2. Sign-Up

- Backend URL: http://127.0.0.1:8000/api/auth/sign-up/
- Method: POST
- Request Body:

```json
{
  "username": "yogi",
  "email": "yogi@test.com",
  "password": "123456",
  "confirm_password": "123456"
}
```

- Response:

```json
{
  "username": "ram",
  "email": "ram@test.com"
}
```

### 3. Sign IN

- Backend URL: http://127.0.0.1:8000/api/auth/sign-up/
- Method: POST
- Request Body:

```json
{
  "username": "yogi",
  "password": "123456"
}
```

- Response:

```json
{
  "message": "ok",
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NDI2Nzc3OCwiaWF0IjoxNzQ0MTgxMzc4LCJqdGkiOiI0ZWNjOWY5ZmNkNjY0MGExYWY5ZmM4MmNiODkzMWE0ZCIsInVzZXJfaWQiOjN9.zOHgiVI_NJO1ihl8qxqV3A4NxYkusoCkU7XENQdIhls",
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ0MTgxNjc4LCJpYXQiOjE3NDQxODEzNzgsImp0aSI6ImI2ZWM5ODhhNWEwYzRmODBiODczNGI4ZDY0NTIzNzU4IiwidXNlcl9pZCI6M30.j1ZEtsvOqIlBU5u_3fkBxqfYDW8Zm-42La3I7mt-JCc",
  "user": {
    "id": 3,
    "username": "yogi",
    "email": "yogi@test.com"
  }
}
```

### 4. Get All Posts

- Backend URL: http://127.0.0.1:8000/api/posts/
- Method: GET
- Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ0MTgxNjc4LCJpYXQiOjE3NDQxODEzNzgsImp0aSI6ImI2ZWM5ODhhNWEwYzRmODBiODczNGI4ZDY0NTIzNzU4IiwidXNlcl9pZCI6M30.j1ZEtsvOqIlBU5u_3fkBxqfYDW8Zm-42La3I7mt-JCc"
- Response:

```json
[
  {
    "id": "910690b9-fde0-4708-bb25-8a2c457ffd9e",
    "author": "user1",
    "is_post": true,
    "post": "You can follow this link : https://medium.com/@supportfly/how-to-install-docker-on-windows-bead8c658a68",
    "response_to": null,
    "total_likes": 1,
    "created_at": "2025-04-08T07:03:09.584480Z",
    "responses": []
  },
  {
    "id": "de344eff-6dcc-4d43-90a3-cd6e5fef1f21",
    "author": "user1",
    "is_post": true,
    "post": "How to install Redis in windows?",
    "response_to": null,
    "total_likes": 1,
    "created_at": "2025-04-08T06:42:26.201628Z",
    "responses": [
      {
        "id": "4f40fa5b-20f1-44c0-af35-bd31399f86c8",
        "author": "jenny",
        "is_post": false,
        "post": "Follow this page, it will help you to install Redis on windows machine:\nhttps://redis.io/blog/install-redis-windows-11/",
        "response_to": "de344eff-6dcc-4d43-90a3-cd6e5fef1f21",
        "total_likes": 2,
        "created_at": "2025-04-08T07:22:26.498487Z",
        "responses": []
      }
    ]
  },
  {
    "id": "2ac87a5f-4273-4282-903f-40bbaa0750cd",
    "author": "jenny",
    "is_post": true,
    "post": "How to install docker step by step?",
    "response_to": null,
    "total_likes": 0,
    "created_at": "2025-04-07T15:58:32.298988Z",
    "responses": [
      {
        "id": "3663b42a-659e-439e-9d25-07f1a0058b5c",
        "author": "user1",
        "is_post": false,
        "post": "You can follow this link : https://medium.com/@supportfly/how-to-install-docker-on-windows-bead8c658a68",
        "response_to": "2ac87a5f-4273-4282-903f-40bbaa0750cd",
        "total_likes": 1,
        "created_at": "2025-04-08T07:15:57.839346Z",
        "responses": [
          {
            "id": "8583ec8d-53db-4094-80b9-0b6f9f6061c0",
            "author": "user1",
            "is_post": false,
            "post": "I think following official doc is better option: https://www.docker.com/get-started/",
            "response_to": "3663b42a-659e-439e-9d25-07f1a0058b5c",
            "total_likes": 2,
            "created_at": "2025-04-08T07:17:59.956437Z",
            "responses": [
              {
                "id": "b7094d0a-bacd-4135-9e61-0c7408240078",
                "author": "jenny",
                "is_post": false,
                "post": "Thank you.",
                "response_to": "8583ec8d-53db-4094-80b9-0b6f9f6061c0",
                "total_likes": 0,
                "created_at": "2025-04-08T07:23:19.057646Z",
                "responses": []
              }
            ]
          }
        ]
      },
      {
        "id": "0bc42deb-c034-420a-9fc5-59f4c172337f",
        "author": "sam",
        "is_post": false,
        "post": "you can follow this post at linkedin: \"https://www.linkedin.com/pulse/step-guide-how-install-docker-windows-1011-shashank-abhishek/\"",
        "response_to": "2ac87a5f-4273-4282-903f-40bbaa0750cd",
        "total_likes": 0,
        "created_at": "2025-04-08T09:19:00.914672Z",
        "responses": []
      }
    ]
  }
]
```

### 5. Get My Posts

- Backend URL: http://127.0.0.1:8000/api/posts/?mine=true
- Method: GET
- Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ0MTgxNjc4LCJpYXQiOjE3NDQxODEzNzgsImp0aSI6ImI2ZWM5ODhhNWEwYzRmODBiODczNGI4ZDY0NTIzNzU4IiwidXNlcl9pZCI6M30.j1ZEtsvOqIlBU5u_3fkBxqfYDW8Zm-42La3I7mt-JCc"
- Response:

```json
[
  {
    "id": "910690b9-fde0-4708-bb25-8a2c457ffd9e",
    "author": "user1",
    "is_post": true,
    "post": "You can follow this link : https://medium.com/@supportfly/how-to-install-docker-on-windows-bead8c658a68",
    "response_to": null,
    "total_likes": 1,
    "created_at": "2025-04-08T07:03:09.584480Z",
    "responses": []
  },
  {
    "id": "de344eff-6dcc-4d43-90a3-cd6e5fef1f21",
    "author": "user1",
    "is_post": true,
    "post": "How to install Redis in windows?",
    "response_to": null,
    "total_likes": 1,
    "created_at": "2025-04-08T06:42:26.201628Z",
    "responses": [
      {
        "id": "4f40fa5b-20f1-44c0-af35-bd31399f86c8",
        "author": "jenny",
        "is_post": false,
        "post": "Follow this page, it will help you to install Redis on windows machine:\nhttps://redis.io/blog/install-redis-windows-11/",
        "response_to": "de344eff-6dcc-4d43-90a3-cd6e5fef1f21",
        "total_likes": 2,
        "created_at": "2025-04-08T07:22:26.498487Z",
        "responses": []
      }
    ]
  }
]
```

### 6. Post/Create a Question

- Backend URL: http://127.0.0.1:8000/api/posts/
- Method: POST
- Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ0MTgyMjAyLCJpYXQiOjE3NDQxODE5MDIsImp0aSI6ImZjZDJmNzk3OGJjMzRlMWZhYjgyOGQ5NTYzZjE4MmFjIiwidXNlcl9pZCI6NX0.r5iH8HNUNrVu6snaAZwEijKLW3VikkEj-gHrXpxTs6Q"
- Request Body:

```json
{
  "post": "How can Containerize a Django application, please help me."
}
```

- Response

```json
{
  "id": "52f18551-20e4-4902-9d52-af0fddb5d7c6",
  "author": "user1",
  "is_post": true,
  "post": "Command to create a react application",
  "response_to": null,
  "total_likes": 0,
  "created_at": "2025-04-09T07:04:54.460483Z",
  "responses": []
}
```

### 7. Reply to a Question

- Backend URL: http://127.0.0.1:8000/api/posts/
- Method: POST
- Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ0MTgyNzE3LCJpYXQiOjE3NDQxODI0MTcsImp0aSI6IjZjMTEyMmRlYzBhZDQwNDQ5MzFlZjRjYjM0OTc3OTIyIiwidXNlcl9pZCI6NH0.xfM9tl1DkmO9TO03R3dCu83tZybCHE2YyQMgp4Wc8w4"
- Request Body:

```json
{
  "response_to": "52f18551-20e4-4902-9d52-af0fddb5d7c6",
  "post": "use 'npx create-react-app myreactapp'"
}
```

- Response:

```json
{
  "id": "99e731b4-c201-475f-97d0-5ce297ec117b",
  "author": "jenny",
  "is_post": false,
  "post": "use 'npx create-react-app myreactapp'",
  "response_to": "52f18551-20e4-4902-9d52-af0fddb5d7c6",
  "total_likes": 0,
  "created_at": "2025-04-09T07:08:02.955880Z",
  "responses": []
}
```

### 8. Like a post
- Backend URL: http://127.0.0.1:8000/api/posts/
- Method: PUT
- Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ0MTgzMTUyLCJpYXQiOjE3NDQxODI4NTIsImp0aSI6IjNhMDRlMGQ1YjJlYzQ0YmE5NmFhNDliMzc4ZWU5OTBjIiwidXNlcl9pZCI6M30.WE5qzTtk3qmZJtyijpTsTMS6KIpz2TDSByrFBTiokR8"
- Request Body:
```json
{
    "response_to": "99e731b4-c201-475f-97d0-5ce297ec117b"
}
```
- Response:
```json
{
    "post_id": "99e731b4-c201-475f-97d0-5ce297ec117b",
    "liked": true,
    "total_likes": 2,
    "liked_by": [
        "yogi",
        "samar"
    ]
}
```

**Thank you**