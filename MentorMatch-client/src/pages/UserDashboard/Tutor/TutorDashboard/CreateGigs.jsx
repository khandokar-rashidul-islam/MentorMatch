import { useForm, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sparkles, Calendar, Award, PlusCircle, X, Star } from "lucide-react";
import { useState } from "react";

function TagInput({
  label,
  fieldArray,
  append,
  remove,
  placeholder,
  suggestions = [],
}) {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleAdd = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    if (
      !fieldArray.some((t) => t.value.toLowerCase() === trimmed.toLowerCase())
    ) {
      append({ value: trimmed });
    }

    setInputValue("");
    setFilteredSuggestions([]);
  };

  const handleRemove = (index) => {
    remove(index);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd(inputValue);
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    if (val.length > 0) {
      setFilteredSuggestions(
        suggestions.filter(
          (s) =>
            s.toLowerCase().includes(val.toLowerCase()) &&
            !fieldArray.some((t) => t.value.toLowerCase() === s.toLowerCase())
        )
      );
    } else {
      setFilteredSuggestions([]);
    }
  };

  return (
    <div className="space-y-2 relative">
      <Label className="text-sm font-bold">{label}</Label>

      {/* Tags list */}
      <div className="flex flex-wrap gap-2 mb-2">
        {fieldArray.map((field, index) => (
          <Badge
            key={field.id} // Must use field.id
            variant="secondary"
            onClick={() => handleRemove(index)}
            className="flex cursor-pointer items-center gap-1 px-2 py-1"
          >
            {field.value}
            <X
              className="w-3 h-3 "
            />
          </Badge>
        ))}
      </div>

      {/* Input + Add button */}
      <div className="flex">
        <Input
          value={inputValue}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="flex-1 border  focus:border-indigo-400 rounded-md px-3 py-2 text-sm placeholder:text-gray-400 outline-none"
        />
        <button
          type="button"
          onClick={() => handleAdd(inputValue)}
          disabled={!inputValue.trim()}
          className={`ml-2 border rounded-md px-3 flex items-center justify-center font-bold ${
            inputValue.trim()
              ? "bg-[#f5f3ff] hover:bg-indigo-50 text-indigo-800"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          +
        </button>
      </div>

      {/* Suggestions */}
      {filteredSuggestions.length > 0 && (
        <div className="absolute z-10 bg-secondary-foreground text-muted-foreground border rounded mt-1 shadow max-h-40 overflow-auto w-full">
          {filteredSuggestions.map((sug, idx) => (
            <div
              key={idx}
              className="p-2 cursor-pointer hover:bg-muted"
              onClick={() => handleAdd(sug)}
            >
              {sug}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



export default function CreateGigs() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      gigTitle: "",
      relatedTopics: [],
      aboutGig: "",
      services: [],
      keywords: [],
      bookingPlans: {
        instant: { price: "", services: "" },
        weeklyBasic: { price: "", services: "" },
        weeklyIntensive: { price: "", services: "" },
        monthlyStandard: { price: "", services: "" },
        monthlyPremium: { price: "", services: "" },
        monthlyElite: { price: "", services: "" },
      },
      faq: [{ question: "", answer: "" }],
    },
  });

  const relatedTopicsFA = useFieldArray({ control, name: "relatedTopics" });
  const keywordsFA = useFieldArray({ control, name: "keywords" });
  const servicesFA = useFieldArray({ control, name: "services" });
  const faqFA = useFieldArray({ control, name: "faq" });

  const onSubmit = (data) => {
    console.log(data);
    alert("Gig Created Successfully!");
    reset();
  };

  return (
    <div className="w-11/12 mx-auto min-h-screen bg-gradient-secondary pt-20 mb-8 ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Info */}
        <Card className="shadow-medium border-0 rounded-md ">
          <CardHeader className="bg-gradient-primary rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-2xl font-bold text-primary ">
              Basic Information
            </CardTitle>
            <p className="text-muted-foreground text-xs flex items-center gap-1">
              <Sparkles size={10} className="h-5 w-5" /> Share your expertise
              and start earning by creating an amazing gig
            </p>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <Label className="font-bold">Gig Title</Label>
              <Input
                {...register("gigTitle", { required: "Title is required" })}
                placeholder="I will create a stunning website for your business"
              />
              {errors.gigTitle && (
                <p className="text-destructive text-sm">
                  {errors.gigTitle.message}
                </p>
              )}
            </div>
            <div className="space-y-4">
              <Label className="font-bold">About This Gig </Label>
              <Textarea
                {...register("aboutGig", {
                  required: "About gig is required",
                })}
                placeholder="Describe your gig in detail..."
                className="min-h-[120px]"
              />
              {errors.aboutGig && (
                <p className="text-destructive text-sm">
                  {errors.aboutGig.message}
                </p>
              )}
            </div>
            <TagInput
              label="Related Topics"
              fieldArray={relatedTopicsFA.fields}
              append={relatedTopicsFA.append}
              remove={relatedTopicsFA.remove}
              placeholder="Add a topic (e.g., Web Development)"
              suggestions={[
                "Web Development",
                "React",
                "UI Design",
                "Tailwind",
              ]}
            />

            <TagInput
              label="Subjects & Keywords"
              fieldArray={keywordsFA.fields}
              append={keywordsFA.append}
              remove={keywordsFA.remove}
              placeholder="Type keyword and press Enter"
              suggestions={["JavaScript", "ReactJS", "Backend", "Frontend"]}
            />
          </CardContent>
        </Card>

        {/* Services */}
        <Card className="shadow-medium border-0 rounded-md ">
          <CardHeader>
            <CardTitle className="font-bold text-2xl text-primary">
              Services Provided
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            {servicesFA.fields.map((field, index) => (
              <Input
                key={field.id}
                {...register(`services.${index}.value`, { required: true })}
                placeholder={`Service ${index + 1} *`}
                className="w-full rounded-md border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
              />
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => servicesFA.append({ value: "" })}
              className="w-full flex justify-center items-center gap-2 mt-2 py-3 border-dashed border border-gray-400"
            >
              <PlusCircle className="w-5 h-5" /> Add Service
            </Button>
          </CardContent>
        </Card>

        {/* Booking Plans */}
        <Card className="shadow-medium border-0 rounded-md ">
          <CardHeader>
            <CardTitle className="font-bold text-2xl text-primary">
              Booking Plans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="instant" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger
                  value="instant"
                  className="flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4" /> Instant
                </TabsTrigger>
                <TabsTrigger value="weekly" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Weekly
                </TabsTrigger>
                <TabsTrigger
                  value="monthly"
                  className="flex items-center gap-2"
                >
                  <Award className="h-4 w-4" /> Monthly
                </TabsTrigger>
              </TabsList>

              {/* Instant */}
              <TabsContent value="instant" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <Label>Price ($)</Label>
                    <Input
                      {...register("bookingPlans.instant.price", {
                        required: true,
                      })}
                      type="number"
                    />
                  </div>
                  <div className="space-y-4">
                    <Label>Services</Label>
                    <Input
                      {...register("bookingPlans.instant.services")}
                      placeholder="Comma separated"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Weekly */}
              <TabsContent value="weekly" className="space-y-6 mt-6">
                {["weeklyBasic", "weeklyIntensive"].map((plan, idx) => (
                  <div key={idx} className="space-y-8">
                    <h4 className="font-medium capitalize">
                      {plan.replace(/([A-Z])/g, " $1")}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <Label>Price ($)</Label>
                        <Input
                          {...register(`bookingPlans.${plan}.price`, {
                            required: true,
                          })}
                          type="number"
                        />
                      </div>
                      <div className="space-y-4">
                        <Label>Services</Label>
                        <Input
                          {...register(`bookingPlans.${plan}.services`)}
                          placeholder="Comma separated"
                        />
                      </div>
                    </div>
                    {idx === 0 && <Separator />}
                  </div>
                ))}
              </TabsContent>

              {/* Monthly */}
              <TabsContent value="monthly" className="space-y-6 mt-6">
                {["monthlyStandard", "monthlyPremium", "monthlyElite"].map(
                  (plan, idx) => (
                    <div key={idx} className="space-y-8">
                      <h4 className="font-medium capitalize">
                        {plan.replace(/([A-Z])/g, " $1")}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <Label>Price ($)</Label>
                          <Input
                            {...register(`bookingPlans.${plan}.price`, {
                              required: true,
                            })}
                            type="number"
                          />
                        </div>
                        <div className="space-y-4">
                          <Label>Services</Label>
                          <Input
                            {...register(`bookingPlans.${plan}.services`)}
                            placeholder="Comma separated"
                          />
                        </div>
                      </div>
                      {idx < 2 && <Separator />}
                    </div>
                  )
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="shadow-medium border-0 rounded-md ">
          <CardHeader>
            <CardTitle className="font-bold text-2xl ">
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {faqFA.fields.map((item, index) => (
              <div key={item.id} className="space-y-2 p-4 border rounded-lg">
                <Input
                  {...register(`faq.${index}.question`, { required: true })}
                  placeholder="Question"
                />
                <Textarea
                  {...register(`faq.${index}.answer`, { required: true })}
                  placeholder="Provide a detailed answer..."
                  className="min-h-[60px]"
                />
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => faqFA.remove(index)}
                    size="sm"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => faqFA.append({ question: "", answer: "" })}
              className="w-full"
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Add FAQ
            </Button>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end">
          <Button
            type="submit"
            className=" cursor-pointer hover:opacity-90 hover:text-white  px-8 py-3 text-lg font-medium shadow-lg"
          >
            Create Gig
          </Button>
        </div>
      </form>
    </div>
  );
}
