const Blogs = () => {
  const blogs = [
    {
      image: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Planning Your Perfect Timeline',
      excerpt: 'How to structure your wedding day for stunning natural light photography',
      date: 'December 2024',
    },
    {
      image: 'https://images.pexels.com/photos/1464209/pexels-photo-1464209.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Choosing Your Wedding Venue',
      excerpt: 'What photographers look for in a dream wedding location',
      date: 'November 2024',
    },
    {
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Editorial Bridal Portraits',
      excerpt: 'Tips for feeling confident and natural in front of the camera',
      date: 'October 2024',
    },
  ];

  return (
    <section id="blogs" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light text-[#1E1E1E] tracking-wide mb-6">
            Journal
          </h2>
          <div className="w-16 h-px bg-[#1E1E1E] opacity-30 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {blogs.map((blog, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden mb-6">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="text-xs font-light text-[#1E1E1E] tracking-widest uppercase opacity-40 mb-3">
                {blog.date}
              </p>
              <h3 className="text-xl md:text-2xl font-light text-[#1E1E1E] tracking-wide mb-4 group-hover:opacity-60 transition-opacity">
                {blog.title}
              </h3>
              <p className="text-sm md:text-base font-light text-[#1E1E1E] opacity-60 leading-relaxed">
                {blog.excerpt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
