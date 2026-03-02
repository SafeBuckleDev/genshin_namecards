"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [uid, setUid] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!uid) return;

    router.push(`/uid/${uid}`);
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          placeholder="Enter UID"
          className="border p-2 rounded"
        />
        <button className="bg-blue-500 text-white px-4 rounded">
          View Profile
        </button>
      </form>
    </main>
  );
}
