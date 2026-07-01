import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useTheme } from 'next-themes';
import { Moon, Sun, ArrowRight, Folder, Mail, User, Terminal } from 'lucide-react';
import { projects } from '@/data/projects';

interface CommandPaletteProps {
  onOpenProject?: (projectTitle: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onOpenProject }) => {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  // Toggle palette on CMD+K / CTRL+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    command();
    setOpen(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Browse trigger — tap on mobile, ⌘K hint on desktop */}
      <div 
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 bg-card hover:bg-secondary border border-border rounded-full py-2.5 px-3 sm:px-4 shadow-lg flex items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 text-xs text-muted-foreground select-none max-w-[calc(100vw-2rem)]"
        style={{ paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))' }}
      >
        <Terminal size={14} className="text-primary animate-pulse shrink-0" />
        <span className="sm:hidden font-medium text-foreground">Browse site</span>
        <span className="hidden sm:inline">Press</span>
        <kbd className="hidden sm:inline bg-muted px-1.5 py-0.5 rounded text-[10px] font-mono border border-border">⌘K</kbd>
        <span className="hidden sm:inline">to browse</span>
      </div>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Global Command Menu"
        container={document.body}
        className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-black/40 backdrop-blur-xs transition-opacity duration-300 landscape:items-start landscape:pt-2"
        overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-xs"
      >
        <div className="w-full max-w-xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden animate-scale-in max-h-[calc(100dvh-1.5rem)] flex flex-col landscape:max-h-[calc(100dvh-1rem)]">
          {/* Input field */}
          <div className="flex items-center gap-2 border-b border-border px-3 sm:px-4 py-3 shrink-0">
            <Command.Input
              placeholder="Search sections, projects..."
              className="w-full min-w-0 bg-transparent border-0 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-0"
              autoFocus
            />
            <button 
              onClick={() => setOpen(false)}
              className="shrink-0 text-[10px] font-mono bg-secondary text-muted-foreground border border-border px-1.5 py-0.5 rounded"
              aria-label="Close menu"
            >
              ESC
            </button>
          </div>

          <Command.List className="flex-1 min-h-0 max-h-[min(300px,55dvh)] sm:max-h-[300px] landscape:max-h-[min(220px,70dvh)] overflow-y-auto p-2 space-y-2 overscroll-contain">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              No matching commands or actions found.
            </Command.Empty>

            {/* Navigation links Group */}
            <Command.Group heading="Navigation" className="text-[10px] font-semibold text-muted-foreground px-2 py-1 uppercase tracking-wider">
              <Command.Item
                onSelect={() => runCommand(() => scrollToSection('about'))}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary cursor-pointer select-none transition-colors data-[selected=true]:bg-secondary"
              >
                <div className="flex items-center gap-3">
                  <User size={16} className="text-muted-foreground" />
                  <span>About Profile Section</span>
                </div>
                <ArrowRight size={14} className="text-muted-foreground" />
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(() => scrollToSection('projects'))}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary cursor-pointer select-none transition-colors data-[selected=true]:bg-secondary"
              >
                <div className="flex items-center gap-3">
                  <Folder size={16} className="text-muted-foreground" />
                  <span>Featured Software Projects</span>
                </div>
                <ArrowRight size={14} className="text-muted-foreground" />
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(() => scrollToSection('contact'))}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary cursor-pointer select-none transition-colors data-[selected=true]:bg-secondary"
              >
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-muted-foreground" />
                  <span>Get In Touch (Contact)</span>
                </div>
                <ArrowRight size={14} className="text-muted-foreground" />
              </Command.Item>
            </Command.Group>

            {/* Quick Actions Theme Toggle Group */}
            <Command.Group heading="Preferences & Styles" className="text-[10px] font-semibold text-muted-foreground px-2 py-1 uppercase tracking-wider mt-2 border-t border-border/40 pt-2">
              <Command.Item
                onSelect={() => runCommand(() => setTheme('light'))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary cursor-pointer select-none transition-colors data-[selected=true]:bg-secondary"
              >
                <Sun size={16} className="text-muted-foreground" />
                <span>Switch to Light Theme</span>
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(() => setTheme('dark'))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary cursor-pointer select-none transition-colors data-[selected=true]:bg-secondary"
              >
                <Moon size={16} className="text-muted-foreground" />
                <span>Switch to Dark Theme</span>
              </Command.Item>
            </Command.Group>

            {/* Showcase Quick Search Group */}
            <Command.Group heading="Featured Projects Catalog" className="text-[10px] font-semibold text-muted-foreground px-2 py-1 uppercase tracking-wider mt-2 border-t border-border/40 pt-2">
              {projects.map((project) => (
                <Command.Item
                  key={project.title}
                  value={project.title}
                  onSelect={() => runCommand(() => {
                    scrollToSection('projects');
                    if (onOpenProject) {
                      setTimeout(() => onOpenProject(project.title), 400);
                    }
                  })}
                  className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary cursor-pointer select-none transition-colors data-[selected=true]:bg-secondary"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Folder size={14} className="text-muted-foreground shrink-0" />
                    <span className="truncate">{project.title}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground shrink-0 hidden sm:inline">Open Preview</span>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </div>
      </Command.Dialog>
    </>
  );
};
