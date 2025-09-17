import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X, Plus } from "lucide-react";

// helper to get nested error messages
const getError = (errors, path, field) => {
  const keys = path.split(".");
  let obj = errors?.plans;
  for (const key of keys.slice(1)) {
    obj = obj?.[key];
  }
  return obj?.[field]?.message;
};

const EditPlan = ({
  title,
  planPath,
  control,
  register,
  errors,
  watch,
  addFeature,
  removeFeature,
}) => {
  const features = watch(`${planPath}.features`) || [];

  return (
    <div className="p-4 bg-muted/30 rounded-lg border border-border/50 space-y-4">
      <h4 className="font-medium ">{title}</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Price */}
        <div className="space-y-2">
          <Label>Price ($)</Label>
          <Controller
            name={`${planPath}.price`}
            control={control}
            rules={{ required: "Price is required" }}
            render={({ field }) => (
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
                className="bg-background"
              />
            )}
          />
          {getError(errors, planPath, "price") && (
            <p className="text-sm text-destructive">
              {getError(errors, planPath, "price")}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label>Description</Label>
          <Input
            {...register(`${planPath}.description`, {
              required: "Description is required",
            })}
            className="bg-background"
          />
          {getError(errors, planPath, "description") && (
            <p className="text-sm text-destructive">
              {getError(errors, planPath, "description")}
            </p>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="space-y-3">
        <Label>Features</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Add a feature..."
            className="bg-background"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const value = e.target.value.trim();
                if (value) {
                  addFeature(`${planPath}.features`, value);
                  e.target.value = "";
                }
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            onClick={(e) => {
              const input = e.target.parentElement.querySelector("input");
              const value = input?.value.trim();
              if (value) {
                addFeature(`${planPath}.features`, value);
                input.value = "";
              }
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 bg-background rounded border"
            >
              <span className="text-sm">{feature}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFeature(`${planPath}.features`, idx)}
                className="text-destructive hover:bg-destructive/10"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditPlan;
