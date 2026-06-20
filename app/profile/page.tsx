import AppLayout from "@/components/layout/AppLayout";
import ProfileClient from "@/components/profile/ProfileClient";
import ProfileData from "@/components/profile/ProfileData";
import EditProfile from "@/components/profile/EditProfile";
import ProfileBanner from "@/components/profile/ProfileBanner";
export default function ProfilePage() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-6xl">

        {/* Header */}

        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-zinc-950 via-zinc-950 to-orange-950/20 p-4 md:p-4 md:p-8">

          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative z-10">

            <ProfileBanner />

            <ProfileClient />

          </div>

        </div>

        {/* Dynamic Profile Data */}

        <ProfileData />
        <EditProfile />

      </div>
    </AppLayout>
  );
}