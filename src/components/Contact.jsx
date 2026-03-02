const Contact = () => {
  return (
    <section className="py-20 text-center">
      <h2 className="text-3xl font-bold mb-6">Contact</h2>

      <p className="text-gray-400">Salem, Tamil Nadu</p>
      <p className="text-gray-400">anandjayakumardae@gmail.com</p>
      <p className="text-gray-400">Ph -6374201734 </p>

      <div className="mt-6  flex justify-center gap-6">
        <a href="https://www.linkedin.com/in/anand-j/" target="_blank" className="bg-indigo-500 p-2 rounded-lg">
          LinkedIn
        </a>
        {/* <a href="https://github.com/Anand12082001" target="_blank" className="bg-indigo-500 p-2 rounded-lg">
          GitHub
        </a> */}
      </div>
    </section>
  )
}

export default Contact