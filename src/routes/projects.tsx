import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects')({
  component: RouteComponent,
})
interface ProjectDetailed {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  role: string;
  tags: string[];
  imageUrl: string;
  repoUrl: string;
  liveUrl: string;
  color: string;
}

const projects: ProjectDetailed[] = [
  {
    id: 1,
    title: "Gyanarthi",
    subtitle: "RAG Based Project",
    description: "An AI research assistant that helps users with their research needs.",
    role: "Full Stack Engineer",
    tags: ["React", "Fast API", "RAG", "TypeScript"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    repoUrl: "https://github.com/lavizp/gyanarthi-fe",
    liveUrl: "#",
    color: "bg-indigo-500"
  },
  {
    id: 2,
    title: "SNWA",
    subtitle: "Real Estate Agency",
    description: "A web app for a real estate agency based in Australia to handle CMS and property listings.",
    role: "Front End Engineer",
    tags: ["Node.js", "React JS", "Socket.io", "Typescript"],
    imageUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2670&auto=format&fit=crop",
    repoUrl: "#",
    liveUrl: "https://snwa.com.au/",
    color: "bg-emerald-500"
  },
  {
    id: 3,
    title: "Beatzbazar",
    subtitle: "Beats Buy and Sell Store",
    description: "A music store that allows users to browse and purchase music.",
    role: "Front End Engineer",
    tags: ["Next JS", "Typescript", "Socket.io", "Redux"],
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop",
    repoUrl: "#",
    liveUrl: "https://beatzbazar.com/",
    color: "bg-amber-500"
  }
];
const ProjectCard: React.FC<{ project: ProjectDetailed; index: number }> = ({ project, index }) => {
  // We use a CSS sticky position.
  // The 'top' value increases for each card so they stack with a visible header overlap.
  const stickyTop = 120 + (index * 60);

  return (
    <div 
      className="sticky w-full mb-12"
      style={{ 
        top: `${stickyTop}px`, 
        zIndex: index + 1 
      }}
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0f0f0f] shadow-2xl group transition-transform duration-500 hover:-translate-y-2">
        
        <div className="flex flex-col lg:flex-row h-auto lg:h-[550px]">
          
          {/* Content */}
          <div className="flex-1 p-8 md:p-12 flex flex-col justify-between relative z-10">
            {/* Subtle Gradient Background for text area */}
            <div className="absolute inset-0 bg-linear-to-br from-white/2 to-transparent pointer-events-none"></div>

            <div className="space-y-8">
               {/* Metadata */}
               <div className="flex items-center gap-3">
                 <div className={`w-2 h-2 rounded-full ${project.color} shadow-[0_0_8px_currentColor]`}></div>
                 <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">{project.role}</span>
                 <span className="h-px w-8 bg-white/10"></span>
                 <span className="font-mono text-xs text-slate-600">0{index + 1}</span>
               </div>

               {/* Title & Desc */}
               <div>
                  <h3 className="text-4xl md:text-5xl font-serif text-white mb-3 tracking-tight">{project.title}</h3>
                  <p className="text-lg text-slate-400 font-sans">{project.subtitle}</p>
               </div>

               <p className="text-slate-400 leading-relaxed max-w-lg border-l-2 border-white/5 pl-4">
                  {project.description}
               </p>
            </div>

            {/* Tags & Actions */}
            <div className="space-y-8 pt-8">
               <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs font-mono text-slate-400 transition-colors hover:bg-white/10 hover:text-white cursor-default">
                      {tag}
                    </span>
                  ))}
               </div>

               <div className="flex items-center gap-6 pt-6 border-t border-white/5">
                  <a href={project.liveUrl} className="flex items-center gap-2 text-white font-bold hover:text-brand-accent transition-colors">
                     <span>View Deployment</span>
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </a>
                  <a href={project.repoUrl} className="text-sm font-mono text-slate-500 hover:text-white transition-colors flex items-center gap-2">
                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                     Source
                  </a>
               </div>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 relative overflow-hidden">
             <div className="absolute inset-0 bg-brand-dark/10 z-10 transition-colors duration-500 group-hover:bg-transparent"></div>
             <img 
               src={project.imageUrl} 
               alt={project.title} 
               className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
             />
          </div>

        </div>
      </div>
    </div>
  );
};
function RouteComponent() {
  return (
    <section className="bg-brand-dark relative z-0 py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-24 flex items-end justify-between border-b border-white/5 pb-8">
           <div className="max-w-2xl">
              <h2 className="text-6xl md:text-8xl font-serif text-white mb-6">
                 Selected <span className="text-slate-700 italic">Work</span>
              </h2>
              <p className="font-mono text-sm text-slate-500 leading-relaxed border-l-2 border-brand-accent pl-4">
                 DIGITAL ARCHIVE // 2023-2024<br/>
                 SCROLL TO INSPECT
              </p>
           </div>
        </div>

        {/* Stack Container */}
        <div className="flex flex-col pb-24">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
            />
          ))}
        </div>

      </div>
    </section>
  )
}
