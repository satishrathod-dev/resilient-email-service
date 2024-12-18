<-- Email Service with Retry, Rate Limiting, and Fallback Mechanism -->

This project implements an email sending service using a mock provider, with features such as retry with exponential backoff, rate limiting, idempotency, and fallback between multiple providers. It is built with Node.js and Express.

# Features
Retry with Exponential Backoff: Retries sending emails in case of failure with increasing delay between each retry attempt.
Fallback Mechanism: If the first email provider fails, the service automatically tries to send the email using a second provider.
Idempotency: Prevents sending the same email multiple times by checking if the email was already sent.
Rate Limiting: Ensures emails are not sent too frequently by tracking the last sent time for each unique email.
Basic Logging: Logs key events like sending attempts, failures, and rate limit checks.
Project Setup
Prerequisites
Node.js (>= 14.x)
npm (>= 6.x)
Installation
Clone the repository:
bash
Copy code
git clone https://github.com/your-username/email-service.git
Navigate to the project directory:
bash
Copy code
cd email-service
Install dependencies:
bash
Copy code
npm install
Configuration
There are no additional configuration files required for basic use. The application uses two mock email providers (Provider1 and Provider2), so no actual email accounts are needed.

Running the Application
To start the email service locally, run the following command:

bash
Copy code
npm start
This will start an Express server on http://localhost:5000.

API Endpoint
The main API endpoint to send emails is:

POST /send-email

Request Body:

json
Copy code
{
  "to": "recipient@example.com",
  "subject": "Test Subject",
  "body": "This is a test email body."
}
