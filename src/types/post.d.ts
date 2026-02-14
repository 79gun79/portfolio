type PostData = {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  readingTimeMinutes?: number;
  coverImageUrl?: string;
  createdAt?: string | Timestamp;
  updatedAt?: string | Timestamp;
};
