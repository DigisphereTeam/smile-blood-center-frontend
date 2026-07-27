import { z } from "zod";

export const patientRequisitionSchema = z
  .object({
    patientName: z.string().min(1, "Patient name is required"),

    hospital: z.string().min(1, "Hospital is required"),

    bloodGroup: z.string().min(1, "Blood group is required"),

    age: z
      .string()
      .min(1, "Age is required")
      .transform((val) => Number(val))
      .refine((val) => !Number.isNaN(val), "Age must be a number")
      .refine((val) => val >= 0, "Age cannot be negative")
      .refine((val) => val <= 150, "Invalid age"),

    diagnosis: z.string().min(1, "Diagnosis is required"),

    rhType: z.string().min(1, "Rh type is required"),

    gender: z.string().min(1, "Gender is required"),

    ipNumber: z.string().min(1, "IP Number is required"),

    referredBy: z.string().min(1, "Referred By is required"),

    wardNumber: z.string().optional(),

    transfusionIndications: z.object({
      Surgery: z.boolean(),
      Anemia: z.boolean(),
      Coagulopathy: z.boolean(),
      Thrombocytopenia: z.boolean(),
      Dialysis: z.boolean(),
      Burns: z.boolean(),
      Newborn: z.boolean(),
      Others: z.boolean(),
    }),

    previousTransfusion: z.boolean(),

    previousReaction: z.boolean(),

    reactionDetails: z.string().optional(),

    bloodComponents: z.array(
      z.object({
        component: z.string(),

        selected: z.boolean(),

        units: z.preprocess(
          (value) => (value === "" ? null : Number(value)),
          z.number().nullable(),
        ),

        requiredDateTime: z.any().nullable(),

        reserve: z.boolean(),
      }),
    ),

    isEmergency: z.boolean(),

    requirementSelection: z.string().optional(),

    physicianName: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Previous transfusion reaction details
    if (data.previousReaction && !data.reactionDetails?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["reactionDetails"],
        message: "Reaction details are required.",
      });
    }

    // Emergency fields
    if (data.isEmergency) {
      if (!data.requirementSelection) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["requirementSelection"],
          message: "Compatibility Test Type is required.",
        });
      }

      if (!data.physicianName?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["physicianName"],
          message: "Doctor Name is required.",
        });
      }
    }

    // At least one blood component must be selected
    if (!data.bloodComponents.some((component) => component.selected)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["bloodComponents"],
        message: "Select at least one blood component.",
      });
    }

    // Validate selected blood components
    data.bloodComponents.forEach((component, index) => {
      if (!component.selected) return;

      if (component.units === null || component.units === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["bloodComponents", index, "units"],
          message: "Units are required.",
        });
      } else if (component.units <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["bloodComponents", index, "units"],
          message: "Units must be greater than 0.",
        });
      }

      if (!component.requiredDateTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["bloodComponents", index, "requiredDateTime"],
          message: "Required date & time is required.",
        });
      }
    });
  });
