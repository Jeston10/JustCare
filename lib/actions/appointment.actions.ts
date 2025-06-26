"use server";

import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";

import { Appointment } from "@/types/appwrite.types";

import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  messaging,
  ENDPOINT,
  PROJECT_ID,
  API_KEY,
  PATIENT_COLLECTION_ID,
} from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";

//  CREATE APPOINTMENT
export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    console.log("Creating appointment with data:", appointment);
    console.log("Appwrite config check:", {
      databaseId: DATABASE_ID,
      collectionId: APPOINTMENT_COLLECTION_ID,
      hasEndpoint: !!ENDPOINT,
      hasProjectId: !!PROJECT_ID,
      hasApiKey: !!API_KEY,
    });
    
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    console.log("Appointment created successfully:", newAppointment);
    revalidatePath("/admin");
    return parseStringify(newAppointment);
  } catch (error) {
    console.error("An error occurred while creating a new appointment:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    throw new Error(`Failed to create appointment: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

//  GET RECENT APPOINTMENTS
export const getRecentAppointmentList = async () => {
  try {
    console.log("Fetching recent appointments");
    
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    console.log("Appointments fetched successfully, total:", appointments.total);

    // Fetch patient data for each appointment
    const appointmentsWithPatients = await Promise.all(
      appointments.documents.map(async (appointment) => {
        try {
          const appointmentData = appointment as any;
          if (typeof appointmentData.patients === 'string') {
            const patient = await databases.getDocument(
              DATABASE_ID!,
              PATIENT_COLLECTION_ID!,
              appointmentData.patients
            );
            return {
              ...appointment,
              patients: patient
            };
          }
          return appointment;
        } catch (error) {
          console.error(`Failed to fetch patient for appointment ${appointment.$id}:`, error);
          return appointment;
        }
      })
    );

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointmentsWithPatients as Appointment[]).reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case "schedule":
            acc.scheduledCount++;
            break;
          case "pending":
            acc.pendingCount++;
            break;
          case "canceled":
            acc.cancelledCount++;
            break;
        }
        return acc;
      },
      initialCounts
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointmentsWithPatients,
    };

    console.log("Processed appointment data:", data);
    return parseStringify(data);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the recent appointments:",
      error
    );
    throw new Error("Failed to fetch appointments");
  }
};

// SEND SMS NOTIFICATION
export const sendSMSNotification = async (userId: string, message: string) => {
  try {
    console.log("Sending SMS notification to user:", userId);
    console.log("Message:", message);
    
    // Using the correct Appwrite SMS API
    const response = await messaging.createSms(
      ID.unique(),
      message,
      [],
      [userId]
    );

    console.log("SMS sent successfully:", response);
    return response;
  } catch (error) {
    console.error("An error occurred while sending SMS notification:", error);
    // Don't throw error for SMS failures as they shouldn't break the main flow
  }
};

//  UPDATE APPOINTMENT
export const updateAppointment = async ({
  appointmentId,
  userId,
  timeZone,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    console.log("Updating appointment:", appointmentId);
    console.log("Update data:", { type, appointment });
    
    // Update appointment to scheduled -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#updateDocument
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );

    if (!updatedAppointment) throw Error;

    console.log("Appointment updated successfully:", updatedAppointment);

    // Send SMS notification (non-blocking)
    try {
      const smsMessage = `Greetings from JustCare. ${type === "schedule" ? `Your appointment is confirmed for ${formatDateTime(appointment.schedule!, timeZone).dateTime} with Dr. ${appointment.primaryPhysician}` : `We regret to inform that your appointment for ${formatDateTime(appointment.schedule!, timeZone).dateTime} is cancelled. Reason:  ${appointment.cancellationReason}`}.`;
      await sendSMSNotification(userId, smsMessage);
    } catch (smsError) {
      console.error("SMS notification failed, but appointment was updated successfully:", smsError);
    }

    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error("An error occurred while updating an appointment:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    throw new Error(`Failed to update appointment: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// GET APPOINTMENT
export const getAppointment = async (appointmentId: string) => {
  try {
    console.log("Fetching appointment:", appointmentId);
    
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );

    console.log("Appointment fetched successfully:", appointment);
    return parseStringify(appointment);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the existing patient:",
      error
    );
    throw new Error("Failed to fetch appointment");
  }
};
