import { PostEditor } from "@/components/blog/post-editor";

export default function Write() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Write a New Post</h1>
          <p className="mt-2 text-gray-600">
            Share your knowledge with the EcoConnect community
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PostEditor />
      </div>
    </div>
  );
}
