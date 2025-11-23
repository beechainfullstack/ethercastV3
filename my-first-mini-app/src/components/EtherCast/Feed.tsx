"use client";

import { useState } from "react";
import {
  AffirmationComposer,
  AffirmationCast,
} from "@/components/EtherCast/AffirmationComposer";
import { AffirmationList, DisplayAffirmation } from "@/components/EtherCast/AffirmationList";

export const EtherCastFeed = () => {
  const [items, setItems] = useState<DisplayAffirmation[]>([]);

  const handleCastSuccess = (cast: AffirmationCast) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setItems((prev) => [
      {
        id,
        text: cast.text,
        txHash: cast.txHash,
      },
      ...prev,
    ]);
  };

  return (
    <>
      <AffirmationComposer onCastSuccess={handleCastSuccess} />
      <AffirmationList items={items} />
    </>
  );
};
