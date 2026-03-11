const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Set CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
      console.error('❌ Missing environment variables:', {
        EMAIL_USER: process.env.EMAIL_USER ? '✓ set' : '✗ missing',
        EMAIL_PASS: process.env.EMAIL_PASS ? '✓ set' : '✗ missing',
        EMAIL_TO: process.env.EMAIL_TO ? '✓ set' : '✗ missing',
      });

      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({
          message: 'Server configuration error: Missing email credentials. Please set EMAIL_USER, EMAIL_PASS, and EMAIL_TO in Netlify environment variables.',
          debug: 'Environment variables not configured',
        }),
      };
    }

    // Parse and validate form data
    const { name, email, message } = JSON.parse(event.body || '{}');

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          message: 'Validation error',
          details: `Missing fields: ${!name ? 'name' : ''} ${!email ? 'email' : ''} ${!message ? 'message' : ''}`.trim(),
        }),
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ message: 'Invalid email format' }),
      };
    }

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify transporter connection
    await transporter.verify();
    console.log('✓ Email server connection verified');

    // Email to yourself
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `Portfolio Contact: Message from ${name}`,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Sent at: ${new Date().toLocaleString()}</small></p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email sent successfully. Message ID:', info.messageId);

    return {
      statusCode: 201,
      headers: corsHeaders,
      body: JSON.stringify({
        message: 'Message sent successfully! ✓',
        messageId: info.messageId,
      }),
    };
  } catch (error) {
    console.error('❌ Contact form error:', {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });

    // Provide specific error messages for common issues
    let errorMessage = 'Error sending message. Please try again later.';
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Check your Gmail credentials and app password.';
    } else if (error.code === 'ECONNREFUSED') {
      errorMessage = 'Cannot connect to email server. Check your internet connection.';
    } else if (error.message.includes('Invalid login')) {
      errorMessage = 'Invalid email credentials. Make sure EMAIL_USER and EMAIL_PASS are correct.';
    }

    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        message: errorMessage,
        error: error.message,
      }),
    };
  }
};
