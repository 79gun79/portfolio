import { motion } from 'motion/react';
import { Post } from './Post';
import { useEffect, useState } from 'react';
import { fetchPosts } from '../api/post';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../util/firebase';

export function Posts() {
  const [posts, setPosts] = useState<PostData[]>([]);

  const trackPostClick = (post: PostData) => {
    if (!analytics) return;

    try {
      logEvent(analytics, 'select_content', {
        ...(import.meta.env.DEV ? { debug_mode: true } : null),
        content_type: 'post',
        item_id: post.id,
        item_name: post.title,
        tags: post.tags ?? [],
      });
    } catch {
      // ignore
    }
  };

  // useEffect(() => {
  //   seedPosts();
  // }, []);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data as PostData[]);
      } catch (e) {
        console.error('Error loading posts:', e);
      }
    };
    loadPosts();
  }, []);

  return (
    <section
      id="posts"
      className="bg-white px-4 py-20 sm:px-6 sm:py-32 lg:py-48"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
          className="mb-10 sm:mb-14"
        >
          <div className="mb-4 text-sm font-medium text-slate-500 sm:mb-6 sm:text-base">
            Posts
          </div>
          <h2 className="mb-3 text-3xl font-bold text-slate-900 sm:text-5xl lg:text-6xl">
            최근 게시글
          </h2>
          <p className="max-w-3xl text-base text-slate-600 sm:text-lg">
            개발하면서 기록한 작업과 생각을 모아둡니다.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: false, amount: 0.25 }}
            >
              <Post post={post} onClick={() => trackPostClick(post)} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
