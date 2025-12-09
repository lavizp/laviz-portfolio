import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6 bg-brand-dark relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 relative z-10">
        
        {/* Left Column: Visuals (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="relative mb-12 group">
             {/* Profile Visual Replacement - The "Digital Core" */}
             <div className="relative h-[500px] w-full rounded-none overflow-hidden border border-white/10 bg-brand-dark flex items-center justify-center group/visual">
                
                {/* Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[20px_20px"></div>
                
                {/* Vignette */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80"></div>

                {/* Abstract Geometric Composition */}
                <div className="relative z-10 w-64 h-64">
                    {/* Rotating Outer Ring */}
                    <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_10s_linear_infinite]"></div>
                    <div className="absolute inset-0 border-t border-b border-white/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                    
                    {/* Counter-Rotating Square Frame */}
                    <div className="absolute inset-12 border border-brand-accent/20 rotate-45 animate-[spin_20s_linear_infinite_reverse] transition-all duration-700 group-hover/visual:border-brand-accent/50 group-hover/visual:scale-110"></div>
                    
                    {/* Inner Circle with Orbiting Dot */}
                    <div className="absolute inset-20 border border-white/10 rounded-full animate-[spin_3s_linear_infinite]">
                         <div className="w-1.5 h-1.5 bg-brand-accent rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[3px] shadow-[0_0_10px_currentColor]"></div>
                    </div>

                    {/* Static Core Frame */}
                    <div className="absolute inset-[40%] border border-white/30 rotate-45 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <div className="w-1 h-1 bg-white rounded-full animate-pulse shadow-[0_0_15px_rgba(255,255,255,1)]"></div>
                    </div>
                </div>
                
                {/* Scanning Line */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-brand-accent/5 to-transparent h-[10%] w-full animate-[scan_4s_ease-in-out_infinite] pointer-events-none opacity-50"></div>

                {/* Overlay Text */}
                <div className="absolute bottom-6 left-6 z-20">
                   <p className="font-mono text-xs text-white bg-black/50 backdrop-blur-md px-2 py-1 inline-block mb-2 border-l-2 border-brand-accent">
                      LAVIZ PANDEY
                   </p>
                   <p className="font-mono text-[10px] text-slate-300 tracking-widest uppercase pl-1">
                      System Identity: Architect
                   </p>
                </div>

                {/* Custom Keyframe for scan line since not in tailwind config explicitly for this specific motion */}
                <style>{`
                    @keyframes scan {
                        0%, 100% { top: -10%; }
                        50% { top: 110%; }
                    }
                `}</style>
             </div>
             
             {/* Decorative Offset Border */}
             <div className="absolute -bottom-4 -right-4 w-full h-full border border-white/5 -z-10 group-hover:-bottom-6 group-hover:-right-6 transition-all duration-500"></div>
          </div>

          <div className="flex justify-between items-end border-t border-white/10 pt-6">
             <div>
                <span className="block text-4xl font-serif text-white mb-1">05+</span>
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Years Experience</span>
             </div>
             <div className="text-right">
                <span className="block text-4xl font-serif text-white mb-1">20+</span>
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Projects Shipped</span>
             </div>
          </div>
        </div>

        {/* Right Column: Narrative (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-12 lg:pl-12">
           
           <div>
              <h1 className="text-6xl md:text-7xl font-serif text-white mb-8 leading-[0.9]">
                The Architect <br/>
                <span className="text-slate-600 italic">Behind the Code</span>
              </h1>
              
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-xl leading-relaxed text-slate-300 font-light">
                   I am a developer who believes that code is more than just instructions for a machine—it's a medium for communication. 
                   With a background rooted in both rigorous engineering and creative design, I bridge the gap between 
                   <span className="text-white font-normal mx-1">functional complexity</span> and 
                   <span className="text-white font-normal mx-1">visual simplicity</span>.
                </p>
                <p className="text-slate-400 mt-6 leading-relaxed">
                   My journey began with a curiosity for how things work under the hood, leading me to master the full spectrum of web development. 
                   From architecting scalable backends to crafting pixel-perfect interfaces, I approach every project with a craftsman's attention to detail.
                </p>
              </div>
           </div>

           {/* Philosophy Grid */}
           <div>
              <h3 className="font-mono text-xs text-brand-accent uppercase tracking-widest mb-6">Development Philosophy</h3>
              <div className="grid md:grid-cols-2 gap-6">
                 
                 <div className="group p-6 border border-white/5 bg-white/2 hover:bg-white/4 transition-colors">
                    <div className="w-8 h-8 mb-4 text-slate-300 group-hover:text-white transition-colors">
                       <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                    </div>
                    <h4 className="text-xl font-serif text-white mb-2">Scientific Rigor</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                       I treat software engineering as a science. Every line of code is tested, optimized, and justified.
                    </p>
                 </div>

                 <div className="group p-6 border border-white/5 bg-white/2 hover:bg-white/4 transition-colors">
                    <div className="w-8 h-8 mb-4 text-slate-300 group-hover:text-white transition-colors">
                       <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
                    </div>
                    <h4 className="text-xl font-serif text-white mb-2">User Centricity</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                       Technology is meaningless if it doesn't solve real problems. I build for humans, not just browsers.
                    </p>
                 </div>

              </div>
           </div>

           {/* Signature */}
           <div className="pt-8 border-t border-white/5">
              <p className="font-serif text-3xl text-slate-500 italic">Laviz Pandey</p>
           </div>

        </div>

      </div>
    </section>
  )
}
