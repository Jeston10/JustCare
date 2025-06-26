import Image from "next/image";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  const patient = await getPatient(userId);

  if (patient) redirect(`/patients/${userId}/new-appointment`);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <section className="container flex items-center justify-center py-8 sm:py-12">
        <div className="w-full max-w-4xl space-y-8">
          {/* Header */}
          <div className="flex justify-center">
            <Image
              src="/assets/icons/logo-full.svg"
              height={40}
              width={162}
              alt="JustCare Logo"
              className="h-10 w-auto"
            />
          </div>

          {/* Registration Form Card */}
          <div className="rounded-xl border border-border/50 bg-card/50 p-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/30 sm:p-8">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Complete Your Registration
              </h1>
              <p className="mt-2 text-muted-foreground">
                Please provide your health information to complete your patient profile.
              </p>
            </div>
            
            <RegisterForm user={user} />
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground">
            © 2024 JustCare. All rights reserved.
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <div className="hidden lg:block lg:w-1/2">
        <Image
          src="/assets/images/register-img.png"
          height={1000}
          width={1000}
          alt="Patient registration"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
