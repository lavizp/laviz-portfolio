import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';

export const Route = createFileRoute('/skills')({
  component: RouteComponent,
})
const skillCategories = [
  {
    id: 'frontend',
    title: "Frontend Architecture",
    subtitle: "Interface Engineering",
    icon: "❖",
    color: "from-indigo-500 to-purple-500",
    specs: [
      { name: "React / Next.js", level: 98, role: "Core Framework" },
      { name: "TypeScript", level: 95, role: "Type Safety" },
      { name: "Tailwind / CSS", level: 99, role: "Styling Engine" },
      { name: "Three.js / R3F", level: 85, role: "3D Rendering" },
      { name: "Framer Motion", level: 90, role: "Physics Animation" }
    ]
  },
  {
    id: 'backend',
    title: "Backend Infrastructure",
    subtitle: "System Architecture",
    icon: "⚡",
    color: "from-blue-500 to-cyan-500",
    specs: [
      { name: "Node.js / Bun", level: 92, role: "Runtime Env" },
      { name: "PostgreSQL", level: 88, role: "Primary DB" },
      { name: "GraphQL", level: 85, role: "Data Query" },
      { name: "Docker / K8s", level: 80, role: "Containerization" },
      { name: "Redis", level: 82, role: "Caching Layer" }
    ]
  },
  {
    id: 'design',
    title: "Digital Product Design",
    subtitle: "User Experience",
    icon: "✦",
    color: "from-rose-500 to-pink-500",
    specs: [
      { name: "Figma", level: 95, role: "Prototyping" },
      { name: "Design Systems", level: 90, role: "Component Libs" },
      { name: "UI Motion", level: 88, role: "Micro-Interactions" },
      { name: "Accessibility", level: 85, role: "WCAG Compliance" },
      { name: "Blender 3D", level: 70, role: "Asset Modeling" }
    ]
  }
];
function RouteComponent() {
  const [activeId, setActiveId] = useState<string>('frontend');
  return (
    <section className="min-h-screen bg-brand-dark py-32 px-4 sm:px-6 relative overflow-hidden flex flex-col justify-center">
          
          {/* Ambient Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none"></div>
    
          <div className="max-w-7xl mx-auto w-full relative z-10">
            
            {/* Header */}
            <div className="mb-16 md:mb-24 flex items-end justify-between border-b border-white/5 pb-8">
               <div>
                  <h2 className="text-5xl md:text-7xl font-serif text-white mb-2">Technical <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-slate-600">Core</span></h2>
                  <p className="font-mono text-xs text-slate-500 uppercase tracking-widest mt-4">
                     System Capabilities & Proficiency Metrics
                  </p>
               </div>
               <div className="hidden md:block text-right text-[10px] font-mono text-slate-600">
                  <p>DIAGNOSTIC_MODE: VISUAL</p>
                  <p>SECURE_SERVER: TRUE</p>
               </div>
            </div>
    
            {/* The Monoliths Container */}
            <div className="flex flex-col lg:flex-row h-[800px] lg:h-[600px] gap-4">
              {skillCategories.map((category) => {
                const isActive = activeId === category.id;
                
                return (
                  <div 
                    key={category.id}
                    onMouseEnter={() => setActiveId(category.id)}
                    className={`relative rounded-3xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] border border-white/5 backdrop-blur-sm group
                      ${isActive 
                        ? 'flex-3 bg-white/3 lg:flex-[2.5]' 
                        : 'flex-1 bg-white/1 hover:bg-white/2'
                      }
                    `}
                  >
                    {/* Internal Glow Gradient */}
                    <div className={`absolute inset-0 bg-linear-to-b ${category.color} opacity-0 transition-opacity duration-700 ${isActive ? 'opacity-5' : ''}`}></div>
    
                    {/* Vertical Text Label (Visible when collapsed on Desktop) */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                       <div className="lg:rotate-90whitespace-nowrap">
                          <h3 className="text-2xl font-serif text-slate-500 tracking-widest uppercase">{category.title}</h3>
                       </div>
                    </div>
    
                    {/* Expanded Content */}
                    <div className={`absolute inset-0 p-8 md:p-12 flex flex-col transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                       
                       {/* Card Header */}
                       <div className="flex justify-between items-start mb-12">
                          <div>
                            <div className={`w-12 h-12 rounded-2xl bg-linear-to-br ${category.color} flex items-center justify-center text-xl text-white shadow-lg mb-6`}>
                               {category.icon}
                            </div>
                            <h3 className="text-3xl md:text-4xl font-serif text-white leading-none mb-2">{category.title}</h3>
                            <p className="text-sm font-mono text-slate-400 uppercase tracking-wider">{category.subtitle}</p>
                          </div>
                          <div className="hidden sm:block text-[10px] font-mono text-slate-600">
                             ID: {category.id.toUpperCase()}_001
                          </div>
                       </div>
    
                       {/* Skill Specs Grid */}
                       <div className="flex-1 space-y-8">
                          {category.specs.map((spec) => (
                            <div key={spec.name} className="group/spec relative">
                               {/* Spec Header */}
                               <div className="flex justify-between items-end mb-2 relative z-10">
                                  <span className="text-lg font-sans text-slate-200 group-hover/spec:text-white transition-colors">{spec.name}</span>
                                  <span className="text-xs font-mono text-slate-500 group-hover/spec:text-brand-accent transition-colors">{spec.role}</span>
                               </div>
    
                               {/* Visual Bar */}
                               <div className="h-1 w-full bg-white/5 overflow-hidden relative">
                                  {/* Background Lines */}
                                  <div className="absolute inset-0 flex gap-1">
                                     {Array.from({ length: 40 }).map((_, i) => (
                                        <div key={i} className="flex-1 bg-black/20"></div>
                                     ))}
                                  </div>
                                  
                                  {/* Fill Progress */}
                                  <div 
                                    className={`h-full bg-linear-to-r ${category.color} relative`}
                                    style={{ width: `${spec.level}%` }}
                                  >
                                     <div className="absolute right-0 top-0 bottom-0 w-px bg-white/50 shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                                  </div>
                               </div>
                            </div>
                          ))}
                       </div>
    
                       {/* Footer Info */}
                       <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center text-xs font-mono text-slate-500">
                          <span>SYNCED: JUST NOW</span>
                          <span className="animate-pulse text-green-500">● ONLINE</span>
                       </div>
    
                    </div>
                  </div>
                );
              })}
            </div>
    
          </div>
        </section>
  )
}
