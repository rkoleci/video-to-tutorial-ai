import { useAuth } from "../hooks/useAuth";

export default function WelcomeHeader() {
  const { isAuthed, user } = useAuth()

  if (!isAuthed) {
    return null
  }

  return (
    <div className="w-full  mb-3 md:mb-8">

      {/* Greeting and avatars */}
      <div className="flex justify-between items-center">
        {/* Greeting */}
        <h4 className="text-3xl font-semibold text-black flex items-center space-x-2">
          <span>Welcome back,</span>
          <span className="font-bold">{user?.firstName || ''}</span>
          <span className="text-3xl">👋</span>
        </h4>
      </div>
    </div>
  );
}
