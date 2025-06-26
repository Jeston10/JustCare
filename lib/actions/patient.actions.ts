"use server";

import { ID, InputFile, Query } from "node-appwrite";

import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  API_KEY,
  databases,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";

// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    console.log("Creating user with data:", user);
    console.log("Appwrite config check:", {
      endpoint: ENDPOINT,
      projectId: PROJECT_ID,
      hasApiKey: !!API_KEY,
    });
    
    // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    console.log("User created successfully:", newuser);
    return parseStringify(newuser);
  } catch (error: any) {
    console.error("Error creating user:", error);
    console.error("Error details:", {
      code: error?.code,
      message: error?.message,
      type: error?.type,
      response: error?.response,
    });
    
    // Check existing user
    if (error && error?.code === 409) {
      console.log("User already exists, fetching existing user");
      try {
        const existingUser = await users.list([
          Query.equal("email", [user.email]),
        ]);

        console.log("Existing user found:", existingUser.users[0]);
        return existingUser.users[0];
      } catch (listError: any) {
        console.error("Error fetching existing user:", listError);
        throw new Error(`Failed to create or fetch user: ${listError.message || 'Unknown error'}`);
      }
    }
    
    // Provide more specific error messages
    if (error?.code === 401) {
      if (error?.message?.includes('region')) {
        throw new Error("Project region mismatch. Please check your Appwrite endpoint URL. Your project might be in a different region (e.g., use 'https://cloud.appwrite.io/v1' for global, or specific regional endpoints like 'https://us-east-1.appwrite.io/v1').");
      } else {
        throw new Error("Authentication failed. Please check your API key.");
      }
    } else if (error?.code === 403) {
      throw new Error("Access denied. Please check your permissions.");
    } else if (error?.code === 404) {
      throw new Error("Project not found. Please check your project ID.");
    } else if (error?.message) {
      throw new Error(`User creation failed: ${error.message}`);
    } else {
      throw new Error("Failed to create user. Please try again.");
    }
  }
};

// GET USER
export const getUser = async (userId: string) => {
  try {
    console.log("Fetching user with ID:", userId);
    const user = await users.get(userId);
    console.log("User fetched successfully:", user);
    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
    throw new Error("Failed to fetch user");
  }
};

// REGISTER PATIENT
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    console.log("Registering patient with data:", { ...patient, hasDocument: !!identificationDocument });
    
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    let file;
    if (identificationDocument) {
      console.log("Uploading identification document");
      const inputFile =
        identificationDocument &&
        InputFile.fromBlob(
          identificationDocument?.get("blobFile") as Blob,
          identificationDocument?.get("fileName") as string
        );

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
      console.log("File uploaded successfully:", file);
    }

    // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
          : null,
        ...patient,
      }
    );

    console.log("Patient registered successfully:", newPatient);
    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
    throw new Error("Failed to register patient");
  }
};

// GET PATIENT
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );
    if (!patients.documents.length) {
      return null;
    }
    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
    throw new Error("Failed to fetch patient");
  }
};
