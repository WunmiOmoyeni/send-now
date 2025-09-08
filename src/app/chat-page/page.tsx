export default function ChatPage() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-16 bg-white border-r flex flex-col items-center py-4 space-y-6">
        <div className="w-10 h-10 flex items-center justify-center">
          <img src="/logo.png" alt="SendNow" className="w-8 h-8" />
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          ☰
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg">💬</button>
        <button className="p-2 hover:bg-gray-100 rounded-lg">📞</button>
        <button className="p-2 hover:bg-gray-100 rounded-lg">🔄</button>
        <div className="flex-1" />
        <button className="p-2 hover:bg-gray-100 rounded-lg">⭐</button>
        <button className="p-2 hover:bg-gray-100 rounded-lg">📁</button>
        <div className="w-10 h-10 rounded-full overflow-hidden border mt-4">
          <img src="/user.png" alt="User" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Chat List */}
      <div className="w-80 border-r flex flex-col">
        <div className="p-4 text-lg font-semibold">Chats</div>
        <div className="px-4">
          <input
            type="text"
            placeholder="Search or Start a new chat"
            className="w-full p-2 border rounded-lg text-sm"
          />
        </div>
        <div className="p-4">
          <button className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 p-3 rounded-lg w-full">
            <span className="text-blue-500 text-xl">＋</span>
            <div>
              <div className="font-medium">Start a new chat</div>
              <div className="text-sm text-gray-500">With Family or Friend</div>
            </div>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <img src="/logo.png" alt="SendNow Logo" className="w-20 h-20 mb-4" />
        <h1 className="text-2xl font-bold">
          <span className="text-black">Send</span>
          <span className="text-blue-500">Now</span>
        </h1>
        <p className="text-gray-500 text-center max-w-md mt-2">
          Real-time conversations, media sharing, and smart features to keep
          communication smooth and intuitive.
        </p>
      </div>
    </div>
  );
}
