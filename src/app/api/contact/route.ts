// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  console.log('Contact API route called');
  
  try {
    // Parse request body
    const body = await req.json();
    console.log('Received data:', body);
    
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // For now, just log the data and return success
    console.log('Contact form submission:', { name, email, message });
    
    // Check if environment variables are set
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    
    console.log('Environment check:', {
      EMAIL_USER: emailUser ? 'Set' : 'Not set',
      EMAIL_PASS: emailPass ? 'Set' : 'Not set'
    });

    // If environment variables are not set, we can't send email
    if (!emailUser || !emailPass) {
      console.warn('Email credentials not configured - returning success without sending email');
      return NextResponse.json(
        { 
          message: 'Message received (email service not configured)',
          warning: 'Email credentials not set in environment variables'
        },
        { status: 200 }
      );
    }
    try {
    // Try to import and use nodemailer only if it's installed
      // nodemailer is now imported at the top of the file
      
      // Create transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      // Email options
      const mailOptions = {
        from: `"${name}" <${emailUser}>`,
        to: 'aliabdullah656561@gmail.com',
        replyTo: email,
        subject: `Portfolio Contact: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #00d9ff; padding-bottom: 10px;">
              New Portfolio Contact
            </h2>
            <div style="padding: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
            </div>
          </div>
        `,
      };

      // Send email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);

      return NextResponse.json(
        { 
          message: 'Email sent successfully',
          messageId: info.messageId 
        },
        { status: 200 }
      );
      
    } catch (emailError) {
      console.error('Error with email service:', emailError);
      
      // If nodemailer is not installed or email fails, still return success
      // This allows the form to work during development
      return NextResponse.json(
        { 
          message: 'Message received (email service error)',
          error: emailError instanceof Error ? emailError.message : 'Unknown error'
        },
        { status: 200 }
      );
    }

  } catch (error) {
    console.error('Error in contact API route:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}