
import { motion } from "framer-motion";

const experiences = [
  {
    role: "Software Developer Intern",
    company: "BlockStash Intelligence, IIT Kanpur",
    period: "June 2024 - July 2024",
    description: "Developed a system for website status monitoring, created a React-based UI, automated data retrieval using Python, and compiled website statuses into structured reports.",
    technologies: ["React", "Python", "MongoDB"],
  },
  {
    role: "Web Developer Intern",
    company: "Superhouse Group Ltd., Unnao Kanpur",
    period: "July 2024 - Aug 2024",
    description: "Optimized website performance, improved UI, conducted SEO optimization, implemented keyword strategies, and collaborated with a team.",
    technologies: ["HTML", "CSS", "JavaScript", "SEO"],
  },
  {
    role: "Python Developer",
    company: "Infosys Springboard",
    period: "December 2024 - February 2025",
    description: "Developed a website using Python, Flask, SQL Alchemy, and React, working on key modules such as Authentication, Stock Management, and Order Management.",
    technologies: ["Python", "Flask", "SQL Alchemy", "React"],
  }  
];


const WorkExperienceSection = () => {
  return (
    <section id="experience" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{exp.role}</h3>
                  <p className="text-muted-foreground">{exp.company}</p>
                </div>
                <span className="text-sm text-muted-foreground mt-2 md:mt-0">{exp.period}</span>
              </div>
              <p className="text-foreground mb-4">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperienceSection;
