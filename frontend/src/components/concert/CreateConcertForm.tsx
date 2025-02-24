"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/hooks/use-toast";
import { Card } from "../ui/card";
import { FileUpload } from "./FileUpload";
import { uploadFileToUT } from "@/actions/upload";
import { createConcert, createConcertContract } from "@/actions/concerts";
import { LoadingPopup } from "./LoadingPopUp";

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Concert name must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  genre: z.string().min(2, {
    message: "Genre must be at least 2 characters.",
  }),
  file: z
    .union([
      z
        .instanceof(File)
        .refine(
          (file) => file.size <= MAX_FILE_SIZE,
          "File size must be less than 4MB"
        )
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          "Only image files (JPEG, JPG, PNG, WebP, GIF) are allowed"
        ),
      z.null(),
    ])
    .optional(),
  description: z.string().optional(),
  date: z.date({
    required_error: "A date is required.",
  }),
  limit: z.preprocess(
    (val) => (typeof val === "string" ? Number.parseInt(val, 10) : val),
    z.number().int().positive()
  ),
  price: z.preprocess(
    (val) => (typeof val === "string" ? Number.parseFloat(val) : val),
    z.number().positive()
  ),
});

export function CreateConcertForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [stages, setStages] = useState<
    { name: string; status: "pending" | "in-progress" | "completed" }[]
  >([
    { name: "Uploading image to server", status: "pending" },
    { name: "Creating concert contract", status: "pending" },
    { name: "Saving concert details", status: "pending" },
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      genre: "",
      file: null,
      description: "",
      limit: 0,
      price: 0,
    },
  });

  const updateStage = (
    index: number,
    status: "pending" | "in-progress" | "completed"
  ) => {
    setStages((prevStages) =>
      prevStages.map((stage, i) => (i === index ? { ...stage, status } : stage))
    );
  };

  const resetStages = () => {
    setStages(stages.map((stage) => ({ ...stage, status: "pending" })));
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    resetStages();

    try {
      // Step 1: Upload the image to the server (if user has image) - optional
      const file = values.file as File;
      let url = "";

      updateStage(0, "in-progress");
      if (file) {
        const { fileUrl, success } = await uploadFileToUT(file);

        if (!success) {
          throw new Error("Failed to upload image to server");
        }

        url = fileUrl as string;
      }
      updateStage(0, "completed");

      // Step 2: mint concert smart contract from concertFactory smart contract
      updateStage(1, "in-progress");
      const address = await createConcertContract({
        date: values.date,
        limit: values.limit,
      });
      updateStage(1, "completed");

      console.log(address);

      // Step 3: add to database
      updateStage(2, "in-progress");

      console.log(values);
      await createConcert({
        name: values.name,
        location: values.location,
        genre: values.genre,
        date: values.date,
        description: values.description || "",
        imageUrl: url || "",
        limit: values.limit,
        price: values.price,
        smartContractAddress: address,
      });
      updateStage(2, "completed");

      toast({
        title: "Concert created",
        description: "Your new concert has been successfully created.",
      });
    } catch (error) {
      toast({
        description: "Failed to create concert.",
        title: "Error",
      });
    } finally {
      // setIsLoading(false);
    }
  }

  return (
    <>
      <Card className="p-10 w-full max-w-xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full max-w-lg"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Concert Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter concert name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter concert location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a genre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Pop">Pop</SelectItem>
                      <SelectItem value="Rock">Rock</SelectItem>
                      <SelectItem value="R&B">R&B</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="limit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Limit</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter maximum number of ticket supply"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (in $)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter ticket price"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FileUpload
                  onChange={(file) => field.onChange(file)}
                  value={field.value ?? null}
                  accept="image/*"
                />
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter concert description"
                      className="resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a brief description of the concert (optional).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`w-[240px] pl-3 text-left font-normal ${
                            !field.value && "text-muted-foreground"
                          }`}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Concert"}
            </Button>
          </form>
        </Form>
      </Card>
      <LoadingPopup
        isOpen={isLoading}
        stages={stages}
        onClose={() => {
          setIsLoading(false);
          resetStages();
        }}
      />
    </>
  );
}
