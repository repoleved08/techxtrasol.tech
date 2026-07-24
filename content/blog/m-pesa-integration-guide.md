---
title: "M-Pesa Integration: Complete Guide for Kenyan Businesses"
description: "Step-by-step guide to integrating M-Pesa payments into your web application, including STK Push, C2B, and B2C transactions."
date: "2026-06-24"
category: "Software Engineering"
readTime: "12 min read"
image: "/content-images/blackspike-wallpaper-04.avif"
---

## Why M-Pesa Integration Matters

M-Pesa processes over KES 30 trillion annually in Kenya. For any business operating in Kenya, M-Pesa integration isn't optional — it's essential. Whether you're building an e-commerce platform, a SaaS billing system, or a financial application, M-Pesa is the payment backbone.

## Getting Started

### Register as a Daraja API Developer
Visit the Safaricom Developer Portal and create an account. You'll get sandbox credentials for testing and production credentials after approval.

### Understand the API Products
- **C2B (Customer to Business)**: Customers pay you via M-Pesa
- **B2C (Business to Customer)**: You disburse payments to customers
- **STK Push (Lipa Na M-Pesa Online)**: Initiate a payment request to the customer's phone
- **Account Balance**: Query your M-Pesa account balance
- **Transaction Status**: Check the status of any transaction

## STK Push Implementation

STK Push is the most common integration. Here's the flow:

1. User enters their phone number at checkout
2. Your server sends an STK Push request to Safaricom
3. User receives a prompt on their phone
4. User enters their M-Pesa PIN
5. Safaricom sends a callback to your server
6. You verify the transaction and fulfill the order

### Key Considerations

- **Timeout handling**: STK Push has a 120-second timeout. Handle both success and timeout gracefully.
- **Callback URL**: Must be HTTPS. Safaricom will retry callbacks, so make your endpoint idempotent.
- **Amount validation**: Always validate amounts server-side. Never trust client-side values.
- **Transaction verification**: After receiving a callback, verify the transaction using the Transaction Status API.

## Security Best Practices

- Store your consumer key and secret in environment variables, never in code
- Use HTTPS for all callback URLs
- Validate and sanitize all inputs from Safaricom callbacks
- Log all transactions for audit trails
- Implement rate limiting to prevent abuse

## Testing

Use the Safaricom sandbox for development. Test success cases, failures, timeouts, and edge cases. The sandbox allows you to simulate different scenarios before going live.
