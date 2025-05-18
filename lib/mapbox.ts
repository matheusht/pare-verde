// Mapbox configuration
export const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 
  "pk.eyJ1IjoibWF0aGV1c2h0IiwiYSI6ImNtMXdzZXk2azBxeDcybW9lcjNsNXJ3OHUifQ.-hEjgr1XHuAwVKUHwGTfcA" // Fallback for development

// Initialize Mapbox globally
export const initializeMapbox = () => {
  if (typeof window !== 'undefined') {
    // Only run on client side
    window.mapboxgl = window.mapboxgl || {};
    window.mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
  }
}
