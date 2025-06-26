# Configuration Guide

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Appwrite Configuration
NEXT_PUBLIC_ENDPOINT=https://your-appwrite-endpoint.com/v1
PROJECT_ID=your-project-id
API_KEY=your-api-key

# Database Configuration
DATABASE_ID=your-database-id
PATIENT_COLLECTION_ID=your-patient-collection-id
DOCTOR_COLLECTION_ID=your-doctor-collection-id
APPOINTMENT_COLLECTION_ID=your-appointment-collection-id

# Storage Configuration
NEXT_PUBLIC_BUCKET_ID=your-bucket-id

# Sentry Configuration (optional)
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

## How to get these values:

1. **NEXT_PUBLIC_ENDPOINT**: Your Appwrite server endpoint
   - **Global endpoint**: `https://cloud.appwrite.io/v1`
   - **Regional endpoints**: 
     - US East: `https://us-east-1.appwrite.io/v1`
     - US West: `https://us-west-1.appwrite.io/v1`
     - Europe: `https://eu-1.appwrite.io/v1`
     - Asia: `https://asia-1.appwrite.io/v1`
   - **Self-hosted**: Your custom Appwrite server URL
2. **PROJECT_ID**: Found in your Appwrite project settings
3. **API_KEY**: Create an API key in your Appwrite project with appropriate permissions
4. **DATABASE_ID**: The ID of your Appwrite database
5. **PATIENT_COLLECTION_ID**: The ID of your patients collection
6. **DOCTOR_COLLECTION_ID**: The ID of your doctors collection
7. **APPOINTMENT_COLLECTION_ID**: The ID of your appointments collection
8. **NEXT_PUBLIC_BUCKET_ID**: The ID of your storage bucket

## Testing Configuration

After setting up your environment variables, you can test the configuration by:

1. Starting your development server
2. Going to `http://localhost:3000/api/test-config`
3. Or clicking the "Test Configuration" button when an error occurs

## Common Issues

1. **401 Unauthorized**: Check your API key and permissions
2. **404 Not Found**: Verify your project ID and collection IDs
3. **403 Forbidden**: Ensure your API key has the necessary permissions
4. **500 Internal Server Error**: Check all environment variables are set correctly
5. **Region Mismatch**: If you get "Project is not accessible in this region", check your endpoint URL:
   - Go to your Appwrite console
   - Check which region your project is hosted in
   - Use the correct regional endpoint URL

## Finding Your Project Region

1. Log into your Appwrite console
2. Go to your project settings
3. Look for the region information in the project details
4. Use the corresponding endpoint URL from the list above 