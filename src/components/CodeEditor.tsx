import React, { useState } from 'react'
import { Download, FileText, Copy, Check } from 'lucide-react'
import { Project, ProjectFile } from '../types'

interface CodeEditorProps {
  project: Project
  updateProject: (project: Project) => void
  isDarkMode: boolean
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  project,
  updateProject,
  isDarkMode
}) => {
  const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(
    project.files.length > 0 ? project.files[0] : null
  )
  const [copiedFile, setCopiedFile] = useState<string | null>(null)

  const handleFileChange = (content: string) => {
    if (!selectedFile) return

    const updatedFile = { ...selectedFile, content }
    const updatedFiles = project.files.map(f => 
      f.id === selectedFile.id ? updatedFile : f
    )
    
    updateProject({
      ...project,
      files: updatedFiles
    })
    setSelectedFile(updatedFile)
  }

  const copyToClipboard = async (content: string, fileId: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedFile(fileId)
      setTimeout(() => setCopiedFile(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const exportToZip = () => {
    // In a real implementation, this would create and download a ZIP file
    const projectData = {
      name: project.name,
      description: project.description,
      files: project.files
    }
    
    const dataStr = JSON.stringify(projectData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `${project.name.replace(/\s+/g, '-').toLowerCase()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  if (project.files.length === 0) {
    return (
      <div className={`flex-1 max-w-2xl border-l backdrop-blur-xl ${
        isDarkMode
          ? 'border-white/10 bg-slate-900/20'
          : 'border-white/30 bg-white/20'
      }`}>
        <div className={`flex items-center justify-center h-full p-8 ${
          isDarkMode ? 'text-slate-400' : 'text-slate-500'
        }`}>
          <div className="text-center">
            <FileText size={48} className="mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No Files Generated</h3>
            <p className="text-sm">Start a conversation to generate code files</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex-1 max-w-2xl border-l backdrop-blur-xl flex flex-col ${
      isDarkMode
        ? 'border-white/10 bg-slate-900/20'
        : 'border-white/30 bg-white/20'
    }`}>
      {/* File tabs */}
      <div className={`flex items-center justify-between p-4 border-b ${
        isDarkMode ? 'border-white/10' : 'border-white/30'
      }`}>
        <div className="flex space-x-2 overflow-x-auto">
          {project.files.map((file) => (
            <button
              key={file.id}
              onClick={() => setSelectedFile(file)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 whitespace-nowrap ${
                selectedFile?.id === file.id
                  ? isDarkMode
                    ? 'bg-white/20 text-white border border-white/30'
                    : 'bg-white/40 text-slate-800 border border-white/50'
                  : isDarkMode
                    ? 'bg-white/5 text-slate-300 hover:bg-white/10'
                    : 'bg-white/20 text-slate-600 hover:bg-white/30'
              }`}
            >
              {file.name}
            </button>
          ))}
        </div>
        
        <button
          onClick={exportToZip}
          className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
            isDarkMode
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
          } text-white`}
        >
          <Download size={16} />
        </button>
      </div>

      {/* Code editor */}
      {selectedFile && (
        <div className="flex-1 flex flex-col">
          <div className={`flex items-center justify-between p-3 border-b ${
            isDarkMode ? 'border-white/10' : 'border-white/30'
          }`}>
            <div className="flex items-center space-x-2">
              <FileText size={16} className={
                isDarkMode ? 'text-purple-400' : 'text-blue-600'
              } />
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>
                {selectedFile.path}
              </span>
            </div>
            
            <button
              onClick={() => copyToClipboard(selectedFile.content, selectedFile.id)}
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                isDarkMode
                  ? 'hover:bg-white/10 text-white'
                  : 'hover:bg-white/30 text-slate-700'
              }`}
            >
              {copiedFile === selectedFile.id ? (
                <Check size={16} className="text-green-500" />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>
          
          <div className="flex-1 p-4">
            <textarea
              value={selectedFile.content}
              onChange={(e) => handleFileChange(e.target.value)}
              className={`w-full h-full resize-none font-mono text-sm leading-relaxed backdrop-blur-sm border rounded-xl p-4 transition-all duration-200 focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? 'bg-slate-900/40 border-white/20 text-white placeholder-slate-400 focus:ring-purple-500/50'
                  : 'bg-white/30 border-white/30 text-slate-800 placeholder-slate-500 focus:ring-blue-500/50'
              }`}
              placeholder="Generated code will appear here..."
            />
          </div>
        </div>
      )}
    </div>
  )
}
