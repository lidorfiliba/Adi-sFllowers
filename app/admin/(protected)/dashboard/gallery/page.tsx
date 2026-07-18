"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Trash2, Upload, GripVertical } from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type GalleryItem = { id: string; type: string; url: string; caption: string; sortOrder: number };

function SortableCard({ item, onDelete }: { item: GalleryItem; onDelete: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id });

  const cardStyle: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    background: "white",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    borderRadius: "1rem",
    overflow: "hidden",
  };

  return (
    <div ref={setNodeRef} style={cardStyle} className="group relative">
      <div className="relative h-48">
        <Image src={item.url} alt={item.caption || "גלריה"} fill className="object-cover" />
        <div className="absolute inset-0 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"
          style={{ background: "rgba(0,0,0,0.3)" }}>
          <button
            onClick={onDelete}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "#DC2626" }}
            aria-label="מחק תמונה"
          >
            <Trash2 size={16} color="white" />
          </button>
        </div>
      </div>
      <div className="p-3 flex items-center gap-2">
        <button
          {...listeners}
          {...attributes}
          className="cursor-grab active:cursor-grabbing touch-none p-1 rounded"
          style={{ color: "#9CA3AF" }}
          aria-label="גרור לשינוי סדר"
        >
          <GripVertical size={16} />
        </button>
        <p className="text-xs truncate flex-1" style={{ color: "#6B7280" }}>
          {item.caption || "ללא כיתוב"}
        </p>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  useEffect(() => {
    fetch("/api/gallery").then((r) => r.json()).then(setItems);
  }, []);

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const uploadRes = await fetch("/api/upload", { method: "POST", body: fd });
      const { url } = await uploadRes.json();
      const type = file.type.startsWith("video") ? "video" : "image";
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, caption, type }),
      });
      const item = await res.json();
      setItems((prev) => [...prev, item]);
      setCaption("");
      toast.success("הקובץ הועלה בהצלחה");
    } catch {
      toast.error("שגיאה בהעלאה");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("למחוק את התמונה?")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast.success("נמחק");
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    const reordered = arrayMove(items, oldIndex, newIndex);
    setItems(reordered);
    await fetch("/api/gallery/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: reordered.map((i) => i.id) }),
    });
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black" style={{ color: "#1B4332" }}>ניהול גלריה</h1>
        <p style={{ color: "#6B7280" }}>גררו לשינוי סדר · לחצו על האשפה למחיקה</p>
      </div>

      <div
        className="rounded-2xl p-6 mb-8"
        style={{ background: "white", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}
      >
        <h2 className="font-bold mb-4" style={{ color: "#1B4332" }}>העלאת קובץ חדש</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="כיתוב לתמונה (אופציונלי)"
            className="flex-1 px-4 py-3 rounded-xl border-2 text-base focus:outline-none"
            style={{ borderColor: "#E5E7EB" }}
          />
          <label
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold cursor-pointer"
            style={{ background: uploading ? "#E5E7EB" : "#1B4332", color: uploading ? "#6B7280" : "#FFF8F0" }}
          >
            <Upload size={18} />
            {uploading ? "מעלה..." : "בחר קובץ"}
            <input
              type="file"
              className="sr-only"
              accept="image/*,video/*"
              disabled={uploading}
              onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
            />
          </label>
        </div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <SortableCard key={item.id} item={item} onDelete={() => handleDelete(item.id)} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {items.length === 0 && (
        <div className="text-center py-20" style={{ color: "#6B7280" }}>
          <p className="text-lg">הגלריה ריקה</p>
          <p className="text-sm mt-2">העלו תמונות ווידאו מהטופס למעלה</p>
        </div>
      )}
    </div>
  );
}
