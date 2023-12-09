# Bank Statement Generation

## Overview

This project provides a set of services to generate a PDF bank statement for users within a specified date range.


## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Built With](#built-with)

## Getting Started

### Prerequisites

visual studio code

### Installation

```bash
# Example installation commands
git clone https://github.com/Abdul-Rahman99/bank-statement-generation.git
cd bank-statement
npm i
```

----------------------------------------------------------------------------------------
## Usage


### 1. Running Locally

To run the application locally, follow these steps:

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/Abdul-Rahman99/bank-statement-generation.git
    cd your-project
    ```

2. Install the dependencies:

    ```bash
    npm i
    ```

3. Start the application:

    ```bash
    npm start || nodeman: start
    ```

4. Config your env: 
PORT: The server port. Default is 3000.
SMTP_EMAIL: Your email address for sending statements.
SMTP_PASSWORD: Your email password or App Password for SMTP.

5. Open your web browser and visit [http://localhost:3000](http://localhost:3000) to access the application.



## API Endpoints
### 2. Making API Requests

#### Create a New pdf and send it to the user Email
To create a new pdf:

- **Endpoint:** `/generate-statement`
- **Method:** `POST`
- **Request:**
  ```json
  {
    "userEmail": "user@example.com",
    "fromDate": "2023-01-01",
    "toDate": "2023-01-31"
  }
  ```
  - **Response:**
  The server will generate the bank statement PDF and send it to the specified email address.

----------------------------------------------------------------------------------------

## Folder Structure

bank-statement/
  ├── database/
  ├── middlewares/
  ├── routes/
  ├── services/
  ├── utils/
  ├── server.js
  ├── README.md
  ├── config.env
  └── .gitignore


----------------------------------------------------------------------------------------

### Built With

Node.js, 
Express.js,
csv-parser.

### third-party libraries:
  body-parser,
  dotenv, 
  nodemailer, 
  express, 
  express-validator,  
  morgan, 
  nodemon, 
  pdfkit.,
  uuid.

-----------------------------------------------------------------------------------------------------------