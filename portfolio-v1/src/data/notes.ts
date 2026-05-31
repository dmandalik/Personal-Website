export type NoteTeaser = {
  title: string;
  description: string;
  status: "drafting" | "planned";
};

export const notes: NoteTeaser[] = [
  {
    title: "Building an ML framework in C++ from scratch",
    description: "Notes on tensors, autodiff, ergonomics, and the parts of ML frameworks that only become clear when rebuilt.",
    status: "drafting",
  },
  {
    title: "What robotics teaches you about software reliability",
    description: "A practical look at latency, uncertainty, observability, and failure modes when software leaves the laptop.",
    status: "planned",
  },
  {
    title: "Understanding PyTorch by rebuilding small pieces",
    description: "Small, inspectable implementations that make autograd and model training less magical.",
    status: "planned",
  },
];
