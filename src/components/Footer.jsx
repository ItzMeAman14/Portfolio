import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: <Github size={24} />, href: "https://github.com/ItzMeAman14", name: "GitHub" },
    { icon: <Linkedin size={24} />, href: "https://linkedin.com/in/aman-rehman-45317b240", name: "LinkedIn" },
    { icon: <Mail size={24} />, href: "mailto:amanrehman2020@gmail.com", name: "Email" },
  ];

  return (
    <footer className="bg-background text-foreground py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-sm text-center md:text-left"
        >
          © {new Date().getFullYear()} Aman Rehman. All rights reserved.
        </motion.p>

        {/* Social Media Icons */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 * index }}
              className="text-foreground hover:text-primary transition-transform duration-300"
              aria-label={link.name}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
