import { motion } from "framer-motion"

const About = () => {
  return (
    <section className="py-20 px-6 max-w-4xl mx-auto text-center">
      <motion.h2
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl font-bold mb-6"
      >
        About Me
      </motion.h2>

      <p className="text-gray-400 leading-7">
        MERN Stack Developer with hands-on experience building scalable
        full-stack applications using React.js, Node.js, Express.js, and MongoDB.
        Developed a role-based College Placement Management System with JWT authentication.
      </p>
    </section>
  )
}

export default About