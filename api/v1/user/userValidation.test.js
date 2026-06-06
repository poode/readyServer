const { validateUser } = require('./userValidation');

describe('validateUser', () => {
  const validUser = {
    username: 'johndoe',
    email: 'john@example.com',
    password: 'secret12',
    firstName: 'John',
    lastName: 'Doe',
  };

  it('accepts a valid user payload', () => {
    const { error } = validateUser(validUser);
    expect(error).toBeUndefined();
  });

  it('rejects a password shorter than 8 characters', () => {
    const { error } = validateUser({ ...validUser, password: '123' });
    expect(error).toBeDefined();
  });

  it('rejects an invalid email', () => {
    const { error } = validateUser({ ...validUser, email: 'not-an-email' });
    expect(error).toBeDefined();
  });
});
