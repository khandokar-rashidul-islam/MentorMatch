import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
const Availability = ({ availability }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Weekly Availability
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-3">
          {availability.map(({ day, time }) => (
            <div className="flex justify-between items-center" key={day}>
              <span className="text-muted-foreground">{day}</span>
              <span className="text-sm">{time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Availability;
