import React from 'react';

const Hero = () => {
  return (
    <section className="bg-blue-200 p-10 text-center">
      <img src="/my-photo.jpg" alt="You" className="w-32 h-32 rounded-full mx-auto" /> {/* Public folder me my-photo.jpg daalo */}
      <h1 className="text-4xl mt-4">Hi, I'm Yuvraj Singh</h1> {/* Apna real name daalo */}
      <p className="text-xl">Web Developer | Asansol</p> {/* Apni city daalo */}
      <a href="/my-cv.pdf" download className="bg-blue-600 text-white px-4 py-2 mt-4 inline-block">Download CV</a> {/* Public folder me my-cv.pdf daalo */}
    </section>
  );
};

export default Hero;