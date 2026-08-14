import React from "react";

const Sejarah = () => {
  return (
    <>
      <section className="w-full min-h-screen bg-white py-20">
        <div className="flex flex-row absolute mt-8 w-full justify-center gap-52 items-center z-10">
          <h1
            className="sejarahTitle text-9xl text-tertiary/40 tracking-wide font-black
          opacity-40 text-center"
          >
            SEJARAH      
          </h1>
          <h1
            className="sejarahTitle text-9xl text-tertiary/40 tracking-wide font-black
          opacity-40 text-center"
          >
            SEJARAH      
          </h1>
        </div>

        <div className="flex mt-32 h-100 w-5/8 ml-36 justify-center flex-col items-start relative z-20">
          <h1 className="text-7xl text-start font-black ">
            MELANGKAH DARI <span className="text-secondary">MASA</span> KE{" "}
            <span className="text-tertiary">MASA</span>
          </h1>
          <p className="text-2xl text-start mt-4 font-medium">
            Menelusuri perjalanan, perubahan, dan langkah SMK Negeri 26 Jakarta
            dalam membangun pendidikan vokasi.
          </p>
        </div>

      </section>
    </>
  );
};

export default Sejarah;
