// app/ai/layout.js

export default function AILayout({ children }) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="py-4">
          {children}
        </div>
      </div>
    )
  }