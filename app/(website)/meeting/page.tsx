"use client";

import { InlineWidget } from "react-calendly";

export default function Schedule() {
  return (
    <div style={{ height: "700px" }}>
      <InlineWidget
        url="https://calendly.com/xconcile/30min"
      />
    </div>
  );
}