import { useForm, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, X } from "lucide-react";
import { useState } from "react";

// Reusable tag input component
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
    if (value.trim() && !fieldArray.some((t) => t.value === value.trim())) {
      append({ value: value.trim() });
    }
    setInputValue("");
    setFilteredSuggestions([]);
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
        suggestions.filter((s) => s.toLowerCase().includes(val.toLowerCase()))
      );
    } else {
      setFilteredSuggestions([]);
    }
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="flex gap-2 flex-wrap mb-2">
        {fieldArray.map((field, index) => (
          <Badge key={field.id} className="flex items-center gap-1 px-2 py-1">
            {field.value}
            <X
              className="w-4 h-4 cursor-pointer"
              onClick={() => remove(index)}
            />
          </Badge>
        ))}
      </div>
      <Input
        value={inputValue}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {filteredSuggestions.length > 0 && (
        <div className="bg-white border rounded mt-1 shadow z-10 max-h-40 overflow-auto">
          {filteredSuggestions.map((sug, idx) => (
            <div
              key={idx}
              className="p-2 cursor-pointer hover:bg-gray-100"
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
    watch,
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

  // Field arrays
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
    <div className="max-w-5xl mx-auto p-6 bg-background rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Create New Gig</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Gig Title */}
        <div>
          <Label>Gig Title</Label>
          <Input
            {...register("gigTitle", { required: "Title is required" })}
            placeholder="Enter gig title"
          />
          {errors.gigTitle && (
            <p className="text-red-500 text-sm">{errors.gigTitle.message}</p>
          )}
        </div>

        {/* Related Topics */}
        <TagInput
          label="Related Topics"
          fieldArray={relatedTopicsFA.fields}
          append={relatedTopicsFA.append}
          remove={relatedTopicsFA.remove}
          placeholder="Type topic and press Enter"
          suggestions={["Web Development", "React", "UI Design", "Tailwind"]}
        />

        {/* About Gig */}
        <div>
          <Label>About Gig</Label>
          <Textarea
            {...register("aboutGig", { required: "About gig is required" })}
            placeholder="Describe your gig..."
          />
          {errors.aboutGig && (
            <p className="text-red-500 text-sm">{errors.aboutGig.message}</p>
          )}
        </div>

        {/* Services */}
        <TagInput
          label="Services Provided"
          fieldArray={servicesFA.fields}
          append={servicesFA.append}
          remove={servicesFA.remove}
          placeholder="Type service and press Enter"
          suggestions={["Consultation", "Development", "Design", "Testing"]}
        />

        {/* Keywords */}
        <TagInput
          label="Subjects & Keywords"
          fieldArray={keywordsFA.fields}
          append={keywordsFA.append}
          remove={keywordsFA.remove}
          placeholder="Type keyword and press Enter"
          suggestions={["JavaScript", "ReactJS", "Backend", "Frontend"]}
        />

        {/* Booking Plans */}
        <div>
          <Label>Booking Plans</Label>
          <Tabs defaultValue="instant" className="w-full">
            <TabsList>
              <TabsTrigger value="instant">Instant</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>

            {/* Instant */}
            <TabsContent value="instant">
              <Card>
                <CardContent className="space-y-4 mt-4">
                  <div>
                    <Label>Price</Label>
                    <Input
                      {...register("bookingPlans.instant.price", {
                        required: true,
                      })}
                      type="number"
                    />
                  </div>
                  <div>
                    <Label>Services</Label>
                    <Input
                      {...register("bookingPlans.instant.services")}
                      placeholder="Comma separated"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Weekly */}
            <TabsContent value="weekly">
              <div className="grid gap-4 md:grid-cols-2">
                {["weeklyBasic", "weeklyIntensive"].map((plan) => (
                  <Card key={plan}>
                    <CardContent className="space-y-4 mt-4">
                      <div>
                        <Label>Price</Label>
                        <Input
                          {...register(`bookingPlans.${plan}.price`, {
                            required: true,
                          })}
                          type="number"
                        />
                      </div>
                      <div>
                        <Label>Services</Label>
                        <Input
                          {...register(`bookingPlans.${plan}.services`)}
                          placeholder="Comma separated"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Monthly */}
            <TabsContent value="monthly">
              <div className="grid gap-4 md:grid-cols-3">
                {["monthlyStandard", "monthlyPremium", "monthlyElite"].map(
                  (plan) => (
                    <Card key={plan}>
                      <CardContent className="space-y-4 mt-4">
                        <div>
                          <Label>Price</Label>
                          <Input
                            {...register(`bookingPlans.${plan}.price`, {
                              required: true,
                            })}
                            type="number"
                          />
                        </div>
                        <div>
                          <Label>Services</Label>
                          <Input
                            {...register(`bookingPlans.${plan}.services`)}
                            placeholder="Comma separated"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  )
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* FAQ */}
        <div>
          <Label>Frequently Asked Questions</Label>
          {faqFA.fields.map((item, index) => (
            <div key={item.id} className="grid gap-4 md:grid-cols-2 mb-4">
              <Input
                {...register(`faq.${index}.question`, { required: true })}
                placeholder="Question"
              />
              <div className="flex gap-2">
                <Input
                  {...register(`faq.${index}.answer`, { required: true })}
                  placeholder="Answer"
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => faqFA.remove(index)}
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
          >
            <PlusCircle className="w-4 h-4 mr-2" /> Add FAQ
          </Button>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button type="submit" className="px-6 py-2">
            Create Gig
          </Button>
        </div>
      </form>
    </div>
  );
}
