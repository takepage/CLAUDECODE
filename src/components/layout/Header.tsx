import { Bell, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-light-border sticky top-0 z-10">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Welcome Message */}
          <div>
            <h2 className="text-2xl font-bold text-text-primary">
              안녕하세요, <span className="text-primary">John</span>님!
            </h2>
            <p className="text-sm text-text-secondary mt-1">오늘도 열심히 운동해봅시다!</p>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-light-bg border border-light-border">
              <Search className="w-4 h-4 text-text-tertiary" />
              <input
                type="text"
                placeholder="검색..."
                className="bg-transparent border-none outline-none text-sm text-text-primary placeholder-text-tertiary w-40"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-xl hover:bg-light-card-hover transition-colors">
              <Bell className="w-5 h-5 text-text-secondary" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent-red rounded-full"></span>
            </button>

            {/* Profile */}
            <button className="flex items-center gap-3 p-2 rounded-xl hover:bg-light-card-hover transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                JD
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
