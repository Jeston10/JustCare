import { NextResponse } from "next/server";
import { ID } from "node-appwrite";
import {
  DATABASE_ID,
  APPOINTMENT_COLLECTION_ID,
  databases,
} from "@/lib/appwrite.config";

export async function POST() {
  try {
    console.log("Testing appointment cancellation...");
    
    // First, create a test appointment
    const testAppointment = {
      patients: "test-patient-id",
      schedule: new Date().toISOString(),
      reason: "Test appointment for cancellation",
      note: "Test note",
      primaryPhysician: "Dr. Test",
      status: "pending",
      userId: "test-user-id",
      cancellationReason: null,
    };
    
    console.log("Creating test appointment:", testAppointment);
    
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      testAppointment
    );
    
    console.log("Test appointment created:", newAppointment.$id);
    
    // Now test cancellation
    const cancellationData = {
      primaryPhysician: "Dr. Test",
      schedule: new Date().toISOString(),
      status: "canceled",
      cancellationReason: "Test cancellation reason",
    };
    
    console.log("Cancelling appointment with data:", cancellationData);
    
    const cancelledAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      newAppointment.$id,
      cancellationData
    );
    
    console.log("Appointment cancelled successfully:", cancelledAppointment);
    
    return NextResponse.json({
      success: true,
      originalAppointment: newAppointment,
      cancelledAppointment
    });
  } catch (error) {
    console.error("Test cancellation failed:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      errorDetails: error
    }, { status: 500 });
  }
} 