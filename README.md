# JustCare - Healthcare Management System

A modern healthcare management application built with Next.js, Appwrite, and TypeScript for patient registration, appointment scheduling, and administrative management.

## 🏥 Features

- **Patient Registration**: Secure onboarding with health information
- **Appointment Scheduling**: Easy booking and management system
- **Admin Dashboard**: Real-time statistics and appointment control
- **Status Tracking**: Monitor appointments (pending/scheduled/cancelled)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: Appwrite (BaaS)
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: Appwrite Database
- **Auth**: Appwrite Authentication

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create `.env.local`:
   ```env
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
   NEXT_PUBLIC_APPWRITE_PATIENTS_COLLECTION_ID=your_patients_collection_id
   NEXT_PUBLIC_APPWRITE_APPOINTMENTS_COLLECTION_ID=your_appointments_collection_id
   APPWRITE_API_KEY=your_api_key
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open** [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
healthcare/
├── app/                    # Next.js app directory
├── components/            # React components
├── lib/                  # Utility functions
├── public/               # Static assets
└── types/                # TypeScript definitions
```

## 🗄️ Database Collections

### Patients
- Personal information, medical history, emergency contacts

### Appointments  
- Patient references, dates, types, status tracking

## 🔧 Setup Requirements

- Node.js 18+
- Appwrite project with configured collections
- Proper environment variables
- API keys with database permissions

## 🚀 Deployment

Deploy to Vercel or any Next.js-compatible platform with proper environment variable configuration.

## 👨‍💻 Creator

**S.Jeston Singh**
- Email: sjestonsingh@gmail.com

## 📞 Support

For support, email sjestonsingh@gmail.com or create an issue in the repository.

---

**JustCare** - Making healthcare management simple and efficient. 🏥✨
