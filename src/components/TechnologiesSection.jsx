import { motion } from "framer-motion";

const technologies = [
  {
    category: "Frontend",
    skills: ["React", "HTML", "CSS", "JavaScript", "Bootstrap", "MUI"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js", "Python", "Flask", "Java", "C++", "C", "MongoDB", "SQL Alchemy"],
  },
  {
    category: "Tools & Others",
    skills: ["Git", "SEO", "UUID", "Nodemailer", "Github", "Jupyter Notebook"],
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
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    className="bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </motion.span>
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
