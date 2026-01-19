export default function Post() {
  return (
    <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden max-w-4xl mx-auto mb-8">
      <div className="flex flex-col md:flex-row">
        {/* Image Container */}
        <div className="md:w-2/5 relative overflow-hidden bg-gray-100">
          <img
            src="https://tse1.mm.bing.net/th/id/OIP.zB1rsS80G2GPbY0mMvKnigHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="My Family Logo"
            className="w-full h-64 md:h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        {/* Content Container */}
        <div className="md:w-3/5 p-8">
          {/* Author & Date */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">Shakthi</span>
              <time className="text-xs text-gray-500" dateTime="2026-01-06">
                January 6, 2026
              </time>
            </div>
          </div>
          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            My Family Logo
          </h2>
          {/* Description */}
          <p className="text-gray-600 leading-relaxed text-lg mb-6">
            Create a beautiful blog that matches your style using clean layouts,
            rich visuals, and simple design.
          </p>
        </div>
      </div>
    </article>
  );
}