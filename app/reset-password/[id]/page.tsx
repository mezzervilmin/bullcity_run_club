import SubmitForm from "./components/submitForm";

export default async function PasswordReset({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="flex flex-col items-center h-screen mx-4 lg:w-1/2 lg:mx-auto">
      <SubmitForm id={id} />
    </div>
  );
}
