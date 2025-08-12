import React from 'react'
import { Moon, Sun, Menu, X, Zap } from 'lucide-react'

interface HeaderProps {
  isDarkMode: boolean
  setIsDarkMode: (value: boolean) => void
  sidebarCollapsed: boolean
  setSidebarCollapsed: (value: boolean) => void
}

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  setIsDarkMode,
  sidebarCollapsed,
  setSidebarCollapsed
}) => {
  return (
    <header className={`h-16 border-b backdrop-blur-xl relative z-50 ${
      isDarkMode
        ? 'bg-slate-900/20 border-white/10'
        : 'bg-white/20 border-white/30'
    }`}>
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
              isDarkMode
                ? 'hover:bg-white/10 text-white'
                : 'hover:bg-white/30 text-slate-700'
            }`}
          >
            {sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
          
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-xl ${
              isDarkMode
                ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                : 'bg-gradient-to-r from-blue-500 to-purple-500'
            }`}>
              <Zap className="text-white" size={20} />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>
                ChatAndBuild
              </h1>
              <p className={`text-sm ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                AI Project Generator
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-3 rounded-xl backdrop-blur-sm transition-all duration-200 hover:scale-105 ${
              isDarkMode
                ? 'bg-white/10 hover:bg-white/20 text-yellow-400'
                : 'bg-white/30 hover:bg-white/40 text-slate-700'
            }`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  )
}
