import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type EmailMethod = "verify" | "reset";

interface EmailContent {
  subject: string;
  html: string;
}

const getEmailContent = (method: EmailMethod, token: string): EmailContent => {
  const baseUrl = process.env.NEXTAUTH_URL;

  switch (method) {
    case "verify":
      return {
        subject: "Verify your account",
        html: `<p>Click <a href="${baseUrl}/auth/verification?token=${token}">HERE</a> to verify your account.</p>`,
      };
    case "reset":
      return {
        subject: "Reset your password",
        html: `<p>Click <a href="${baseUrl}/auth/reset?token=${token}">HERE</a> to reset your password.</p>`,
      };
    default:
      throw new Error(`Invalid email method: ${method}`);
  }
};

export const mailer = async (
  email: string,
  token: string,
  method: EmailMethod,
): Promise<void> => {
  const { subject, html } = getEmailContent(method, token);

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject,
    html,
  });
};
