import { UserSidebar } from "@/components/UserSidebar";
import {
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  ChevronRight,
  CreditCard,
  MapPin,
  Shield,
  FileText,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const UserHelp = () => {
  const faqs = [
    {
      question: "How do I recharge my wallet?",
      answer:
        "You can recharge your wallet using bKash, Nagad, or bank cards. Simply tap the 'Recharge Now' button on your dashboard and follow the instructions.",
    },
    {
      question: "How do I track my bus?",
      answer:
        "Use the 'Routes' option in quick actions to see real-time bus locations. You can also scan the QR code at any bus stop for instant updates.",
    },
    {
      question: "What if I lost my card?",
      answer:
        "Contact our support immediately. We'll block your old card and issue a new one. Your balance will be transferred to the new card.",
    },
    {
      question: "How do I get a refund?",
      answer:
        "Refunds for cancelled trips are processed automatically within 24 hours. For other refunds, please submit a report through the Report section.",
    },
  ];

  const helpCategories = [
    { icon: CreditCard, name: "Payments & Recharge", count: 12 },
    { icon: MapPin, name: "Routes & Tracking", count: 8 },
    { icon: Shield, name: "Account Security", count: 6 },
    { icon: FileText, name: "Reports & Claims", count: 5 },
  ];

  return (
    <UserSidebar>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">
            Help Center
          </h1>
          <p className="text-muted-foreground">
            Get help and support
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-card border border-border shadow-card p-6 text-center card-hover">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bkash-gradient mx-auto mb-4">
              <MessageCircle className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-bold text-foreground mb-1">Live Chat</h3>
            <p className="text-sm text-muted-foreground">24/7 Support</p>
          </div>

          <div className="rounded-2xl bg-card border border-border shadow-card p-6 text-center card-hover">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 mx-auto mb-4">
              <Phone className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-bold text-foreground mb-1">Call Us</h3>
            <p className="text-sm text-muted-foreground">+880 2-8888-9999</p>
          </div>

          <div className="rounded-2xl bg-card border border-border shadow-card p-6 text-center card-hover">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl admin-gradient mx-auto mb-4">
              <Mail className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-bold text-foreground mb-1">Email</h3>
            <p className="text-sm text-muted-foreground">support@buswallet.com</p>
          </div>
        </div>

        {/* Help Categories */}
        <div className="rounded-2xl bg-card border border-border shadow-card p-6">
          <h2 className="text-lg font-bold font-display text-foreground mb-4">
            Browse by Category
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {helpCategories.map((category) => (
              <button
                key={category.name}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bkash-gradient-soft">
                    <category.icon className="h-5 w-5 text-bkash-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{category.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {category.count} articles
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="rounded-2xl bg-card border border-border shadow-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bkash-gradient">
              <HelpCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-display text-foreground">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-muted-foreground">
                Quick answers to common questions
              </p>
            </div>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-xl px-4"
              >
                <AccordionTrigger className="hover:no-underline text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </UserSidebar>
  );
};

export default UserHelp;
