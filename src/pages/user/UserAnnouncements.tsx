// Announcements page - shows system announcements with filtering

import { useState } from "react";
import { UserSidebar } from "@/components/UserSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertCircle, Info, CheckCircle, AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { announcements } from "@/data/mockData";
import { cn } from "@/lib/utils";

const UserAnnouncements = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [readAnnouncements, setReadAnnouncements] = useState<Set<number>>(new Set());

  const categories = [
    { id: "all", name: "All", count: announcements.length },
    { id: "important", name: "Important", count: announcements.filter(a => a.type === "important").length },
    { id: "info", name: "Information", count: announcements.filter(a => a.type === "info").length },
    { id: "update", name: "Updates", count: announcements.filter(a => a.type === "update").length },
  ];

  const filteredAnnouncements = selectedCategory === "all"
    ? announcements
    : announcements.filter(a => a.type === selectedCategory);

  const unreadCount = announcements.filter(a => !readAnnouncements.has(a.id)).length;

  const markAsRead = (id: number) => {
    setReadAnnouncements(prev => new Set([...prev, id]));
  };

  const markAllAsRead = () => {
    setReadAnnouncements(new Set(announcements.map(a => a.id)));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "important":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case "update":
        return <CheckCircle className="h-5 w-5 text-blue-600" />;
      default:
        return <Info className="h-5 w-5 text-green-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "important":
        return "bg-red-50 border-red-200 text-red-700";
      case "update":
        return "bg-blue-50 border-blue-200 text-blue-700";
      default:
        return "bg-green-50 border-green-200 text-green-700";
    }
  };

  return (
    <UserSidebar>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold font-display text-foreground mb-2">
              Announcements
            </h1>
            <p className="text-muted-foreground">
              Stay updated with the latest news and important information
            </p>
          </div>
          {unreadCount > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={markAllAsRead}
              className="px-4 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition-colors text-sm font-medium"
            >
              Mark All as Read ({unreadCount})
            </motion.button>
          )}
        </motion.div>

        {/* Categories Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                selectedCategory === category.id
                  ? "bg-pink-600 text-white shadow-md"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              )}
            >
              {category.name}
              <span className="ml-2 px-1.5 py-0.5 rounded-full bg-white/20 text-xs">
                {category.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Announcements List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredAnnouncements.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                    <Bell className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      No announcements
                    </h3>
                    <p className="text-muted-foreground">
                      There are no announcements in this category
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              filteredAnnouncements.map((announcement, index) => {
                const isRead = readAnnouncements.has(announcement.id);
                return (
                  <motion.div
                    key={announcement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className={cn(
                        "border-2 transition-all hover:shadow-lg cursor-pointer",
                        !isRead && "bg-pink-50/50 border-pink-200",
                        isRead && "bg-card border-border"
                      )}
                      onClick={() => markAsRead(announcement.id)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1">
                            <div className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-lg border-2 mt-1",
                              getTypeColor(announcement.type)
                            )}>
                              {getTypeIcon(announcement.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <CardTitle className="text-lg">
                                  {announcement.title}
                                </CardTitle>
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "capitalize text-xs",
                                    getTypeColor(announcement.type)
                                  )}
                                >
                                  {announcement.type}
                                </Badge>
                                {!isRead && (
                                  <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="h-2 w-2 rounded-full bg-pink-600"
                                  />
                                )}
                              </div>
                              <CardDescription className="text-sm">
                                {announcement.date} • {announcement.time}
                              </CardDescription>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-foreground leading-relaxed whitespace-pre-line">
                          {announcement.message}
                        </p>
                        {announcement.link && (
                          <a
                            href={announcement.link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="mt-4 inline-flex items-center gap-2 text-sm text-pink-600 hover:text-pink-700 font-medium"
                          >
                            {announcement.link.text}
                            <span>→</span>
                          </a>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </UserSidebar>
  );
};

export default UserAnnouncements;
