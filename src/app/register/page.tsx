import RegisterForm from '@/app/components/auth/RegisterForm';

export const metadata = {
  title: 'Register | MyApp',
};

export default function RegisterPage() {
  return (
    <div className="register-container">
      <RegisterForm />
    </div>
  );
}
