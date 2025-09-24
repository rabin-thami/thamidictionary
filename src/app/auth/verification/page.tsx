"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, CircleX, Loader2 } from "lucide-react";
import { signupVerificationAction } from "@/action";
import type { StatusMessage } from "@/types";

const VerificationPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [message, setMessage] = useState<StatusMessage | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setMessage({ type: "error", message: "Verification token is missing" });
        setIsVerified(false);
        setIsLoading(false);
        return;
      }

      try {
        const data = await signupVerificationAction(token);

        if (data?.error) {
          setMessage({ type: "error", message: data.error });
          setIsVerified(false);
        } else {
          setMessage({
            type: "success",
            message: data.success || "Verification successful!",
          });
          setIsVerified(true);
        }
      } catch (err) {
        setMessage({
          type: "error",
          message: "Something went wrong. Please try again.",
        });
        setIsVerified(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleRedirect = () => {
    router.push("/auth/login");
  };

  setTimeout(handleRedirect, 3000);

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {isLoading ? (
              <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
            ) : isVerified ? (
              <CheckCircle2 className="h-12 w-12 text-green-500 animate-pulse" />
            ) : (
              <CircleX className="h-12 w-12 text-red-500" />
            )}
          </div>

          <CardTitle className="text-2xl font-bold">
            {isLoading
              ? "Verifying..."
              : isVerified
                ? "Success!"
                : "Verification Failed"}
          </CardTitle>

          <CardDescription>
            {isLoading
              ? "Please wait while we verify your account..."
              : message?.message ||
                "Unable to verify your account at this time."}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center space-y-4">
          {isLoading && (
            <div className="w-full space-y-2">
              <div className="h-2 bg-gray-200 rounded-full animate-pulse dark:bg-gray-700"></div>
              <div className="h-2 bg-gray-200 rounded-full animate-pulse dark:bg-gray-700"></div>
              <div className="h-2 bg-gray-200 rounded-full animate-pulse dark:bg-gray-700"></div>
            </div>
          )}

          {!isLoading && (
            <Button onClick={handleRedirect} className="w-full mt-4">
              {isVerified ? "Go to Login" : "Try Again"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationPage;
