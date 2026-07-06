import type { ClipboardCategory } from "../types/clipboard";

export function detectCategory(value: string): ClipboardCategory {
  const text = value.trim();

  if (!text) return "Other";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const linkRegex = /^(https?:\/\/|www\.)[^\s]+$/i;

  const codeSignals = [
    "const ",
    "let ",
    "var ",
    "function ",
    "=>",
    "return ",
    "import ",
    "export ",
    "<div",
    "{",
    "}",
    ";",
  ];

  if (emailRegex.test(text)) return "Email";
  if (linkRegex.test(text)) return "Link";

  const looksLikeCode = codeSignals.some((signal) => text.includes(signal));

  if (looksLikeCode) return "Code";
  if (text.length > 0) return "Text";

  return "Other";
}
