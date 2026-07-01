import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

import ecommerceImg from '@/assets/ecommerce.png';
import i4cImg from '@/assets/i4cIMG.png';
import inventoryImg from '@/assets/inventoryIMG.png';
import gymIMG from '@/assets/gymIMG.png';

interface ProjectsProps {
  activeProjectTitle?: string | null;
  setActiveProjectTitle?: (title: string | null) => void;
}

const Projects: React.FC<ProjectsProps> = ({ activeProjectTitle, setActiveProjectTitle }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState<'All' | 'Full Stack' | 'Frontend'>('All');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const projects = [
    {
      title: 'i4C Construction Website',
      category: 'Full Stack',
      description: 'A full-stack construction website with admin dashboard.',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: 'https://github.com/itsmeLan/i4c-website',
      demo: 'https://i4c-website-frontend.vercel.app',
      image: i4cImg,
      details: 'This application utilizes complex transaction management, persistent user shopping cart state caching, secure checkout through Stripe API integrations, and robust password hashing with JWT auth systems.'
    },
    {
      title: 'Inventory and Order Management System',
      category: 'Full Stack',
      description: 'This is a personal project that i built for a famous local clothing brand in cebu called Underground Apparel.',
      tags: ['React', 'Tailwind CSS',  'MongoDB',  'Javascript'],
      github: 'https://github.com/itsmeLan/UA-Project',
      demo: 'https://ua-project-opal.vercel.app',
      image: inventoryImg,
      details: 'Features structural state binding via reactive Firestore document listeners, drag-and-drop workflow updates, sub-task breakdowns, interactive user roles, and team activity audit logs.'
    },
    {
      title: 'Rise Fitness Hub Cebu',
      category: 'Full Stack',
<<<<<<< HEAD
      description: 'Custom content management system for creative professionals to showcase their work.',
      tags: ['Next.js', 'TypeScript', 'Prisma'],
      github: 'https://github.com/itsmeLan/Rise-Fitness-Website',
      demo: 'https://rise-fitness-website.vercel.app',
      image: gymIMG,
=======
      description: 'Fitness gym website with a realtime Dashboard',
      tags: ['Firebase', 'TypeScript', 'React', 'Tailwind CSS'],
      github: 'https://github.com/itsmeLan/Rise-Fitness-Website',
      demo: 'https://rise-fitness-website.vercel.app',
      image: cmsImg,
>>>>>>> 58f019ef2ef855ccb54a7c402bc2d3d1c6b3b423
      details: 'Equipped with a modern Rich Text Editor rendering raw markdown output, automatic layout optimization engines, customizable database schema migrations, and optimized content delivery delivery pipelines.'
    },
    
  ];

  useEffect(() => {
    if (activeProjectTitle) {
      const match = projects.find((p) => p.title === activeProjectTitle);
      if (match) {
        setSelectedProject(match);
      }
      if (setActiveProjectTitle) {
        setActiveProjectTitle(null);
      }
    }
  }, [activeProjectTitle, setActiveProjectTitle]);

  const filteredProjects = projects.filter(
    (project) => activeFilter === 'All' || project.category === activeFilter
  );

  const filters = ['All', 'Full Stack', 'Frontend'] as const;

  return (
    <section id="projects" ref={ref} className="py-20 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </motion.div>

        {/* Dynamic sliding category filter tab selector */}
        <div className="flex justify-center gap-4 mb-16">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium relative transition-colors duration-300 ${
                activeFilter === filter ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {activeFilter === filter && (
                <motion.span
                  layoutId="activeFilterTab"
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              {filter}
            </button>
          ))}
        </div>

        {/* Project grid layouts */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Visual mockup graphics assets containers */}
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold bg-primary/90 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      Read Project Specs
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                    <span className="text-[10px] bg-secondary border border-border px-2 py-0.5 rounded-full text-muted-foreground">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>

                  {/* Badges tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[10px] text-muted-foreground px-2 py-0.5">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Premium spec/preview lightbox Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        {selectedProject && (
          <DialogContent className="max-w-2xl bg-card border-border sm:rounded-xl">
            <DialogHeader>
              <div className="flex justify-between items-center border-b border-border pb-3">
                <DialogTitle className="text-2xl font-bold">{selectedProject.title}</DialogTitle>
                <span className="text-xs bg-secondary border border-border px-3 py-1 rounded-full text-foreground">
                  {selectedProject.category}
                </span>
              </div>
              <DialogDescription className="text-muted-foreground mt-4 text-base leading-relaxed">
                {selectedProject.description}
              </DialogDescription>
            </DialogHeader>

            {/* Large screenshot preview */}
            <div className="w-full h-64 rounded-lg overflow-hidden border border-border mt-4">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Spec breakdown details */}
            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Detailed Overview</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedProject.details}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Key Tech Stack & Frameworks</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs bg-secondary text-foreground border border-border px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct buttons */}
            <div className="flex gap-4 mt-8 border-t border-border pt-4">
              <Button
                variant="outline"
                className="flex-1 border-border hover:border-primary hover:bg-transparent"
                asChild
              >
                <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                  <Github size={16} className="mr-2" />
                  Source Code
                </a>
              </Button>
              <Button
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                asChild
              >
                <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} className="mr-2" />
                  Live Preview
                </a>
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
};

export default Projects;
