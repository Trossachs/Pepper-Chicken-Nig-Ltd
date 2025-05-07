// Netlify function to handle contact form submissions
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
    const { name, email, phone, message } = data;
    
    // Basic validation
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          success: false,
          message: "Name, email, and message are required"
        })
      };
    }

    // In a real application, you would:
    // 1. Save to a database
    // 2. Send an email notification
    // 3. Set up some form of notification
    
    // For now, we'll just simulate successful submission
    console.log("Contact form submission:", { name, email, phone, message });
    
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        success: true,
        message: "Thank you for contacting us! We'll get back to you soon."
      })
    };
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