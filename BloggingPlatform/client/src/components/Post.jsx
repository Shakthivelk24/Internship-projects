import { useState } from "react";


export default function Post( {Post}) {
  const [open, setOpen] = useState(false);
  
  const shortText = Post.content.slice(0, 80) + "...";
  
  const longText = Post.content;

  return (
    <>
    <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden max-w-4xl mx-auto mb-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/5 relative overflow-hidden bg-gray-100">
          <img
            src={Post.postImage}
            alt={Post.title}
            className="w-full h-64 md:h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="md:w-3/5 p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
              {Post.ownerName.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">{Post.ownerName}</span>
              <time className="text-xs text-gray-500">
                {new Date(Post.updatedAt).toLocaleString()}
              </time>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {Post.title}
          </h2>

          <p className="text-gray-600 leading-relaxed text-lg mb-6">
            {open ? longText : shortText}
          </p>

          <button
            onClick={() => setOpen(!open)}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
          >
            {open ? "Show Less" : "Read More"}
          </button>
        </div>
      </div>
    </article>
    </>
  );
}
