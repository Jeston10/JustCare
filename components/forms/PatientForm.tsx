"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { createUser } from "@/lib/actions/patient.actions";
import { UserFormValidation } from "@/lib/validation";

import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";

export const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Form submitted with values:", values);
      
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      console.log("Creating user with data:", user);
      const newUser = await createUser(user);

      if (newUser) {
        console.log("User created successfully, redirecting to:", `/patients/${newUser.$id}/register`);
        router.push(`/patients/${newUser.$id}/register`);
      } else {
        setError("Failed to create user. Please try again.");
      }
    } catch (error: any) {
      console.error("Error in form submission:", error);
      setError(error.message || "An error occurred. Please try again.");
      
      // Log additional debugging info
      console.log("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    }

    setIsLoading(false);
  };

  const testConfig = async () => {
    try {
      const response = await fetch('/api/test-config');
      const data = await response.json();
      console.log("Config test result:", data);
      alert(`Config check: ${data.hasAllRequired ? 'PASS' : 'FAIL'}\n${JSON.stringify(data.config, null, 2)}`);
    } catch (error) {
      console.error("Config test failed:", error);
      alert("Config test failed");
    }
  };

  const testEndpoints = async () => {
    try {
      const response = await fetch('/api/test-endpoints');
      const data = await response.json();
      console.log("Endpoint test result:", data);
      
      const workingEndpoints = data.results.filter((r: any) => r.status === "SUCCESS");
      if (workingEndpoints.length > 0) {
        alert(`Found ${workingEndpoints.length} working endpoint(s):\n${workingEndpoints.map((e: any) => `${e.endpoint}: ${e.url}`).join('\n')}\n\nRecommended: ${data.recommended}`);
      } else {
        alert("No working endpoints found. Check your PROJECT_ID and API_KEY.");
      }
    } catch (error) {
      console.error("Endpoint test failed:", error);
      alert("Endpoint test failed");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive/10">
                <svg className="h-3 w-3 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Something went wrong</p>
                <p className="text-sm text-muted-foreground">{error}</p>
                <div className="flex gap-2 pt-1">
                  <button 
                    type="button" 
                    onClick={testConfig}
                    className="text-xs text-primary hover:underline"
                  >
                    Test Configuration
                  </button>
                  <button 
                    type="button" 
                    onClick={testEndpoints}
                    className="text-xs text-primary hover:underline"
                  >
                    Test Endpoints
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-5">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="Enter your full name"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email Address"
            placeholder="Enter your email address"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="Enter your phone number"
          />
        </div>

        <div className="pt-2">
          <SubmitButton isLoading={isLoading}>
            {isLoading ? "Creating Account..." : "Continue to Registration"}
          </SubmitButton>
        </div>

        <p className="text-xs text-center text-muted-foreground leading-relaxed">
          By continuing, you agree to our Terms of Service and Privacy Policy. Your information is secure and protected.
        </p>
      </form>
    </Form>
  );
};
