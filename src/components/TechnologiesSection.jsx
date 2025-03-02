import { motion } from "framer-motion";
import { FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaJsSquare, FaBootstrap, FaGitAlt, FaGithub, FaJava } from "react-icons/fa"; // Font Awesome icons
import { DiPython, DiMongodb } from "react-icons/di";
import { GiDatabase } from "react-icons/gi";
import { PiFileCpp } from "react-icons/pi";
import { SiMui,SiExpress, SiFlask, SiJupyter, SiLibrarything } from "react-icons/si";
import { TbSettingsSearch } from "react-icons/tb";

const technologies = [
  {
    category: "Frontend",
    skills: [
      { name: "React", icon: <FaReact /> },
      { name: "HTML", icon: <FaHtml5 /> },
      { name: "CSS", icon: <FaCss3Alt /> },
      { name: "JavaScript", icon: <FaJsSquare /> },
      { name: "Bootstrap", icon: <FaBootstrap /> },
      { name: "MUI", icon: <SiMui /> }, 
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: <FaNodeJs /> },
      { name: "Express.js", icon: <SiExpress /> },
      { name: "Python", icon: <DiPython /> },
      { name: "Flask", icon: <SiFlask /> }, 
      { name: "Java", icon: <FaJava /> }, 
      { name: "C++", icon: <PiFileCpp /> },
      { name: "MongoDB", icon: <DiMongodb /> },
      { name: "SQL Alchemy", icon: <GiDatabase /> },
    ],
  },
  {
    category: "Tools & Others",
    skills: [
      { name: "Git", icon: <FaGitAlt /> },
      { name: "SEO", icon: <TbSettingsSearch /> }, 
      { name: "UUID", icon: <SiLibrarything /> },
      { name: "Nodemailer", icon: <SiLibrarything /> },
      { name: "Github", icon: <FaGithub /> },
      { name: "Jupyter Notebook", icon: <SiJupyter /> },
    ],
  },
];

const TechnologiesSection = () => {
  return (
    <section id="technologies" className="py-20 px-4 bg-accent dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
            Technologies & Skills
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 text-center text-black dark:text-white">
                {tech.category}
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {tech.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary px-3 py-1 rounded-full text-m"
                  >
                    <span className="mr-2">{skill.icon}</span>
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;