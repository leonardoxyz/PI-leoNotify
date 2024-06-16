import React from 'react'

const Loader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
            <div className="animate-spin rounded-full border-4 border-gray-300 border-t-transparent h-12 w-12" />
        </div>
    )
}

export default Loader