import Image from "next/image";
import Link from "next/link";

import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";

const AdminPage = async () => {
  const appointments = await getRecentAppointmentList();

  // Provide default values if appointments is undefined
  const defaultAppointments = {
    scheduledCount: 0,
    pendingCount: 0,
    cancelledCount: 0,
    documents: [],
    totalCount: 0,
  };

  const safeAppointments = appointments || defaultAppointments;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/assets/icons/logo-full.svg"
              height={32}
              width={162}
              alt="JustCare Logo"
              className="h-8 w-auto"
            />
            <div className="h-6 w-px bg-border/50" />
            <span className="text-lg font-semibold text-foreground">Admin Dashboard</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Welcome back, Admin</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <section className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Welcome back 👋
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage appointments and monitor patient activity from your dashboard.
            </p>
          </section>

          {/* Configuration Error */}
          {!appointments && (
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive/10">
                  <svg className="h-4 w-4 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">Configuration Error</h3>
                  <p className="text-sm text-muted-foreground">
                    Unable to load appointments. Please check your Appwrite configuration in the .env.local file.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Statistics Cards */}
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border/50 bg-card/50 p-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/30">
              <StatCard
                type="appointments"
                count={safeAppointments.scheduledCount}
                label="Scheduled appointments"
                icon={"/assets/icons/appointments.svg"}
              />
            </div>
            <div className="rounded-xl border border-border/50 bg-card/50 p-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/30">
              <StatCard
                type="pending"
                count={safeAppointments.pendingCount}
                label="Pending appointments"
                icon={"/assets/icons/pending.svg"}
              />
            </div>
            <div className="rounded-xl border border-border/50 bg-card/50 p-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/30">
              <StatCard
                type="cancelled"
                count={safeAppointments.cancelledCount}
                label="Cancelled appointments"
                icon={"/assets/icons/cancelled.svg"}
              />
            </div>
          </section>

          {/* Appointments Table */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Recent Appointments
              </h2>
              <span className="text-sm text-muted-foreground">
                {safeAppointments.documents.length} appointments
              </span>
            </div>
            
            <div className="rounded-xl border border-border/50 bg-card/50 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/30">
              <DataTable columns={columns} data={safeAppointments.documents} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
