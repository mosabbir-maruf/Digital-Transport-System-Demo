import { useState } from "react";
import { UserSidebar } from "@/components/UserSidebar";
import { FileText, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const UserReport = () => {
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");

  const previousReports = [
    { id: 1, date: "2024-12-05", subject: "Lost item on bus", status: "resolved" },
    { id: 2, date: "2024-11-28", subject: "Driver complaint", status: "pending" },
    { id: 3, date: "2024-11-15", subject: "Route suggestion", status: "resolved" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject.trim() || !details.trim()) {
      toast.error("Please fill in both subject and details fields.");
      return;
    }

    // Simulate form submission
    toast.success("Report submitted successfully! We'll review it and get back to you soon.");
    
    // Clear form
    setSubject("");
    setDetails("");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <UserSidebar>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">
            Report
          </h1>
          <p className="text-muted-foreground">
            Submit a report or feedback
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Report Form */}
          <div className="rounded-2xl bg-card border border-border shadow-card p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bkash-gradient">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold font-display text-foreground">
                  New Report
                </h2>
                <p className="text-sm text-muted-foreground">
                  Describe your issue or suggestion
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Subject
                </label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Brief description of the issue"
                  className="rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Details
                </label>
                <Textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Provide more details about your report..."
                  className="rounded-xl min-h-[150px]"
                  required
                />
              </div>
              <Button type="submit" className="w-full bkash-gradient text-white rounded-xl py-6">
                Submit Report
              </Button>
            </form>
          </div>

          {/* Previous Reports */}
          <div className="rounded-2xl bg-card border border-border shadow-card p-6 space-y-6">
            <h2 className="text-lg font-bold font-display text-foreground">
              Previous Reports
            </h2>

            <div className="space-y-4">
              {previousReports.map((report) => (
                <div
                  key={report.id}
                  className="rounded-xl bg-muted/50 p-4 flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{report.subject}</p>
                    <p className="text-sm text-muted-foreground">{report.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(report.status)}
                    <span className="text-sm capitalize text-muted-foreground">
                      {report.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </UserSidebar>
  );
};

export default UserReport;
