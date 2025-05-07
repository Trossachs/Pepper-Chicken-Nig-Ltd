// Netlify function to handle admin authentication
exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method not allowed" })
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { username, password } = data;

    // Simple authentication check - in a real app, use proper encryption/hashing
    if (username === "admin" && password === "pepperchicken2023") {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          success: true,
          message: "Authentication successful",
          user: {
            id: 1,
            username: "admin",
            role: "admin"
          }
        })
      };
    } else {
      return {
        statusCode: 401,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          success: false,
          message: "Invalid username or password"
        })
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        success: false,
        message: "Server error: " + error.message
      })
    };
  }
};