/* eslint-disable no-unused-vars */
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, Clock, Star } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Active Users",
    description: "Learners and tutors worldwide",
  },
  {
    icon: BookOpen,
    value: "1,200+",
    label: "Subjects Available",
    description: "From coding to cooking",
  },
  {
    icon: Clock,
    value: "50,000+",
    label: "Hours Taught",
    description: "Knowledge shared monthly",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Average Rating",
    description: "From satisfied learners",
  },
];

const Stats = () => {
  return (
    <section className="relative py-20 bg-muted/30 text-primary overflow-hidden">
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-4 bg-primary/10 text-primary border border-primary/20"
          >
            Platform Statistics
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-primary/90 max-w-2xl mx-auto">
            Join our growing community of learners and educators making
            knowledge accessible to everyone, everywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map(({ icon: Icon, value, label, description }, index) => (
            <div key={index} className="text-center group">
              <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors w-fit">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-4xl font-bold mb-2">{value}</div>
              <div className="text-lg font-semibold mb-1">{label}</div>
              <p className="text-white/80 text-sm">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
