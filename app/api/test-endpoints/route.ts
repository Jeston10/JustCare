import { NextResponse } from "next/server";
import * as sdk from "node-appwrite";

const endpoints = [
  { name: "Global", url: "https://cloud.appwrite.io/v1" },
  { name: "US East", url: "https://us-east-1.appwrite.io/v1" },
  { name: "US West", url: "https://us-west-1.appwrite.io/v1" },
  { name: "Europe", url: "https://eu-1.appwrite.io/v1" },
  { name: "Asia", url: "https://asia-1.appwrite.io/v1" },
];

export async function GET() {
  const projectId = process.env.PROJECT_ID;
  const apiKey = process.env.API_KEY;

  if (!projectId || !apiKey) {
    return NextResponse.json({
      error: "Missing PROJECT_ID or API_KEY environment variables",
    });
  }

  const results = [];

  for (const endpoint of endpoints) {
    try {
      const client = new sdk.Client();
      client.setEndpoint(endpoint.url).setProject(projectId).setKey(apiKey);
      
      const users = new sdk.Users(client);
      
      // Try to list users (this will fail if project doesn't exist in this region)
      await users.list([], "1");
      
      results.push({
        endpoint: endpoint.name,
        url: endpoint.url,
        status: "SUCCESS",
        message: "Project accessible in this region",
      });
    } catch (error: any) {
      results.push({
        endpoint: endpoint.name,
        url: endpoint.url,
        status: "FAILED",
        message: error.message || "Unknown error",
        code: error.code,
      });
    }
  }

  return NextResponse.json({
    message: "Endpoint test results",
    projectId,
    results,
    recommended: results.find(r => r.status === "SUCCESS")?.url || "No working endpoint found",
  });
} 