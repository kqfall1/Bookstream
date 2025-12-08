// Adjust path as needed
const { getErrorMessage } = require('./dbErrorHandler.js'); // No .js extension needed

describe('getErrorMessage', () => {
  test('handles MongoDB duplicate key error (code 11000)', () => {
    const mockErr = {
      code: 11000,
      message: 'E11000 duplicate key error collection: test index: test.$email_1 dup key: { email: "test@example.com" }'
    };
    const result = getErrorMessage(mockErr);
    expect(result).toBe('Email already exists');
  });

  test('handles Mongoose validation error (no code)', () => {
    const mockErr = {
      errors: {
        email: { message: 'Email is required' }
      }
    };
    const result = getErrorMessage(mockErr);
    expect(result).toBe('Email is required');
  });
});

