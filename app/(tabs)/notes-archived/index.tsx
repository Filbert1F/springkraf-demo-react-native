import GetNotes from "@/modules/get-notes";
import React from "react";

export default function NotesArchived() {

  return (
    <GetNotes endpoint="notes-archived" />
  );
}
