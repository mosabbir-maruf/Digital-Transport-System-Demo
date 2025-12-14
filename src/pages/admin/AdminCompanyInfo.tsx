import { useState } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { companyInfo } from "@/data/mockData";
import { Building2, Phone, Mail, Calendar, MapPin, Edit2, Save, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const AdminCompanyInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: companyInfo.name,
    tagline: companyInfo.tagline,
    address: companyInfo.address,
    phone: companyInfo.phone,
    email: companyInfo.email,
    established: companyInfo.established,
    website: companyInfo.website,
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Company information updated successfully!");
  };

  const handleCancel = () => {
    setFormData({
      name: companyInfo.name,
      tagline: companyInfo.tagline,
      address: companyInfo.address,
      phone: companyInfo.phone,
      email: companyInfo.email,
      established: companyInfo.established,
      website: companyInfo.website,
    });
    setIsEditing(false);
  };

  return (
    <AdminSidebar>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold font-display text-foreground">
              Transport Authority
            </h1>
            <p className="text-muted-foreground">
              Company information and details
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
                  className="admin-gradient text-white border-0 rounded-xl gap-2"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit Information
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
                  className="admin-gradient text-white border-0 rounded-xl gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Company Card */}
        <div className="rounded-3xl bg-card border border-border shadow-card overflow-hidden">
          {/* Banner */}
          <div className="relative h-48 admin-gradient">
            <div className="absolute inset-0 flex items-center justify-center">
              <Building2 className="h-24 w-24 text-white/20" />
            </div>
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
            <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-white/5" />
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            <div className="text-center -mt-20 relative z-10">
              <div className="inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-card border-4 border-background shadow-xl">
                <Building2 className="h-10 w-10 text-primary" />
              </div>
              {isEditing ? (
                <div className="mt-4 space-y-3 max-w-md mx-auto">
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="text-center text-xl font-bold"
                    placeholder="Company Name"
                  />
                  <Input
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="text-center"
                    placeholder="Tagline"
                  />
                </div>
              ) : (
                <>
                  <h2 className="mt-4 text-2xl font-bold font-display text-foreground">
                    {formData.name}
                  </h2>
                  <p className="text-muted-foreground">{formData.tagline}</p>
                </>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: isEditing ? 1 : 1.02 }}
                className="rounded-2xl bg-muted/50 p-6 space-y-4"
              >
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Address
                </h3>
                {isEditing ? (
                  <Textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="min-h-[80px]"
                    placeholder="Company Address"
                  />
                ) : (
                  <p className="text-muted-foreground">{formData.address}</p>
                )}
              </motion.div>

              <motion.div
                whileHover={{ scale: isEditing ? 1 : 1.02 }}
                className="rounded-2xl bg-muted/50 p-6 space-y-4"
              >
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Contact
                </h3>
                {isEditing ? (
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Phone Number"
                  />
                ) : (
                  <p className="text-muted-foreground">{formData.phone}</p>
                )}
              </motion.div>

              <motion.div
                whileHover={{ scale: isEditing ? 1 : 1.02 }}
                className="rounded-2xl bg-muted/50 p-6 space-y-4"
              >
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Email
                </h3>
                {isEditing ? (
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email Address"
                  />
                ) : (
                  <p className="text-muted-foreground">{formData.email}</p>
                )}
              </motion.div>

              <motion.div
                whileHover={{ scale: isEditing ? 1 : 1.02 }}
                className="rounded-2xl bg-muted/50 p-6 space-y-4"
              >
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Established
                </h3>
                {isEditing ? (
                  <Input
                    value={formData.established}
                    onChange={(e) => setFormData({ ...formData, established: e.target.value })}
                    placeholder="Year Established"
                  />
                ) : (
                  <p className="text-muted-foreground">{formData.established}</p>
                )}
              </motion.div>

              <motion.div
                whileHover={{ scale: isEditing ? 1 : 1.02 }}
                className="rounded-2xl bg-muted/50 p-6 space-y-4 sm:col-span-2"
              >
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Website
                </h3>
                {isEditing ? (
                  <Input
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="Website URL"
                  />
                ) : (
                  <p className="text-muted-foreground">{formData.website}</p>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </AdminSidebar>
  );
};

export default AdminCompanyInfo;
