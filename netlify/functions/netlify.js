// This file helps with environment variable handling in Netlify

exports.handler = async function(event, context) {
  // Return environment variables that are safe to expose to the client
  // Do NOT include sensitive information like API keys or database credentials
  return {
    statusCode: 200,
    body: JSON.stringify({
      environment: process.env.NODE_ENV || 'development',
      deployTime: new Date().toISOString()
    })
  };
};