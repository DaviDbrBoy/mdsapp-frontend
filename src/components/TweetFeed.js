"use client";

import TweetItem from "./TweetItem";
import { motion, AnimatePresence } from "framer-motion";

export default function TweetFeed({ tweets, userName, startReply, deleteTweet, isLoading }) {
  // Remove tweets duplicados por _id
  const uniqueTweets = Array.from(new Map(tweets.map((t) => [t._id, t])).values());

  return (
    <main>
      <AnimatePresence>
        {uniqueTweets.length === 0 ? (
          <motion.div
            key="empty"
            className="text-gray-500 text-center p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Nenhuma mensagem ainda 💬
          </motion.div>
        ) : (
          uniqueTweets.map((t) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <TweetItem
                tweet={t}
                userName={userName}
                startReply={() => startReply(t._id, t.author, t.content)} // ✅ envia conteúdo completo
                deleteTweet={deleteTweet}
              />
            </motion.div>
          ))
        )}
      </AnimatePresence>

      {isLoading && (
        <div className="text-gray-400 text-center py-4">
          Carregando mais...
        </div>
      )}
    </main>
  );
}