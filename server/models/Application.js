import mongoose from "mongoose";

const applicationSchema = mongoose.Schema(
  {
    company_name: {
      type: String,
      required: true,
    },
    job_title: {
      type: String,
      required: true,
    },
    apply_date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Applied", "Interview", "Rejected", "OA", "Offered"],
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Application = mongoose.model("Application", applicationSchema);
