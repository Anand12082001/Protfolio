import { motion } from "framer-motion"

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-6 text-center bg-white">
      <h2 className="text-3xl font-bold mb-10">Projects</h2>

      <motion.div
        whileHover={{ scale: 1.03 }}
        className="bg-white-900 p-6 rounded-xl max-w-3xl mx-auto"
      >
        <h3 className="text-2xl font-semibold mb-4">
          College Placement Management System
        </h3>

        <p className="text-gray-400 mb-4">
          Full-stack MERN application with role-based authentication,
          10+ REST APIs, JWT security, and MongoDB schema optimization.
        </p>

        <div className="flex justify-center gap-4 ">
          <a
            href="https://sparkling-vacherin-edc492.netlify.app/"
            target="_blank"
            className="px-4 py-2 bg-blue-500 text-black rounded-lg "
          >
            Live Demo
          </a>

          <a
            href="https://github.com/Anand12082001"
            target="_blank"
            className="px-4 py-2 bg-cyan-500 border border-white rounded-lg"
          >
            GitHub
          </a>
        </div>
      </motion.div>
    </section>
  )
}

export default Projects