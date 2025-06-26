import { NextResponse } from "next/server";

import {
  DATABASE_ID,
  APPOINTMENT_COLLECTION_ID,
  ENDPOINT,
  PROJECT_ID,
  API_KEY,
  databases,
} from "@/lib/appwrite.config";

export async function GET() {
  try {
    console.log("Testing Appwrite configuration...");
    
    const config = {
      databaseId: DATABASE_ID,
      collectionId: APPOINTMENT_COLLECTION_ID,
      endpoint: ENDPOINT,
      projectId: PROJECT_ID,
      hasApiKey: !!API_KEY,
    };
    
    console.log("Appwrite config:", config);
    
    // Test if we can connect to the database
    const collections = await databases.listCollections(DATABASE_ID!);
    console.log("Collections found:", collections.collections.length);
    
    return NextResponse.json({
      success: true,
      config,
      collectionsCount: collections.collections.length,
      collections: collections.collections.map(c => ({ id: c.$id, name: c.name }))
    });
  } catch (error) {
    console.error("Configuration test failed:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      config: {
        databaseId: DATABASE_ID,
        collectionId: APPOINTMENT_COLLECTION_ID,
        endpoint: ENDPOINT,
        projectId: PROJECT_ID,
        hasApiKey: !!API_KEY,
      }
    }, { status: 500 });
  }
} 