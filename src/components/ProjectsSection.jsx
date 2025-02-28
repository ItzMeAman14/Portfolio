import { motion } from "framer-motion";
import { useTheme } from './context/ThemeContext';
import EcommerceImg from "/HomePage.png";

const projects = [
  {
    title: "E-Commerce Website",
    description: "Developed and implemented an E-commerce website using Node.js, Express.js, and MongoDB. Integrated authentication, email notifications, and other essential features using various libraries.",
    image: EcommerceImg,
    tags: ["Node.js", "Express.js", "MongoDB", "UUID", "Nodemailer"],
    url: "http://sns-e-commerce.onrender.com",
  },
  {
    title: "Clustering Technique Implementation",
    description: "Implemented a clustering technique using Java, analyzing N-dimensional data and computing distances between points. Used Kruskal’s algorithm to determine the shortest path.",
    image: "https://sherrytowers.com/wp-content/uploads/2013/10/kmeans_1.jpg",
    tags: ["Java", "Clustering", "Kruskal Algorithm"],
    url: "https://github.com/ItzMeAman14/Cluster_Coordinates",
  },
  {
    title: "Chess Game",
    description: "Developed a Chess game using Pygame in Python, implementing movement rules, game logic, and an interactive GUI for a complete chess-playing experience.",
    image: "https://desibantu.com/wp-content/uploads/2013/05/chess-2-desibantu.jpg",
    tags: ["Python", "Pygame", "Game Development"],
    url: "https://github.com/ItzMeAman14/Oflline-Chess",
  },
];

const ProjectsSection = () => {
  const { isDark } = useTheme();

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                isDark ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 dark:text-gray-300">
                  {project.description}
                </p>


                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm dark:bg-primary/30 dark:text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a className="text-gray-600 mb-4 mx-1 dark:text-gray-300" href={project.url} target="_blank">
                  Click here to Checkout the project
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
