import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import profileImage from '@/assets/profile.jpg';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const skillCategories = [
    {
      category: 'Frontend',
      skills: ['React', 'HTML & CSS', 'Tailwind CSS'],
      rating: 95,
    },
    {
      category: 'Backend',
      skills: ['Node.js'],
      rating: 80,
    },
    {
      category: 'Languages',
      skills: ['TypeScript', 'JavaScript'],
      rating: 90,
    },
    {
      category: 'Database',
      skills: ['MongoDB'],
      rating: 75,
    },
    {
      category: 'Tools',
      skills: ['Git & GitHub'],
      rating: 85,
    },
  ];

  // Flatten skills for simple grid rendering
  const allSkills = skillCategories.flatMap((cat) =>
    cat.skills.map((skill) => ({ name: skill, category: cat.category }))
  );

  const handleRadarClick = (data: any) => {
    if (data && data.activeLabel) {
      const clickedCategory = data.activeLabel;
      setSelectedCategory((prev) => (prev === clickedCategory ? null : clickedCategory));
    }
  };

  const chartData = skillCategories.map((cat) => ({
    subject: cat.category,
    value: cat.rating,
  }));

  return (
    <section id="about" ref={ref} className="py-20 bg-secondary transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </motion.div>

        {/* Row 1: Profile & Bio */}
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-20">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-lg overflow-hidden border-2 border-border">
                <img
                  src={profileImage}
                  alt="Lan - Web Developer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg -z-10 blur-xl" />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              I'm a passionate web developer with a keen eye for design and a love for creating
              seamless user experiences. With expertise in modern web technologies, I transform
              ideas into elegant, functional digital solutions.
            </p>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to
              open-source projects, or sharing knowledge with the developer community.
            </p>
          </motion.div>
        </div>

        {/* Row 2: Skills & Interactive Radar */}
        <div className="max-w-6xl mx-auto border-t border-border pt-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Radar Chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-card/40 backdrop-blur-sm border border-border rounded-xl p-6 h-[360px] flex flex-col justify-center items-center relative overflow-hidden"
            >
              <h4 className="text-lg font-semibold text-foreground mb-4">Core Skill Index</h4>
              <div className="w-full h-full flex justify-center items-center">
                <ResponsiveContainer width="100%" height={260}>
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData} onClick={handleRadarClick}>
                    <PolarGrid stroke="var(--border)" strokeWidth={1} />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 13, fontWeight: 500 }}
                      style={{ cursor: 'pointer' }}
                    />
                    <Radar
                      name="Lan"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.15}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <span className="text-xs text-muted-foreground mt-2 text-center select-none">
                💡 Click a node on the radar chart to filter corresponding skills
              </span>
            </motion.div>

            {/* Skills & Technologies Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-foreground">Skills & Technologies</h3>
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-xs font-semibold text-primary/80 hover:text-primary transition-colors underline"
                  >
                    Clear Filter
                  </button>
                )}
              </div>

              {/* Category Quick Filter Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {skillCategories.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => setSelectedCategory(prev => prev === cat.category ? null : cat.category)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 border ${
                      selectedCategory === cat.category
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-card text-muted-foreground border-border hover:border-primary'
                    }`}
                  >
                    {cat.category}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {allSkills.map((skill, index) => {
                  const isHighlighted = selectedCategory === null || selectedCategory === skill.category;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 15 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
                      className={`bg-card border rounded-lg px-4 py-3 text-foreground transition-all duration-300 ${
                        isHighlighted 
                          ? 'border-border opacity-100 hover:border-primary shadow-sm' 
                          : 'border-border/30 opacity-30 scale-95 pointer-events-none'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{skill.name}</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{skill.category}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
