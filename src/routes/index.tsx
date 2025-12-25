import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
export const Route = createFileRoute('/')({
  component: RouteComponent,
});
const TypewriterCode: React.FC<{ codeLines: string[] }> = ({ codeLines }) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= codeLines.length) return;

    const line = codeLines[currentLineIndex];
    if (currentCharIndex < line.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          if (newLines[currentLineIndex] === undefined) newLines[currentLineIndex] = "";
          newLines[currentLineIndex] += line[currentCharIndex];
          return newLines;
        });
        setCurrentCharIndex(prev => prev + 1);
      }, 15 + Math.random() * 20); // Slightly faster typing
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex, codeLines]);

  // Syntax Highlighting for the Minimal aesthetic
  const colorize = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\s+|[(){}[\].,;=<>/])/g);
    return parts.map((part, i) => {
      if (part.match(/^(import|from|export|class|extends|implements|constructor|super|this|const|return|new|async|await|function|default)$/)) 
        return <span key={i} className="text-[#c084fc]">{part}</span>;
      if (part.match(/^[A-Z][a-zA-Z0-9]*$/)) 
        return <span key={i} className="text-[#60a5fa]">{part}</span>;
      if (part.match(/^[a-z]+$/) && (parts[i-1] === '<' || parts[i+1] === '>'))
         return <span key={i} className="text-[#f472b6]">{part}</span>;
      if (part.match(/^['"`].*['"`]$/)) 
        return <span key={i} className="text-[#4ade80]">{part}</span>;
      return <span key={i} className="text-slate-300">{part}</span>;
    });
  };

  return (
    <div className="font-mono text-xs sm:text-[13px] leading-6 tracking-wide">
      {displayedLines.map((line, idx) => (
        <div key={idx} className="flex">
          <span className="w-8 text-slate-700 text-right mr-4 select-none text-[10px] pt-0.5">{idx + 1}</span>
          <div className="whitespace-pre flex-1">{colorize(line)}</div>
        </div>
      ))}
    </div>
  );
};
function RouteComponent() {
  const codeSnippet = [
    "import React from 'react';",
    "import { Canvas } from '@react-three/fiber';",
    "import { Hero, Experience } from './components';",
    "",
    "const Portfolio = () => {",
    "  return (",
    "    <div className='immersive-universe'>",
    "      <Hero",
    "        name='Laviz Pandey'",
    "        role='Creative Developer'",
    "        passion='Limitless'",
    "      />",
    "      <Canvas>",
    "        <AmbientLight intensity={0.5} />",
    "        <Stars fade />",
    "        <Experience mode='3D' />",
    "      </Canvas>",
    "    </div>",
    "  );",
    "};",
    "",
    "export default Portfolio;"
  ];
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden page-enter pt-20 pb-12">
         
         {/* Abstract Minimal Background Elements */}
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
   
         <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
           
           {/* Left: Minimal Editorial Design */}
           <div className="flex flex-col justify-center">
               
               <div className="mb-4 flex items-center gap-4">
                   <div className="h-px w-12 bg-indigo-500"></div>
                   <span className="text-indigo-400 font-sans tracking-[0.2em] text-xs uppercase font-medium">Full Stack Developer</span>
               </div>
   
               <div className="relative mb-8">
                   {/* Elegant Typography Mix */}
                   <h1 className="text-white text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-none mb-2 font-serif font-normal tracking-tight">
                       Laviz
                   </h1>
                   <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-none font-sans font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-white to-slate-500">
                       Pandey
                   </h1>
                   
                   {/* Subtle decorative dot */}
                   <div className="absolute -right-4 top-4 w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></div>
               </div>
   
               <p className="text-slate-400 text-lg md:text-xl font-sans font-light leading-relaxed max-w-md mb-10 border-l border-slate-800 pl-6">
                   Orchestrating pixels and logic. I craft robust digital applications with a focus on <span className="text-white font-normal">minimalist aesthetics</span> and <span className="text-white font-normal">seamless performance</span>.
               </p>
   
               <div className="flex flex-wrap gap-8 items-center">
                   <Link 
                     to="/projects" 
                     className="group relative inline-flex items-center gap-3 text-white font-sans font-medium text-lg"
                   >
                      <span className="relative z-10 border-b border-indigo-500 pb-1 group-hover:border-white transition-colors">
                        View Selected Works
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                   </Link>
   
                   <Link 
                     to="/contact" 
                     className="text-slate-500 hover:text-white transition-colors font-sans text-sm tracking-widest uppercase"
                   >
                       Get in touch
                   </Link>
               </div>
           </div>
   
           {/* Right: Clean, Minimal Code Editor */}
           <div>
             <div className="relative group">
               {/* Soft Shadow behind */}
               <div className="absolute -inset-4 bg-linear-to-tr from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition duration-700"></div>
   
               {/* Editor Container - Minimalist */}
               <div className="relative bg-[#0a0a0a] rounded-lg border border-white/5 shadow-2xl overflow-hidden">
                  
                  {/* Minimal Header */}
                  <div className="h-12 border-b border-white/5 flex items-center px-6 justify-between bg-[#0a0a0a]">
                     <div className="flex items-center gap-2 opacity-50">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                     </div>
                     <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                        Portfolio.tsx
                     </div>
                     <div className="w-8"></div> 
                  </div>
   
                  {/* Code Content */}
                  <div className="p-8 bg-[#0a0a0a] min-h-[380px]">
                     <TypewriterCode codeLines={codeSnippet} />
                  </div>
               </div>
             </div>
           </div>
   
         </div>
       </section>
  );
}
