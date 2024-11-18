# API Documentation

## Overview
The PQC API provides endpoints for user management, transaction handling, and rewards management. All requests must include a valid JWT token in the Authorization header.

## Base URL

[https://api.example.com](https://api.example.com) 


## Endpoints

### User Management

#### Register User
- **POST** `/users/register`
- **Request Body**:
  ```json
  1 {
  2   "username": "string",
  3   "password": "string",
  4   "email": "string"
  5 }
  ```

- **Response**:
- **201 Created**: User registered successfully.
- **400 Bad Request**: Validation errors.
### Login User
- **POST** /users/login
- **Request Body**:
   ```json
   1 {
   2   "username": "string",
   3   "password": "string"
   4 }
   ```
   
- **Response**:
- **200 OK**: Returns JWT token.
- **401 Unauthorized**: Invalid credentials.
### Get User Profile
- **GET** /users/{userId}
- **Headers**:
- **Authorization**: Bearer {token}
- **Response**:
  - **200 OK**: Returns user profile data.
  - **404 Not Found**: User not found.
## Transaction Management
### Create Transaction
- **POST** /transactions
- **Headers**:
- **Authorization**: Bearer {token}
- **Request Body**:
   ```json
   1 {
   2   "amount": "number",
   3   "description": "string"
   4 }
   ```

- **Response**:
  - **201 Created**: Transaction created successfully.
  - **400 Bad Request**: Validation errors.
### Get Transaction History
- **GET** /transactions/history/{userId}
- **Headers**:
  - Authorization: Bearer {token}
- **Response**:
  - **200 OK**: Returns transaction history.
  - **404 Not Found**: User not found.
## Rewards Management
- **Get Rewards**
- **GET** /rewards/{userId}
- **Headers**:
  - Authorization: Bearer {token}
- **Response**:
  - **200 OK**: Returns rewards data.
  - **404 Not Found**: User not found.
**Update Rewards**
- **PUT** /rewards/{userId}
Headers:
- Authorization: Bearer {token}
- **Request Body**:
   ```json
   1 {
   2   "points": "number"
   3 }
   ```
   
- **Response**:
  - **200 OK**: Rewards updated successfully.
  - **400 Bad Request**: Validation errors.

## Conclusion
This API documentation provides a comprehensive overview of the available endpoints and their usage . For further details or updates, please refer to the latest version of this document.

