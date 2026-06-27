"use client";

import { InlineWidget } from "react-calendly";

export default function Schedule() {
  return (
    <div style={{ height: "700px" }}>
      <InlineWidget
        url={process.env.NEXT_PUBLIC_CALENDLY_URL!}
      />
    </div>
  );
}