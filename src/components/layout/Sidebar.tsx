import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, User, BarChart3, Dumbbell, Sparkles } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: '대시보드', path: '/' },
  { icon: Sparkles, label: 'WOD 전략', path: '/wod-strategy' },
  { icon: BookOpen, label: '운동 기록', path: '/logbook' },
  { icon: User, label: '내 프로필', path: '/profile' },
  { icon: BarChart3, label: '통계', path: '/stats' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-light-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-light-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">핏터보드</h1>
            <p className="text-xs text-text-tertiary">FitterBoard</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${
                      isActive
                        ? 'bg-primary text-white shadow-md'
                        : 'text-text-secondary hover:bg-light-card-hover hover:text-text-primary'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-light-border">
        <div className="text-xs text-text-tertiary text-center">
          <p>© 2024 핏터보드</p>
          <p className="mt-1">v1.0.0</p>
        </div>
      </div>
    </div>
  );
}
