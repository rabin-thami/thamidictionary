interface verificationEmailProps {
  email: string;
  fullName: string;
  verifyCode: string;
}

export default function VerificationEmail({
  email,
  fullName,
  verifyCode,
}: verificationEmailProps) {
  return `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8" />
              <title>Email OTP Verification</title>
              <style>
                body {
                  margin: 0;
                  padding: 0;
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                }
          
                .email-wrapper {
                  max-width: 600px;
                  margin: 40px auto;
                  background-color: #ffffff;
                  padding: 30px;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
                }
          
                h2 {
                  color: #333333;
                }
          
                p {
                  color: #555555;
                  font-size: 16px;
                  line-height: 1.6;
                }
          
                .otp-code {
                  font-size: 32px;
                  font-weight: bold;
                  color: #007bff;
                  letter-spacing: 6px;
                  text-align: center;
                  margin: 30px 0;
                }
          
                .footer {
                  margin-top: 30px;
                  font-size: 13px;
                  color: #999999;
                  text-align: center;
                }
          
                @media only screen and (max-width: 600px) {
                  .email-wrapper {
                    padding: 20px;
                  }
          
                  .otp-code {
                    font-size: 28px;
                  }
                }
              </style>
            </head>
            <body>
              <div class="email-wrapper">
                <h2>Email Verification Code</h2>
                <p>Hello <strong>${fullName}</strong>,</p>
                <p>We received a request to verify your email address. Please use the following OTP code to complete the process:</p>
          
                <div class="otp-code">${verifyCode}</div>
          
                <p>This OTP is valid for the next 10 minutes. Do not share it with anyone.</p>
                <p>If you did not request this, please ignore this email or contact support.</p>
          
                <div class="footer">
                  &copy; 2025 Your Company. All rights reserved.
                </div>
              </div>
            </body>
          </html>
          `;
}
