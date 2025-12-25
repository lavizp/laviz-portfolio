import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';

export const Route = createFileRoute('/contact')({
  component: RouteComponent,
})

function RouteComponent() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const socials = [
    { platform: "GitHub", url: "https://github.com/lavizp", handle: "github.com/laviz-pandey" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/laviz-pandey-4b8b55208/", handle: "linkedin.com/in/laviz" },
  ];
  return (
    <section className="min-h-screen pt-32 pb-20 px-4 sm:px-6 bg-brand-dark flex flex-col items-center justify-center relative overflow-hidden">
       {/* Background noise/elements */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
       
       {/* Subtle grid pattern */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:40px_40px] opacity-20 pointer-events-none"></div>

       <div className="w-full max-w-4xl relative z-10">
          <div className="mb-8 text-center">
             <h2 className="text-4xl md:text-5xl font-serif text-white mb-3">Connect<span className="text-slate-600 italic">.json</span></h2>
             <p className="text-slate-500 font-mono text-xs tracking-widest uppercase">Public API Endpoint</p>
          </div>

          {/* Browser/Postman Window UI */}
          <div className="rounded-xl overflow-hidden bg-[#0d1117] border border-white/10 shadow-2xl shadow-black/50 ring-1 ring-white/5 backdrop-blur-sm">
             
             {/* Toolbar */}
             <div className="flex flex-col sm:flex-row sm:items-center gap-4 px-4 py-3 border-b border-white/5 bg-[#161b22]">
                <div className="flex gap-2 shrink-0">
                   <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                
                <div className="flex-1 bg-[#0d1117] border border-white/10 rounded px-3 py-1.5 flex items-center gap-3 text-xs font-mono overflow-x-auto scrollbar-hide">
                   <span className="text-brand-secondary font-bold">GET</span>
                   <span className="text-slate-500 whitespace-nowrap">https://api.lavizpandey.com.np/v1/contact</span>
                </div>

                <div className="hidden sm:block px-3 py-1 bg-green-500/10 border border-green-500/20 rounded text-[10px] font-mono text-green-400 uppercase tracking-wider shrink-0">
                   Status: 200 OK
                </div>
             </div>

             {/* Code Area */}
             <div className="p-6 md:p-8 overflow-x-auto custom-scrollbar">
                <div className="font-mono text-sm md:text-base leading-relaxed whitespace-pre font-medium">
                   
                   <span className="text-slate-500">{"{"}</span>
                   <br />
                   
                   <div className="pl-4 md:pl-8 group">
                      <span className="text-purple-400">"timestamp"</span>: <span className="text-green-400">"{new Date().toISOString()}"</span><span className="text-slate-500">,</span>
                   </div>

                   <div className="pl-4 md:pl-8 group">
                      <span className="text-purple-400">"message"</span>: <span className="text-green-400">"Let's build something extraordinary together."</span><span className="text-slate-500">,</span>
                   </div>

                   <div className="pl-4 md:pl-8 mt-2">
                      <span className="text-purple-400">"contact_info"</span>: <span className="text-slate-500">{"{"}</span>
                   </div>

                   {/* Email Line */}
                   <div className="pl-8 md:pl-16 flex items-center gap-2 flex-wrap py-1">
                      <span className="text-purple-400">"email"</span>: 
                      <div className="relative group/tooltip inline-block">
                          <button 
                            onClick={() => handleCopy('laviz.dev@example.com', 'email')}
                            className="text-orange-300 hover:text-orange-200 hover:underline transition-colors decoration-dashed underline-offset-4"
                          >
                            "pandeylaviz@gmail.com"
                          </button>
                          
                          {/* Tooltip */}
                          <div className={`absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded pointer-events-none transition-opacity duration-200 ${copied === 'email' ? 'opacity-100' : 'opacity-0'}`}>
                             Copied!
                          </div>
                      </div>
                      <span className="text-slate-500">,</span>
                   </div>

                   <div className="pl-8 md:pl-16 py-1">
                      <span className="text-purple-400">"location"</span>: <span className="text-green-400">"Remote / Worldwide"</span>
                   </div>

                   <div className="pl-4 md:pl-8">
                      <span className="text-slate-500">{"},"}</span>
                   </div>

                   <div className="pl-4 md:pl-8 mt-2">
                      <span className="text-purple-400">"social_links"</span>: <span className="text-slate-500">{"["}</span>
                   </div>

                   {socials.map((social, index) => (
                      <div key={social.platform} className="pl-8 md:pl-16 py-0.5 hover:bg-white/[0.02] transition-colors rounded">
                         <span className="text-slate-500">{"{"}</span> <span className="text-purple-400">"platform"</span>: <span className="text-green-400">"{social.platform}"</span>, <span className="text-purple-400">"url"</span>: <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline">"{social.handle}"</a> <span className="text-slate-500">{"}"}{index < socials.length - 1 ? ',' : ''}</span>
                      </div>
                   ))}

                   <div className="pl-4 md:pl-8">
                      <span className="text-slate-500">{"]"}</span>
                   </div>

                   <span className="text-slate-500">{"}"}</span>
                
                </div>
                
                {/* Blinking Cursor at end */}
                <div className="mt-6 border-t border-white/5 pt-4 flex gap-2 items-center">
                   <span className="text-slate-600 font-mono text-xs uppercase">Server Status: Stable</span>
                   <div className="w-1.5 h-3 bg-brand-accent animate-pulse"></div>
                </div>
             </div>

          </div>
       </div>
    </section>
  )
}
