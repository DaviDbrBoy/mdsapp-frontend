import { connectDB } from "@/lib/mongodb";
import Tweet from "@/lib/tweetModel";

// ✅ GET com paginação
export async function GET(request) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const skip = (page - 1) * limit;

  const tweets = await Tweet.find()
    .sort({ timestamp: -1 })
    .skip(skip)
    .limit(limit);

  return Response.json(tweets);
}

// ✅ POST - criar tweet
export async function POST(request) {
  await connectDB();

  const data = await request.json();
  const newTweet = await Tweet.create(data);

  return Response.json(newTweet);
}

// ✅ DELETE - remover tweet
export async function DELETE(request) {
  await connectDB();

  const { id } = await request.json();
  await Tweet.findByIdAndDelete(id);

  return Response.json({ success: true });
}