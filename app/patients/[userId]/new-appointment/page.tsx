import Image from "next/image";
import Link from "next/link";

import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { Button } from "@/components/ui/button";
import { getPatient } from "@/lib/actions/patient.actions";
import { NewsSection } from "@/components/NewsSection";

const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);
  
  console.log("Patient data:", patient);
  console.log("Patient ID:", patient?.$id);

  if (!patient) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <section className="container flex items-center justify-center py-8 sm:py-12">
          <div className="w-full max-w-2xl space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <Image
                src="/assets/icons/logo-full.svg"
                height={40}
                width={162}
                alt="JustCare Logo"
                className="h-10 w-auto"
              />
              <Button variant="outline" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Return to Home
                </Link>
              </Button>
            </div>
            
            {/* Error Card */}
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <svg className="h-6 w-6 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Patient Not Found</h2>
              <p className="text-muted-foreground">
                No patient record found for this user. Please complete your registration first.
              </p>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-muted-foreground">
              © 2024 JustCare. All rights reserved.
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <section className="container flex items-center justify-center py-8 sm:py-12">
        <div className="w-full max-w-4xl space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Image
              src="/assets/icons/logo-full.svg"
              height={40}
              width={162}
              alt="JustCare Logo"
              className="h-10 w-auto"
            />
            <Button variant="outline" asChild>
              <Link href="/" className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Return to Home
              </Link>
            </Button>
          </div>

          {/* News Section */}
          <NewsSection />

          {/* Appointment Form Card */}
          <div className="rounded-xl border border-border/50 bg-card/50 p-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/30 sm:p-8">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Schedule Your Appointment
              </h1>
              <p className="mt-2 text-muted-foreground">
                Choose your preferred time and doctor for your healthcare visit.
              </p>
            </div>
            
            <AppointmentForm
              patientId={patient.$id}
              userId={userId}
              type="create"
            />
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
          src="/assets/images/appointment-img.png"
          height={1500}
          width={1500}
          alt="Medical appointment"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Appointment;
