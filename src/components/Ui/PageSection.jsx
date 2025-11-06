function PageHeader({ title, subtitle }) {
  return (
    <section className="relative py-5 px-4 bg-black/30 mb-5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-5">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">{title}</h2>
          <p className="text-xl text-gray-400">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}

export default PageHeader;
