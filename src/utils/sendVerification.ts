import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
import VerificationEmail from "../../emails/verification";
import { ApiResponseType } from "@/types/ApiResponseType";
import { createResponseMessage } from "@/utils/ApiResponse";
import { logError, logInfo } from "@/utils/logger";

export async function sendVerificationEmail(
  email: string,
  fullName: string,
  verifyCode: string
): Promise<ApiResponseType> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: `Hello ${fullName}`,
      html: VerificationEmail({ email, fullName, verifyCode }),
    });
    logInfo("Verification email sent successfully");
    return createResponseMessage(
      "Verification code send successfully",
      200,
      "EMAIL_SENT_SUCCESSFULLY"
    );
  } catch (error) {
    logError("Error sending verification email", error);
    return createResponseMessage(
      "Failed to send verification email",
      500,
      "FAILED_TO_SENT_EMAIL"
    );
  }
}
