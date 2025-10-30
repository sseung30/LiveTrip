import RegistrationForm from "@/domain/registration/_components/RegistrationForm";

export default function RegistrationPage() {
  return (
    <div className="mx-auto w-full">
      {/* Cancel layout padding then apply exact spec padding */}
      <div className="-mx-6 md:-mx-8">
        <div className="mx-auto w-full max-w-[700px] box-content">
          <h1 className="text-2xl font-semibold mb-6">체험 등록</h1>
          <RegistrationForm mode="create" />
        </div>
      </div>
    </div>
  );
}
