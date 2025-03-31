import mongoose from "mongoose";

const knowledgeBaseSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const KnowledgeBase = mongoose.model("KnowledgeBase", knowledgeBaseSchema);

export default KnowledgeBase;
