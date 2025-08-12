import React, { useState } from 'react'
import { Plus, Folder, Trash2, Calendar, FileText } from 'lucide-react'
import { Project } from '../types'
import { NewProjectModal } from './NewProjectModal'

interface SidebarProps {
  projects: Project[]
  currentProject: Project | null
  setCurrentProject: (project: Project) => void
  createNewProject: (name: string, description: string) => void
  deleteProject: (projectId: string) => void
  isDarkMode: boolean
  collapsed: boolean
}

export const Sidebar: React.FC<SidebarProps> = ({
  projects,
  currentProject,
  setCurrentProject,
  createNewProject,
  deleteProject,
  isDarkMode,
  collapsed
}) => {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)

  return (
    <>
      <div className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 backdrop-blur-xl border-r transition-transform duration-300 z-40 ${
        collapsed ? '-translate-x-full' : 'translate-x-0'
      } ${
        isDarkMode
          ? 'bg-slate-900/20 border-white/10'
          : 'bg-white/20 border-white/30'
      }`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-lg font-semibold ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              Projects
            </h2>
            <button
              onClick={() => setShowNewProjectModal(true)}
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
              } text-white`}
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3">
            {projects.length === 0 ? (
              <div className={`text-center py-8 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                <Folder size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-sm">No projects yet</p>
                <p className="text-xs mt-1">Create your first project to get started</p>
              </div>
            ) : (
              projects.map((project) => (
                <div
                  key={project.id}
                  className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                    currentProject?.id === project.id
                      ? isDarkMode
                        ? 'bg-white/20 border border-white/30'
                        : 'bg-white/40 border border-white/50'
                      : isDarkMode
                        ? 'bg-white/5 hover:bg-white/10 border border-white/10'
                        : 'bg-white/20 hover:bg-white/30 border border-white/20'
                  }`}
                  onClick={() => setCurrentProject(project)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <FileText size={16} className={
                          isDarkMode ? 'text-purple-400' : 'text-blue-600'
                        } />
                        <h3 className={`font-medium truncate ${
                          isDarkMode ? 'text-white' : 'text-slate-800'
                        }`}>
                          {project.name}
                        </h3>
                      </div>
                      <p className={`text-sm mb-3 line-clamp-2 ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {project.description}
                      </p>
                      <div className={`flex items-center space-x-1 text-xs ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        <Calendar size={12} />
                        <span>
                          {new Date(project.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteProject(project.id)
                      }}
                      className={`opacity-0 group-hover:opacity-100 p-1 rounded transition-all duration-200 hover:scale-110 ${
                        isDarkMode
                          ? 'hover:bg-red-500/20 text-red-400'
                          : 'hover:bg-red-500/20 text-red-500'
                      }`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {showNewProjectModal && (
        <NewProjectModal
          onClose={() => setShowNewProjectModal(false)}
          onCreateProject={createNewProject}
          isDarkMode={isDarkMode}
        />
      )}
    </>
  )
}
