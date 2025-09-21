import { useForm, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sparkles, Calendar, Award, PlusCircle, X, Star, HelpCircle, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import CreateGigsPlans from "./CreateGigsPlans";

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
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      gigTitle: "",
      relatedTopics: [],
      aboutGig: "",
      services: [],
      keywords: [],
      plans: {
        instant: { price: 0, description: "", features: [] },
        weekly: {
          basic: { price: 0, description: "", features: [] },
          intensive: { price: 0, description: "", features: [] },
        },
        monthly: {
          standard: { price: 0, description: "", features: [] },
          premium: { price: 0, description: "", features: [] },
          elite: { price: 0, description: "", features: [] },
        },
      },
      faqs: [],
    },
  });

  const relatedTopicsFA = useFieldArray({ control, name: "relatedTopics" });
  const keywordsFA = useFieldArray({ control, name: "keywords" });
  const servicesFA = useFieldArray({ control, name: "services" });

  // Add feature to a field
  const addFeatureToField = (fieldName, feature) => {
    const current = getValues(fieldName) || [];
    setValue(fieldName, [...current, feature], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // Remove feature from a field
  const removeFeatureFromField = (fieldName, index) => {
    const current = getValues(fieldName) || [];
    const updated = current.filter((_, i) => i !== index);
    setValue(fieldName, updated, { shouldValidate: true, shouldDirty: true });
  };

// faqs field array
  const {
    fields: faqFields,
    append: addFaq,
    remove: removeFaq,
  } = useFieldArray({ control, name: "faqs" });

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
            <CardTitle className="text-2xl font-bold text-primary ">
              Basic Information
            </CardTitle>
            <small className="text-muted-foreground text-xs flex items-center gap-1">
              <Sparkles size={10} className="h-3 w-3" /> Share your expertise
              and start earning by creating an amazing gig
            </small>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <Label className="font-bold">Title</Label>
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
                {/* --- Instant Plan --- */}
                <CreateGigsPlans
                  title="Instant Session"
                  planPath="plans.instant"
                  control={control}
                  register={register}
                  errors={errors}
                  watch={watch}
                  addFeature={addFeatureToField}
                  removeFeature={removeFeatureFromField}
                />
              </TabsContent>

              {/* Weekly */}
              <TabsContent value="weekly" className="space-y-6 mt-6">
                {["basic", "intensive"].map((key) => (
                  <CreateGigsPlans
                    key={key}
                    title={
                      key.charAt(0).toUpperCase() + key.slice(1) + " Weekly"
                    }
                    planPath={`plans.weekly.${key}`}
                    control={control}
                    register={register}
                    errors={errors}
                    watch={watch}
                    addFeature={addFeatureToField}
                    removeFeature={removeFeatureFromField}
                  />
                ))}
              </TabsContent>

              {/* Monthly */}
              <TabsContent value="monthly" className="space-y-6 mt-6">
                {["standard", "premium", "elite"].map((key) => (
                  <CreateGigsPlans
                    key={key}
                    title={
                      key.charAt(0).toUpperCase() + key.slice(1) + " Monthly"
                    }
                    planPath={`plans.monthly.${key}`}
                    control={control}
                    register={register}
                    errors={errors}
                    watch={watch}
                    addFeature={addFeatureToField}
                    removeFeature={removeFeatureFromField}
                  />
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="shadow-medium border-0 rounded-md ">
          <CardHeader>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                <CardTitle className="text-primary font-bold text-2xl">
                  Frequently Asked Questions
                </CardTitle>
              </div>
              <Button
                type="button"
                onClick={() => addFaq({ question: "", answer: "" })}
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" /> Add FAQ
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {faqFields.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <HelpCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>
                  No FAQs added yet. Click "Add FAQ" to create your first
                  question and answer.
                </p>
              </div>
            )}
            {faqFields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 bg-muted/30 rounded-lg border border-border/50 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">FAQ {index + 1}</h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFaq(index)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Question</Label>
                    <Input
                      {...register(`faqs.${index}.question`, {
                        required: "Question is required",
                      })}
                      className="bg-background"
                      placeholder="Enter your frequently asked question..."
                    />
                    {errors.faqs?.[index]?.question && (
                      <p className="text-sm text-destructive">
                        {errors.faqs[index].question.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Answer</Label>
                    <Textarea
                      {...register(`faqs.${index}.answer`, {
                        required: "Answer is required",
                      })}
                      className="bg-background min-h-[80px]"
                      placeholder="Provide a helpful answer..."
                    />
                    {errors.faqs?.[index]?.answer && (
                      <p className="text-sm text-destructive">
                        {errors.faqs[index].answer.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
