import { z } from "zod";

export const patientRequisitionSchema = z
  .object({
    patientName: z.string().min(1, "Patient name is required"),

    hospital: z.string().min(1, "Hospital is required"),

    bloodGroup: z.string().min(1, "Blood group is required"),

    age: z.coerce.number().min(1).max(150),

    diagnosis: z.string().min(1),

    rhType: z.string().min(1),

    gender: z.string().min(1),

    ipNumber: z.string().min(1),

    referredBy: z.string().min(1),

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
    if (data.previousReaction && !data.reactionDetails) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["reactionDetails"],
        message: "Reaction details are required.",
      });
    }

    if (data.isEmergency) {
      if (!data.requirementSelection) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["requirementSelection"],
          message: "Requirement Selection Required",
        });
      }

      if (!data.physicianName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["physicianName"],
          message: "Doctor Name is Required",
        });
      }
    }
  });
