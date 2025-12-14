import { useState } from "react";
import { UserSidebar } from "@/components/UserSidebar";
import { userProfile } from "@/data/mockData";
import { User, Phone, Mail, Calendar, Edit2, Save, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: userProfile.name,
    phone: userProfile.phone,
    email: userProfile.email,
    address: userProfile.address || "",
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setProfile({
      name: userProfile.name,
      phone: userProfile.phone,
      email: userProfile.email,
      address: userProfile.address || "",
    });
    setIsEditing(false);
  };

  return (
    <UserSidebar>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold font-display text-foreground">
              Personal Details
            </h1>
            <p className="text-muted-foreground">
              Your account information
            </p>
          </div>
          <AnimatePresence mode="wait">
            {!isEditing ? (
              <motion.div
                key="edit"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bkash-gradient text-white border-0 rounded-xl gap-2"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit Profile
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="save-cancel"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex gap-2"
              >
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="rounded-xl gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="bkash-gradient text-white border-0 rounded-xl gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-card border border-border shadow-card overflow-hidden"
        >
          {/* Banner - Bangladesh Flag */}
          <div className="relative h-40 bg-green-600 overflow-hidden">
            {/* Bangladesh Flag - Green background with centered red circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-red-600" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 6 }}
              className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 8 }}
              className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-white/5"
            />
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            <div className="text-center -mt-24 relative z-10">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="inline-flex h-28 w-28 items-center justify-center rounded-full border-4 border-background shadow-xl overflow-hidden"
              >
                <img
                  src="/avatar/hamza-avatar.jpg"
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {isEditing ? (
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="mt-4 text-center text-xl font-bold max-w-xs mx-auto"
                />
              ) : (
                <h2 className="mt-4 text-2xl font-bold font-display text-foreground">
                  {profile.name}
                </h2>
              )}
              <p className="text-muted-foreground">Member since {userProfile.joinDate}</p>
              <p className="text-sm text-bkash-primary font-medium mt-1">{userProfile.memberId}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl bg-muted/50 p-6 space-y-4"
              >
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Phone className="h-5 w-5 text-bkash-primary" />
                  Phone Number
                </h3>
                {isEditing ? (
                  <Input
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                ) : (
                  <p className="text-muted-foreground">{profile.phone}</p>
                )}
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl bg-muted/50 p-6 space-y-4"
              >
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Mail className="h-5 w-5 text-bkash-primary" />
                  Email
                </h3>
                {isEditing ? (
                  <Input
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                ) : (
                  <p className="text-muted-foreground">{profile.email}</p>
                )}
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl bg-muted/50 p-6 space-y-4"
              >
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-bkash-primary" />
                  Address
                </h3>
                {isEditing ? (
                  <Input
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    placeholder="Your address"
                  />
                ) : (
                  <p className="text-muted-foreground">{profile.address || "Not provided"}</p>
                )}
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl bg-muted/50 p-6 space-y-4"
              >
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-bkash-primary" />
                  Join Date
                </h3>
                <p className="text-muted-foreground">{userProfile.joinDate}</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </UserSidebar>
  );
};

export default UserProfile;
