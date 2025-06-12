export default function ProfileBar() {
  return (
    <div className="bg-green-200 p-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="rounded-full"
        />
        <span className="font-medium">João Silva - Motorista</span>
      </div>
      <div className="flex gap-2">
        <button className="text-lg">🔍</button>
        <button className="text-lg">📅</button>
        <button className="text-lg">⏰</button>
        <button className="text-lg">☁️</button>
      </div>
    </div>
  );
}