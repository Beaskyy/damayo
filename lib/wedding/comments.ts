import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export interface WeddingComment {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

const COMMENTS_FILE_PATH = path.join(process.cwd(), "data", "comments.json");

const INITIAL_COMMENTS: WeddingComment[] = [
  {
    id: "seed-1",
    name: "Uncle Segun & Auntie Bukola",
    message:
      "Wishing you both a lifetime of unending love, joy, and peace. You two are truly made for each other! Congratulations Oyindamola & Ayomide!",
    createdAt: "2026-09-28T14:30:00.000Z",
  },
  {
    id: "seed-2",
    name: "The Adebayo Family",
    message:
      "Congratulations Oyindamola and Ayomide! May your union be abundantly blessed with happiness, good health, fruitfulness, and boundless grace.",
    createdAt: "2026-09-28T16:15:00.000Z",
  },
  {
    id: "seed-3",
    name: "Kemi & Dapo",
    message:
      "So incredibly thrilled to celebrate your special day with you! Here is to the start of the greatest and sweetest adventure together.",
    createdAt: "2026-09-29T10:00:00.000Z",
  },
  {
    id: "seed-4",
    name: "Pastor & Mrs. Olatunji",
    message:
      "May God's unending grace, wisdom, and divine favor guide your beautiful marriage today and through all the years ahead. Huge congratulations!",
    createdAt: "2026-09-29T12:45:00.000Z",
  },
];

export async function getComments(): Promise<WeddingComment[]> {
  // If Supabase is connected, fetch from cloud database
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("id, name, message, created_at")
        .order("created_at", { ascending: false });

      if (!error && data) {
        if (data.length > 0) {
          return data.map((item) => ({
            id: String(item.id),
            name: item.name || "Guest",
            message: item.message || "",
            createdAt: item.created_at || new Date().toISOString(),
          }));
        } else {
          // Cloud DB is empty, seed it in background
          try {
            await supabase.from("comments").insert(
              INITIAL_COMMENTS.map((c) => ({
                name: c.name,
                message: c.message,
                created_at: c.createdAt,
              }))
            );
          } catch {}
          return INITIAL_COMMENTS;
        }
      } else if (error) {
        console.warn("Supabase query error:", error.message);
      }
    } catch (err) {
      console.error("Supabase fetch exception, falling back to local store:", err);
    }
  }

  // Local JSON fallback
  try {
    const data = await fs.readFile(COMMENTS_FILE_PATH, "utf-8");
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    return INITIAL_COMMENTS;
  } catch (error) {
    return INITIAL_COMMENTS;
  }
}

export async function addComment(
  name: string,
  message: string
): Promise<WeddingComment> {
  const trimmedName = name.trim();
  const trimmedMessage = message.trim();

  // If Supabase is configured, insert into Supabase
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("comments")
        .insert([{ name: trimmedName, message: trimmedMessage }])
        .select("id, name, message, created_at")
        .single();

      if (!error && data) {
        return {
          id: String(data.id),
          name: data.name,
          message: data.message,
          createdAt: data.created_at || new Date().toISOString(),
        };
      }
      if (error) {
        console.error("Supabase insert error:", error.message, error.details);
      }
    } catch (err) {
      console.error("Supabase insert exception:", err);
    }
  }

  // Fallback to local file
  const currentComments = await getComments();
  const newComment: WeddingComment = {
    id: crypto.randomUUID(),
    name: trimmedName,
    message: trimmedMessage,
    createdAt: new Date().toISOString(),
  };

  const updatedComments = [newComment, ...currentComments];

  try {
    const dir = path.dirname(COMMENTS_FILE_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(
      COMMENTS_FILE_PATH,
      JSON.stringify(updatedComments, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error("Error writing comment to file:", error);
  }

  return newComment;
}
