import ForgotPasswordForm from '@/app/components/auth/ForgotPasswordForm';

export const metadata = {
  title: 'Forgot Password | MyApp',
};

export default function ForgotPasswordPage() {
  return (
    <div className="forgot-password-container">
      <ForgotPasswordForm />
    </div>
  );
}
