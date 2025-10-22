import RegistrationForm from "@/domain/registration/_components/RegistrationForm";

export default function RegistrationPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-0 py-8">
      <h1 className="text-2xl font-semibold mb-6">체험 등록</h1>
      <RegistrationForm />
    </div>
  );
}