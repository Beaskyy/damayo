import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

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
  try {
    const data = await fs.readFile(COMMENTS_FILE_PATH, "utf-8");
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      return parsed.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    return INITIAL_COMMENTS;
  } catch (error) {
    // If file doesn't exist, create it with initial comments
    try {
      const dir = path.dirname(COMMENTS_FILE_PATH);
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(
        COMMENTS_FILE_PATH,
        JSON.stringify(INITIAL_COMMENTS, null, 2),
        "utf-8"
      );
    } catch {
      // Ignore write errors if in read-only environment
    }
    return INITIAL_COMMENTS;
  }
}

export async function addComment(
  name: string,
  message: string
): Promise<WeddingComment> {
  const currentComments = await getComments();

  const newComment: WeddingComment = {
    id: crypto.randomUUID(),
    name: name.trim(),
    message: message.trim(),
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
