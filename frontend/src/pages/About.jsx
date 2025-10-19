export default function About() {
  return (
    <div className="min-h-screen bg-amber-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left column - Image */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src="./image_spirits.png"
              alt="GeoMemo Presentation"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Right column - Text content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">About GeoMemo</h2>
            <p className="text-gray-600">
              GeoMemo is a location-based note-taking app that allows users to
              create, store, and manage memos tied to specific geographic
              locations. Whether you're traveling, exploring new places, or
              simply want to remember something important about a location,
              GeoMemo has you covered.
            </p>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">Features</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>
                  Create memos with titles, descriptions, and optional images
                </li>
                <li>Tag memos with categories for easy organization</li>
                <li>View memos on an interactive map</li>
                <li>Edit and delete memos as needed</li>
                <li>Search and filter memos by title, category, or location</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">
                Technologies Used
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Frontend: React, Tailwind CSS</li>
                <li>Backend: Node.js, Express</li>
                <li>Database: MongoDB</li>
                <li>Mapping: Leaflet.js, OpenStreetMap</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
