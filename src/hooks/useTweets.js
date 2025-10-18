"use client";
import { useEffect, useState } from "react";

const TWEETS_PER_PAGE = 10;

export function useTweets(userName, backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL) {
  const [tweets, setTweets] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    setTweets([]);
    setPage(1);
    setHasMore(true);
  }, [userName]);

  useEffect(() => {
    if (!userName) return;
    fetchTweets();
  }, [page, userName]);

  async function fetchTweets() {
    try {
      const url = new URL("/tweets", backendUrl);
      url.searchParams.set("page", page);
      url.searchParams.set("limit", TWEETS_PER_PAGE);

      const res = await fetch(url.toString());
      const data = await res.json();

      if (data.length < TWEETS_PER_PAGE) setHasMore(false);
      setTweets(prev => [...prev, ...data]);
    } catch (err) {
      console.error("Erro ao buscar tweets:", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function postTweet({ newTweet, replyingTo }) {
    if (!newTweet?.trim() || isPosting || !userName) return;
    setIsPosting(true);

    const tweetData = {
      author: userName,
      content: newTweet.trim(),
      timestamp: Date.now(),
      replyTo: replyingTo?._id || null,
      repliedTweet: replyingTo || null
    };

    try {
      const res = await fetch(`${backendUrl}/tweets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tweetData),
      });
      const created = await res.json();
      setTweets(prev => [created, ...prev]);
      return created;
    } catch (err) {
      console.error("Erro ao postar tweet:", err);
    } finally {
      setIsPosting(false);
    }
  }

  async function deleteTweet(id) {
    try {
      const url = new URL("/tweets", backendUrl);
      await fetch(url.toString(), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setTweets(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      console.error("Erro ao deletar tweet:", err);
    }
  }

  return {
    tweets,
    setTweets,
    isLoading,
    hasMore,
    isPosting,
    postTweet,
    deleteTweet,
  };
}
