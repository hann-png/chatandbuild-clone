import React, { useState, useEffect } from 'react'
import { Sidebar } from './components/Sidebar'
import { ChatInterface } from './components/ChatInterface'
import { CodeEditor } from './components/CodeEditor'
import { Header } from './components/Header'
import { Project } from './types'

function App() {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    // Load projects from localStorage
    const savedProjects = localStorage.getItem('chatandbuild-projects')
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects)
      setProjects(parsedProjects)
      if (parsedProjects.length > 0) {
        setCurrentProject(parsedProjects[0])
      }
    }
  }, [])

  const createNewProject = (name: string, description: string) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name,
      description,
      createdAt: new Date(),
      files: [],
      messages: []
    }
    
    const updatedProjects = [newProject, ...projects]
    setProjects(updatedProjects)
    setCurrentProject(newProject)
    localStorage.setItem('chatandbuild-projects', JSON.stringify(updatedProjects))
  }

  const updateProject = (updatedProject: Project) => {
    const updatedProjects = projects.map(p => 
      p.id === updatedProject.id ? updatedProject : p
    )
    setProjects(updatedProjects)
    setCurrentProject(updatedProject)
    localStorage.setItem('chatandbuild-projects', JSON.stringify(updatedProjects))
  }

  const deleteProject = (projectId: string) => {
    const updatedProjects = projects.filter(p => p.id !== projectId)
    setProjects(updatedProjects)
    if (currentProject?.id === projectId) {
      setCurrentProject(updatedProjects.length > 0 ? updatedProjects[0] : null)
    }
    localStorage.setItem('chatandbuild-projects', JSON.stringify(updatedProjects))
  }

  return (
    <div className={`min-h-screen font-inter transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-5"></div>
      
      <Header 
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex h-[calc(100vh-4rem)] relative">
        <Sidebar
          projects={projects}
          currentProject={currentProject}
          setCurrentProject={setCurrentProject}
          createNewProject={createNewProject}
          deleteProject={deleteProject}
          isDarkMode={isDarkMode}
          collapsed={sidebarCollapsed}
        />
        
        <div className={`flex-1 flex transition-all duration-300 ${
          sidebarCollapsed ? 'ml-0' : 'ml-80'
        }`}>
          <div className="flex-1 flex">
            <ChatInterface
              currentProject={currentProject}
              updateProject={updateProject}
              isDarkMode={isDarkMode}
            />
            
            {currentProject && (
              <CodeEditor
                project={currentProject}
                updateProject={updateProject}
                isDarkMode={isDarkMode}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
