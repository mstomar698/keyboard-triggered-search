import { useState, useEffect, useCallback } from 'react'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const openModal = useCallback(() => {
    setIsModalOpen(true)
    setSearchQuery('')
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setSearchQuery('')
  }, [])

  const handleSearch = (query: string) => {
    console.log('Search query:', query)
    closeModal()
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open modal when typing any letter while not focused on an input
      if (
        !isModalOpen &&
        !e.altKey &&
        !e.ctrlKey &&
        !e.metaKey &&
        e.key.length === 1 &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        openModal()
        setSearchQuery(e.key)
      }

      // Open modal with Alt + Q
      if (e.altKey && e.key.toLowerCase() === 'q') {
        e.preventDefault()
        openModal()
      }

      // Close modal with Escape
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, openModal, closeModal])

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Search Demo</h1>
      <p className="text-gray-600 mb-2">Press Alt + Q or start typing to open search</p>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Search</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  handleSearch(searchQuery)
                }
              }}
              placeholder="Type to search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => searchQuery.trim() && handleSearch(searchQuery)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                disabled={!searchQuery.trim()}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App