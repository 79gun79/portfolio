type PostData = {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  coverImageUrl?: string;
  /** Markdown file path (e.g. '/posts/post-1.md' under public/) */
  contentMd?: string;
  createdAt?: string | Timestamp;
  updatedAt?: string | Timestamp;
};
