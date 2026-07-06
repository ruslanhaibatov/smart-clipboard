export type ClipboardCategory = "Code" | "Link" | "Email" | "Text" | "Other";

export interface ClipboardItem {
  id: string;
  title: string;
  content: string;
  category: ClipboardCategory;
  isFavorite: boolean;
  createdAt: number;
}
