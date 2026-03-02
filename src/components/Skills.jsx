import { motion } from "framer-motion"

const skills = [
  "HTML5", "CSS3", "JavaScript",
  "React.js", "Node.js", "Express.js",
  "MongoDB", "JWT", "Tailwind CSS"
]

const Skills = () => {
  return (
    <section className="py-20 text-center">
      <h2 className="text-3xl font-bold mb-10">Skills</h2>

      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            className="px-5 py-3 border border-gray-600 rounded-lg"
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Skills