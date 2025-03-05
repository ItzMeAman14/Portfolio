import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4 bg-accent dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
            About Me
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-8" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr]">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full flex justify-center"
          >

            <motion.div
              className="w-[300px] h-[500px] lg:w-[400px] lg:h-[500px] xl:w-[400px] xl:h-[500px] rounded-lg overflow-hidden"
            >
              <motion.img
                src="/aman-image.jpg"
                alt="Full Stack Developer"
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform origin-center hover:scale-110"
              />
            </motion.div>
          </motion.div>

          {/* Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full lg:pl-8 text-justify"
          >
            <h3 className="text-xl font-semibold mb-3 text-black dark:text-white lg:text-left lg:mt-0 text-center mt-4">
              Full Stack Developer
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Full Stack Development involves working with both the <strong>front-end</strong> (client side) and the <strong>back-end</strong> (server side) of web applications. As a Full Stack Developer, I am skilled in handling all aspects of web development, ensuring a seamless user experience from start to finish.
              <br />
              On the <strong>front-end</strong>, I work with technologies like <strong>HTML</strong>, <strong>CSS</strong>, and <strong>JavaScript</strong> to create interactive and visually appealing user interfaces. I use modern frameworks like <strong>React</strong> to build dynamic applications that provide smooth user experiences.
              <br />
              On the <strong>back-end</strong>, I develop the server-side logic and databases that power applications. Using technologies like <strong>Node.js</strong>, <strong>Express</strong>, I build scalable and secure server architectures that support complex data operations. I am also proficient in working with databases such as <strong>MongoDB</strong> and <strong>MySQL</strong> to manage data effectively and ensure the smooth functioning of applications.
              <br />
              As a Full Stack Developer, I bridge the gap between front-end and back-end, ensuring that both sides of the application work seamlessly together. I integrate APIs, handle data flow between the server and the client, and manage authentication and authorization to ensure secure communication across the application.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;