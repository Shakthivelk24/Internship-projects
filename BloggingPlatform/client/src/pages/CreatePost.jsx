import {useContext,useRef} from 'react'
import { userDataContext } from "../context/UserContext.jsx";
import { useNavigate } from 'react-router-dom';
import { LuImageUp } from "react-icons/lu";

function CreatePost() {
  const { frontendImage, setFrontendImage,backendImage, setBackendImage, selectedImage, setSelectedImage } = useContext(userDataContext);
  const inputImage = useRef(null);
  const navigate = useNavigate();
  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };
  return(
    <div>
       <div
          className={`w-[50px] h-[100px] lg:w-[125px] lg:h-[225px] overflow-hidden  bg-[#030326] border-2 border-[#2a2a6e] rounded-2xl hover:shadow-2xl hover:shadow-blue-500 transition-shadow duration-300 cursor-pointer hover:border-white hover:border-2 flex items-center justify-center ${
            selectedImage === "input"
              ? "border-white border-4 shadow-blue-500 shadow-2xl"
              : null
          }`}
          onClick={() => {
            inputImage.current.click();
            setSelectedImage("input");
          }}
        >
          {!frontendImage && (
            <LuImageUp className="text-white w-[25px] h-[25px]" />
          )}
          {frontendImage && (
            <img
              src={frontendImage}
              alt="custom"
              className="w-full h-full object-cover rounded-2xl"
            />
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          ref={inputImage}
          hidden
          onChange={handleImage}
        />
        {selectedImage && (
        <button
          className="min-w-[150px] h-[60px] mt-[10px] bg-blue-500 text-1xl font-semibold text-white rounded-full hover:bg-blue-600 cursor-pointer"
          onClick={() => navigate("/customize2")}
        >
          Next
        </button>
      )}
    </div>
  )
}

export default CreatePost;
