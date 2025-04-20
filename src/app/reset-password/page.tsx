import ResetPasswordForm from '@/app/components/auth/ResetPasswordForm';

export const metadata = {
  title: 'Reset Password | MyApp',
};

export default function ResetPasswordPage() {
  return (
    <div className="reset-password-container">
      <ResetPasswordForm />
    </div>
  );
}
