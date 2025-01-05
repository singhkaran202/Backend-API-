# Transaction API

A NodeJS application for managing user transactions with MongoDB.

## Features

- Get user details by ID
- Get user transactions with filters
- Get all transactions with user details and filters
- Pagination support
- MongoDB aggregation framework implementation
- Input validation
- Error handling

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd [project-directory]
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

4. Seed the database:
```bash
node src/utils/seedData.js
```
5. **Test Endpoints**
Test each endpoint with different query parameters:

a) Get User:
```
GET {{baseUrl}}/api/users/:id
```

b) Get User Transactions:
```
GET {{baseUrl}}/api/users/:id/transactions?status=success&type=credit
```

c) Get All Transactions:
```
GET {{baseUrl}}/api/transactions?fromDate=2024-01-01&toDate=2024-01-31
```

## API Documentation

### 1. Get User by ID
```
GET /api/users/:id
```
Parameters:
- `id`: MongoDB ObjectId of the user

### 2. Get User Transactions
```
GET /api/users/:id/transactions
```
Parameters:
- `id`: MongoDB ObjectId of the user
Query Parameters:
- `status`: (optional) success/pending/failed
- `type`: (optional) debit/credit
- `fromDate`: (optional) ISO date string
- `toDate`: (optional) ISO date string
- `page`: (optional) page number (default: 1)
- `limit`: (optional) items per page (default: 10)

### 3. Get All Transactions
```
GET /api/transactions
```
Query Parameters:
- `status`: (optional) success/pending/failed
- `type`: (optional) debit/credit
- `fromDate`: (optional) ISO date string
- `toDate`: (optional) ISO date string
- `page`: (optional) page number (default: 1)
- `limit`: (optional) items per page (default: 10)

## Error Handling

The API implements comprehensive error handling for:
- Invalid ObjectId format
- Invalid date formats
- Invalid status or type values
- Missing required parameters
- Database connection errors

## Development

Run the application in development mode:
```bash
npm run dev
```

## Testing

Import the Postman collection from the `postman` directory to test the APIs.

## Deployment

The application is deployed on [Render] and can be accessed at [(https://backend-api-7b6x.onrender.com/)].
