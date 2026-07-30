"use client";

import { useLanguage } from "@/context/LanguageContext";
import { TerminalChat } from "@/components/TerminalChat"; 
import { CV } from "@/data/cv";

export default function Home() {
  const { language, setLanguage } = useLanguage();
  
  // Cast language to access CV keys safely
  const currentCV = CV[language as keyof typeof CV];

  const links = [
    { name: "GitHub", url: "https://github.com/gutoberny" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/gustavo-berny/" },
    { name: "Email", url: "mailto:pelotas.berny93@gmail.com" },
  ];

  const projects = [
    {
       name: "Bunker Control",
       desc: {
         pt: "ERP Multi-tenant para Clubes de Tiro. Automação de despachante com IA e Gestão Financeira.",
         en: "Multi-tenant ERP for Shooting Clubs. AI Dispatcher Automation and Financial Management.",
         es: "ERP Multi-tenant para Clubes de Tiro. Automatización de despachante con IA y Gestión Financiera."
       },
       tech: "React, Node.js, Prisma, Docker",
       url: "https://bunkercontrol.com.br"
    },
    {
       name: "Bernyflow AI",
       desc: {
         pt: "Agência de Automação. Agentes autônomos para Vendas e Suporte (n8n, Evolution API, LLMs).",
         en: "Automation Agency. Autonomous agents for Sales and Support (n8n, Evolution API, LLMs).",
         es: "Agencia de Automatización. Agentes autónomos para Ventas y Soporte (n8n, Evolution API, LLMs)."
       },
       tech: "n8n, Typebot, Docker",
       url: "https://bernyflow.com.br"
    }
  ];

  return (
    <main className="container-custom py-16 md:py-24 flex flex-col gap-20 relative animate-in fade-in duration-700">
      
      {/* LANGUAGE SWITCHER */}
      <div className="absolute top-6 right-6 flex gap-3 text-sm text-neutral-400 font-mono">
         {['pt', 'en', 'es'].map((lang) => (
           <button 
             key={lang}
             onClick={() => setLanguage(lang as any)}
             className={`hover:text-black transition-colors ${language === lang ? 'text-black font-bold underline decoration-2 underline-offset-4' : ''}`}
           >
             {lang.toUpperCase()}
           </button>
         ))}
      </div>

      {/* HEADER */}
      <header className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black">
          gustavo_berny.dev
        </h1>
        <div className="max-w-2xl">
            <h2 className="text-xl md:text-2xl font-medium text-neutral-800 mb-4">
                {currentCV.role}
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
                {currentCV.about}
            </p>
        </div>
        
        <nav className="flex gap-6 text-sm font-mono pt-2">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.url} 
              target="_blank" 
              className="font-bold underline decoration-neutral-300 underline-offset-4 hover:decoration-black hover:bg-black hover:text-white transition-all px-1 -ml-1 rounded-sm"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </header>

      <hr className="border-neutral-200" />

      {/* PROJECTS */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-8 font-mono">
          # {language === 'pt' ? 'projetos_selecionados' : language === 'es' ? 'proyectos_seleccionados' : 'selected_projects'}
        </h2>
        
        <div className="grid gap-10">
           {projects.map((project) => (
             <div key={project.name} className="group relative">
               <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                 <h3 className="font-bold text-xl text-black">
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:underline decoration-2 underline-offset-4">
                       {project.name}
                    </a>
                 </h3>
                 <span className="text-xs font-mono text-neutral-500 bg-neutral-100 px-2 py-1 rounded border border-neutral-200 mt-2 md:mt-0 w-fit">
                    {project.tech}
                 </span>
               </div>
               <p className="text-neutral-600 text-base leading-relaxed max-w-2xl">
                 {(project.desc as any)[language]}
               </p>
             </div>
           ))}
        </div>
      </section>
      
      <hr className="border-neutral-200" />

      {/* EXPERIENCE */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-8 font-mono">
          # {language === 'pt' ? 'experiencia_profissional' : language === 'es' ? 'experiencia_laboral' : 'work_experience'}
        </h2>
        <div className="space-y-12">
            {currentCV.experience.map((exp, i) => (
                <div key={i} className="grid md:grid-cols-[150px_1fr] gap-4 md:gap-8">
                    <span className="text-sm font-mono text-neutral-500 pt-1">
                        {exp.date}
                    </span>
                    <div>
                        <h3 className="font-bold text-lg text-black mb-1">
                            {exp.role}
                        </h3>
                        <div className="text-sm font-medium text-neutral-800 mb-2">
                            {exp.company}
                        </div>
                        <p className="text-neutral-600 leading-relaxed text-sm max-w-xl">
                            {exp.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
      </section>
      
      <hr className="border-neutral-200" />

      {/* STACK (Optional visual addition) */}
      <section>
         <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-8 font-mono">
          # tech_stack
        </h2>
        <div className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-sm text-neutral-700">
            {currentCV.skills.map(skill => (
                <span key={skill} className="hover:text-black hover:bg-neutral-100 px-2 -ml-2 rounded cursor-default transition-colors">
                    {skill}
                </span>
            ))}
        </div>
      </section>

      <hr className="border-neutral-200" />

      {/* EDUCATION */}
      <section className="pb-20">
        <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-8 font-mono">
          # {language === 'pt' ? 'formacao' : language === 'es' ? 'formacion' : 'education'}
        </h2>
        <div className="space-y-6">
            {currentCV.education.map((edu, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 max-w-2xl">
                    <div>
                        <h3 className="font-bold text-base text-black">
                            {edu.course}
                        </h3>
                        <div className="text-sm text-neutral-600">
                            {edu.institution}
                        </div>
                    </div>
                    <span className="text-xs font-mono text-neutral-500 bg-neutral-100 px-2 py-1 rounded border border-neutral-200 w-fit">
                        {edu.status}
                    </span>
                </div>
            ))}
        </div>
      </section>

      {/* TERMINAL CHAT */}
      <TerminalChat />
      
    </main>
  );
}
