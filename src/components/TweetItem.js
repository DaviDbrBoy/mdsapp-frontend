"use client";
import { MessageSquare, Trash2, Check } from "lucide-react";

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = Date.now();
  const diff = Math.floor((now - timestamp) / 1000);
  if (diff < 60) return `${diff}s atrás`;
  const m = Math.floor(diff / 60);
  if (m < 60) return `${m}m atrás`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h atrás`;
  return date.toLocaleDateString("pt-BR");
};

// Lista de usuários verificados
const verifiedUsers = ["David"]; // adicione quem quiser

export default function TweetItem({ tweet, userName, startReply, deleteTweet, allTweets }) {
  const isSelf = userName === tweet.author;

  // Obter o tweet citado
  const repliedTweet = tweet.repliedTweet || (tweet.replyTo ? allTweets.find(t => t._id === tweet.replyTo) : null);

  const renderUserName = (author) => (
    <div className="flex items-center space-x-1">
      <p className="text-white font-semibold">{tweet.author}</p>
      {verifiedUsers.includes(tweet.author) && (
        <span className="inline-flex items-center justify-center w-4 h-4 bg-blue-500 rounded-full ml-1">
          <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.285 6.709l-11.285 11.291-5.285-5.291 1.416-1.416 3.869 3.869 9.869-9.869z" />
          </svg>
        </span>
      )}
    </div>
  );

  return (
    <div className="p-4 border-b border-gray-800 hover:bg-gray-800/50">
      <div className="flex space-x-3">
        {/* Avatar */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${isSelf ? 'bg-blue-600' : 'bg-pink-500'}`}>
          {tweet.author.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1">
          {/* Header */}
          <div className="flex justify-between">
            {renderUserName(tweet.author)}
            <span className="text-gray-500 text-xs">{formatTime(tweet.timestamp)}</span>
          </div>

          {/* Conteúdo */}
          {repliedTweet && (
            <div className="mt-1">
              {/* Barra lateral com tweet citado */}
              <div className="border-l-4 border-blue-400 pl-3 mb-2">
                <div className="flex items-center space-x-1">
                  <p className="text-blue-400 font-semibold">@{repliedTweet.author}</p>
                  {verifiedUsers.includes(repliedTweet.author) && (
                    <Check className="text-blue-400 w-4 h-4 inline" />
                  )}
                </div>
                <p className="text-gray-300 mt-0.5">{repliedTweet.content}</p>
              </div>
              {/* Conteúdo da resposta */}
              <p className="text-gray-100 whitespace-pre-wrap break-words">{tweet.content}</p>
            </div>
          )}

          {!repliedTweet && (
            <p className="text-gray-300 mt-1 whitespace-pre-wrap break-words">{tweet.content}</p>
          )}

          {/* Ações */}
          <div className="flex space-x-3 text-gray-500 mt-3">
            {!isSelf && (
              <button
                onClick={() => startReply(tweet._id, tweet.author)}
                className="hover:text-blue-400 flex items-center space-x-1"
              >
                <MessageSquare size={16} />
                <span className="text-xs">Responder</span>
              </button>
            )}
            {isSelf && (
              <button
                onClick={() => deleteTweet(tweet._id)}
                className="hover:text-red-500 flex items-center space-x-1 p-1 rounded-full transition hover:bg-gray-800"
                title="Excluir tweet"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
