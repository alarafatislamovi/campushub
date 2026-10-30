import type { Metadata } from 'next';
import './globals.css';
import ClientProviders from '@/components/ClientProviders';

export const metadata: Metadata = {
  title: 'CampusHub - The Next-Gen Futuristic Smart School Ecosystem',
  description: '100-Years-Ahead Cyber-School OS with Glassmorphic UI, 1-Tap Attendance, Dual AI Engines, and Holographic Club Hubs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#E0F2F1] text-[#1E293B] min-h-screen antialiased selection:bg-teal-300 selection:text-teal-950 relative overflow-x-hidden">
        {/* Dynamic Luminous Ambient Wireframe Wave Accents (Light Sea Green #20B2AA Atmosphere) */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {/* Top-Right Light Sea Green & Sky Cyber Wave */}
          <div className="ambient-wave-top animate-pulse-slow" />
          
          {/* Bottom-Left Radiant Light Sea Green & Warm Sand Ribbon */}
          <div className="ambient-wave-bottom animate-pulse-slow" />

          {/* Center Light Sea Green Aura Diffusion Field */}
          <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vh] bg-[#20B2AA]/15 rounded-full blur-[140px] pointer-events-none" />

          {/* Organic 3D Vector Wave Lines Harmonized with Light Sea Green & Deep Teal */}
          <svg
            className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="waveGradSeagreen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#20b2aa" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#facc15" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="waveGradCyanTeal" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#004d40" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#20b2aa" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Top right wireframe wave bundle */}
            <path
              d="M 600,0 C 800,120 1000,80 1400,240 S 1800,400 2200,320"
              fill="none"
              stroke="url(#waveGradSeagreen)"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />
            <path
              d="M 650,0 C 850,140 1050,100 1450,260 S 1850,420 2250,340"
              fill="none"
              stroke="url(#waveGradSeagreen)"
              strokeWidth="0.8"
            />
            <path
              d="M 700,0 C 900,160 1100,120 1500,280 S 1900,440 2300,360"
              fill="none"
              stroke="url(#waveGradSeagreen)"
              strokeWidth="0.6"
            />

            {/* Bottom left flowing curve bundle */}
            <path
              d="M 0,800 C 400,600 600,900 1000,750 S 1400,950 1800,850"
              fill="none"
              stroke="url(#waveGradCyanTeal)"
              strokeWidth="1.2"
              strokeDasharray="6 3"
            />
            <path
              d="M 0,850 C 420,640 620,940 1020,790 S 1420,990 1820,890"
              fill="none"
              stroke="url(#waveGradCyanTeal)"
              strokeWidth="0.8"
            />
          </svg>

          {/* Micro cyber matrix points */}
          <div className="absolute inset-0 bg-cyber-grid opacity-20" />
        </div>

        <ClientProviders>
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
