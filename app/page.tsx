"use client";

import Image from "next/image";
import Link from "next/link";

import ChatBot from "@/components/ChatBot";
import { PatientForm } from "@/components/forms/PatientForm";
import { PasskeyModal } from "@/components/PasskeyModal";
import QuoteSection from "@/components/QuoteSection";

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true";

  return (
    <>
      <QuoteSection />
      <ChatBot />
      <div className="flex min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        {isAdmin && <PasskeyModal />}

        <section className="container flex items-center justify-center py-8 sm:py-12">
          <div className="w-full max-w-md space-y-10">
            {/* Logo */}
            <div className="flex justify-center">
              <Image
                src="/assets/icons/logo-full.svg"
                height={40}
                width={162}
                alt="JustCare Logo"
                className="h-10 w-auto"
                priority
              />
            </div>

            {/* Welcome Section */}
            <div className="space-y-4 text-center">
              <div className="space-y-3">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Your Health, <span className="text-primary">Our Priority</span>
                </h1>
                <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
                  Experience seamless healthcare with JustCare. Book appointments, manage your health, and connect with trusted medical professionals—all in one place.
                </p>
              </div>
              {/* Benefits */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
                  <div className="flex h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Quick & Easy Appointment Booking</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
                  <div className="flex h-2 w-2 rounded-full bg-blue-500"></div>
                  <span>Secure Patient Information</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
                  <div className="flex h-2 w-2 rounded-full bg-purple-500"></div>
                  <span>24/7 Healthcare Access</span>
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="rounded-2xl border border-border/50 bg-card/50 p-8 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-card/30 sm:p-10">
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-2">
                  Get Started Today
                </h2>
                <p className="text-muted-foreground">
                  Enter your details below to begin your healthcare journey
                </p>
              </div>
              <PatientForm />
            </div>

            {/* Trust Indicators */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure & Private</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border/50">
              <p>© 2024 JustCare. All rights reserved.</p>
              <Link 
                href="/?admin=true" 
                className="text-primary hover:text-primary/80 transition-colors font-medium hover:underline"
              >
                Admin Access
              </Link>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <div className="hidden lg:block lg:w-1/2">
          <Image
            src="/assets/images/onboarding-img.png"
            height={1000}
            width={1000}
            alt="Healthcare professionals providing care"
            className="h-full w-full object-cover"
            priority
          />
        </div>
      </div>
    </>
  );
};

export default Home;
