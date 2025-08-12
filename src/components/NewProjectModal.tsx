import React, { useState } from 'react'
import { X, Sparkles } from 'lucide-react'

interface NewProjectModalProps {
  onClose: () => void
  onCreateProject: (name: string, description: string) => void
  isDarkMode: boolean
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  onClose,
  onCreateProject,
  isDarkMode
}) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && description.trim()) {
      onCreateProject(name.trim(), description.trim())
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-md rounded-2xl backdrop-blur-xl border p-6 ${
        isDarkMode
          ? 'bg-slate-900/40 border-white/20'
          : 'bg-white/40 border-white/50'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-xl ${
              isDarkMode
                ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                : 'bg-gradient-to-r from-blue-500 to-purple-500'
            }`}>
              <Sparkles className="text-white" size={20} />
            </div>
            <h2 className={`text-xl font-semibold ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              New Project
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
              isDarkMode
                ? 'hover:bg-white/10 text-white'
                : 'hover:bg-white/30 text-slate-700'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-white' : 'text-slate-700'
            }`}>
              Project Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter project name..."
              className={`w-full px-4 py-3 rounded-xl backdrop-blur-sm border transition-all duration-200 focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? 'bg-white/10 border-white/20 text-white placeholder-slate-400 focus:ring-purple-500/50'
                  : 'bg-white/30 border-white/30 text-slate-800 placeholder-slate-500 focus:ring-blue-500/50'
              }`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-white' : 'text-slate-700'
            }`}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you want to build..."
              rows={4}
              className={`w-full px-4 py-3 rounded-xl backdrop-blur-sm border transition-all duration-200 focus:outline-none focus:ring-2 resize-none ${
                isDarkMode
                  ? 'bg-white/10 border-white/20 text-white placeholder-slate-400 focus:ring-purple-500/50'
                  : 'bg-white/30 border-white/30 text-slate-800 placeholder-slate-500 focus:ring-blue-500/50'
              }`}
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 hover:scale-105 ${
                isDarkMode
                  ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  : 'bg-white/30 hover:bg-white/40 text-slate-700 border border-white/30'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 py-3 px-4 rounded-xl font-medium text-white transition-all duration-200 hover:scale-105 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
              }`}
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
