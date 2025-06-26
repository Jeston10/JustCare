import { NextResponse } from "next/server";
import { ID } from "node-appwrite";
import {
  DATABASE_ID,
  APPOINTMENT_COLLECTION_ID,
  databases,
} from "@/lib/appwrite.config";

export async function POST() {
  try {
    console.log("Testing appointment creation...");
    
    // Test appointment data
    const testAppointment = {
      patients: "test-patient-id", // Single patient ID, not an array
      schedule: new Date().toISOString(),
      reason: "Test appointment",
      note: "Test note",
      primaryPhysician: "Dr. Test",
      status: "pending",
      userId: "test-user-id",
      cancellationReason: null,
    };
    
    console.log("Test appointment data:", testAppointment);
    
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      testAppointment
    );
    
    console.log("Test appointment created successfully:", newAppointment);
    
    return NextResponse.json({
      success: true,
      appointment: newAppointment
    });
  } catch (error) {
    console.error("Test appointment creation failed:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      errorDetails: error
    }, { status: 500 });
  }
} 