// Keeping credentials here rather than hardcoding them in tests.
// In a real project these would come from env vars or a secrets manager.
export const users = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  invalidPassword: {
    username: 'standard_user',
    password: 'wrong_password',
  },
};

export const errorMessages = {
  locked: 'Epic sadface: Sorry, this user has been locked out.',
  invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
};
