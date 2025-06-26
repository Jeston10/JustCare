import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";

const RequestSuccess = async ({
  searchParams,
  params: { userId },
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment.primaryPhysician
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container flex items-center justify-center py-8 sm:py-12">
        <div className="w-full max-w-2xl space-y-8">
          {/* Header */}
          <div className="flex justify-center">
            <Link href="/">
              <Image
                src="/assets/icons/logo-full.svg"
                height={40}
                width={162}
                alt="JustCare Logo"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Success Content */}
          <div className="rounded-xl border border-border/50 bg-card/50 p-8 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/30 text-center">
            {/* Success Animation */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <Image
                  src="/assets/gifs/success.gif"
                  height={200}
                  width={200}
                  alt="Success animation"
                  className="object-contain size-48"
                />
                <div className="absolute inset-0 rounded-full bg-green-500/10 animate-pulse" />
              </div>
            </div>

            {/* Success Message */}
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Appointment Request Submitted!
              </h1>
              <p className="text-lg text-muted-foreground">
                Your appointment request has been successfully submitted. We&apos;ll be in touch shortly to confirm your appointment.
              </p>
            </div>

            {/* Appointment Details */}
            {appointment && doctor && (
              <div className="mt-8 rounded-lg border border-border/50 bg-muted/30 p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Appointment Details
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-3">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={24}
                      height={24}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                    <span className="text-foreground">Dr. {doctor.name}</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-foreground">
                      {formatDateTime(appointment.schedule).dateTime}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild className="w-full sm:w-auto">
                <Link href={`/patients/${userId}/new-appointment`}>
                  Schedule Another Appointment
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link href="/">
                  Return to Home
                </Link>
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground">
            © 2024 JustCare. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestSuccess;
