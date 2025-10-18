"use client";

import { useState, useEffect } from "react";
import io from "socket.io-client";

import LoginModal from "@/components/LoginModal";
import Header from "@/components/Header";
import TweetComposer from "@/components/TweetComposer";
import TweetFeed from "@/components/TweetFeed";
import LoadingScreen from "@/components/LoadingScreen";
import { useTweets } from "@/hooks/useTweets";
import { Plus } from "lucide-react";

const USER_KEY = "twitterCloneUserName";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL; 

let socket;

export default function Page() {
  const [userName, setUserName] = useState(null);
  const [newTweet, setNewTweet] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [isAppLoading, setIsAppLoading] = useState(true);

  const { tweets, setTweets, isLoading, isPosting, postTweet, deleteTweet } =
    useTweets(userName, BACKEND_URL);

  // Inicializa usuário e splash screen
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_KEY);
    if (storedUser) setUserName(storedUser);

    const timer = setTimeout(() => setIsAppLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Inicializa WebSocket
  useEffect(() => {
    if (!socket) {
      socket = io(BACKEND_URL);

      socket.on("connect", () => console.log("⚡ Conectado ao WebSocket:", socket.id));

      socket.on("tweetCreated", (tweet) => {
        setTweets((prev) => {
          if (prev.some((t) => t._id === tweet._id)) return prev; // evita duplicatas
          return [tweet, ...prev];
        });
      });

      socket.on("tweetDeleted", (id) => {
        setTweets((prev) => prev.filter((t) => t._id !== id));
      });
    }

    return () => {
      if (socket) socket.disconnect();
    };
  }, [setTweets]);

  const handleLogin = (name) => {
    if (name?.trim()) {
      localStorage.setItem(USER_KEY, name.trim());
      setUserName(name.trim());
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(USER_KEY);
    setUserName(null);
  };

  const handleStartReply = (id, author, content) => {
    setReplyingTo({ id, author, content });
    const textarea = document.querySelector("textarea");
    if (textarea) textarea.focus();
  };


  const handlePost = async () => {
    if (!newTweet?.trim()) return;

    const savedTweet = await postTweet({ newTweet, replyingTo });

    if (socket && savedTweet) {
      socket.emit("newTweet", savedTweet);
    }

    setNewTweet("");
    setReplyingTo(null);
  };

  if (isAppLoading) return <LoadingScreen isVisible={true} />;

  if (!userName) return <LoginModal handleLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center">
      <div className="w-full max-w-lg bg-gray-900 border-l border-r border-gray-800 relative">
        <Header userName={userName} handleLogout={handleLogout} />
        <TweetComposer
          newTweet={newTweet}
          setNewTweet={setNewTweet}
          replyingTo={replyingTo}
          setReplyingTo={setReplyingTo}
          onSubmit={handlePost}
          isPosting={isPosting}
        />
        <TweetFeed
          tweets={tweets}
          userName={userName}
          startReply={handleStartReply}
          deleteTweet={deleteTweet}
          isLoading={isLoading}
        />
        <button
          onClick={() => document.querySelector("textarea")?.focus()}
          className="fixed bottom-5 right-5 bg-blue-500 text-white p-4 rounded-full shadow-xl hover:bg-blue-600"
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
}
