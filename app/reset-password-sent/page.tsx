import { openSans } from "../fonts";

export default function PasswordResetSent() {
  return (
    <div className="flex flex-col items-center h-screen mx-4 lg:w-1/2 lg:mx-auto">
      <div
        className={`my-auto w-4/5 text-center text-2xl ${openSans.className}`}
      >
        Your password reset link has been sent to your email! Follow the
        instructions in the email to continue the process.
      </div>
    </div>
  );
}
