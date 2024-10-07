// config/plugins.js
module.exports = ({ env }) => ({
    // ... other plugin configs ...
    'users-permissions': {
      config: {
        jwt: {
          expiresIn: '7d',
        },
      },
    },
  });