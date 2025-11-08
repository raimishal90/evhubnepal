# Forgot Password Feature

This document describes the forgot password functionality implemented in EVHubNepal.

## Overview

The forgot password feature allows users to reset their password if they've forgotten it. The implementation follows security best practices and includes token-based password reset with expiration.

## User Flow

1. **Request Reset**: User navigates to `/forgot-password` and enters their email address
2. **Token Generation**: System generates a secure random token and stores it in the database
3. **Email Notification**: System sends an email with a reset link (currently logged to console in development)
4. **Reset Password**: User clicks the link with token and is taken to `/reset-password?token=XXX`
5. **Enter New Password**: User enters and confirms their new password
6. **Password Updated**: System validates the token and updates the password
7. **Login**: User can now log in with their new password

## API Endpoints

### POST /user/forgot-password

Request a password reset token.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "status": true,
  "message": "If an account with that email exists, a password reset link has been sent.",
  "data": {
    "message": "Password reset email sent"
  }
}
```

**Security Notes:**
- Returns the same response whether the email exists or not (prevents email enumeration)
- Invalidates all previous unused tokens for the user
- Token is logged to console in development mode

### POST /user/reset-password

Reset password using a valid token.

**Request Body:**
```json
{
  "token": "secure-random-token-here",
  "password": "newPassword123"
}
```

**Response:**
```json
{
  "status": true,
  "message": "Password has been reset successfully. You can now log in with your new password.",
  "data": {
    "message": "Password reset successful"
  }
}
```

**Error Response:**
```json
{
  "status": false,
  "message": "Invalid or expired reset token."
}
```

## Security Features

### Token Security
- Tokens are generated using `crypto.randomBytes(32)` for cryptographic randomness
- Tokens are 64 characters long (32 bytes in hex)
- Each token is unique and stored with a unique constraint in the database

### Token Expiration
- Tokens expire after 1 hour
- Expired tokens are automatically rejected

### One-Time Use
- Tokens can only be used once
- After a successful password reset, the token is marked as used
- Used tokens are rejected on subsequent attempts

### Password Security
- Passwords are hashed using bcrypt before storage
- Minimum password length of 6 characters enforced on the frontend and backend
- Password confirmation required on the frontend

### Email Enumeration Protection
- Same response message returned regardless of whether the email exists
- Prevents attackers from discovering valid email addresses

### Token Invalidation
- When a user requests a new reset token, all previous unused tokens are invalidated
- Prevents accumulation of valid tokens

## Database Schema

```sql
CREATE TABLE "PasswordResetToken" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");
```

## Frontend Pages

### /forgot-password
- Email input form
- Calls POST /user/forgot-password
- Shows success message after submission
- Provides link back to login page

### /reset-password
- Reads token from URL query parameter
- Password and confirm password inputs with visibility toggle
- Validates passwords match and meet minimum length
- Calls POST /user/reset-password
- Redirects to login page after successful reset

## Future Enhancements

1. **Email Service Integration**: Currently tokens are logged to console. In production, integrate with an email service like:
   - SendGrid
   - AWS SES
   - Mailgun
   - Nodemailer with SMTP

2. **Rate Limiting**: Add rate limiting to prevent abuse:
   - Limit password reset requests per email
   - Limit password reset attempts per IP

3. **Custom Email Templates**: Create branded HTML email templates for password reset

4. **Additional Security**: 
   - Add CAPTCHA to forgot password form
   - Log password reset attempts for audit trail
   - Notify users via email when password is changed

## Testing

To test the feature:

1. Start the API: `cd api && npm run start:dev`
2. Start the frontend: `cd web && npm run dev`
3. Navigate to http://localhost:3000/forgot-password
4. Enter a valid email address
5. Check the API console logs for the reset token and link
6. Copy the reset link and paste it in browser
7. Enter a new password
8. Verify you can log in with the new password

## Configuration

Environment variables (in api/.env):
- `JWT_SECRET`: Used for JWT token generation (not directly used in password reset)
- `PWD_SECRET`: Used for password hashing (optional, bcrypt handles this)

No additional configuration required for the forgot password feature.
