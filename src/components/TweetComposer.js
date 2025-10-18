"use client";

import { CornerDownLeft } from "lucide-react";

export default function TweetComposer({
  newTweet,
  setNewTweet,
  replyingTo,
  setReplyingTo,
  onSubmit,
  isPosting,
}) {
  return (
    <div className="p-4 border-b border-gray-800">
      {replyingTo && (
        <div className="text-sm text-gray-400 mb-2 flex justify-between items-center">
          <span>
            Respondendo a{" "}
            <span className="text-blue-400">@{replyingTo.author}</span>
          </span>
          <button
            onClick={() => setReplyingTo(null)}
            className="ml-2 text-red-400 text-xs font-semibold"
          >
            Cancelar
          </button>
        </div>
      )}
      <textarea
        value={newTweet}
        onChange={(e) => setNewTweet(e.target.value)}
        placeholder={
          replyingTo
            ? `Sua resposta para @${replyingTo.author}`
            : "O que está acontecendo entre vocês?"
        }
        className="w-full bg-transparent text-white border-none focus:outline-none resize-none"
        rows={3}
      />
      <div className="flex justify-end pt-2">
        <button
          onClick={onSubmit}
          disabled={!newTweet.trim() || isPosting}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center space-x-1 disabled:opacity-50"
        >
          <CornerDownLeft size={16} />
          <span>{isPosting ? "Postando..." : replyingTo ? "Responder" : "Postar"}</span>
        </button>
      </div>
    </div>
  );
}
