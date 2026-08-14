import React from "react";

const Sejarah = () => {
  return (
    <>
      <section className="w-full min-h-screen bg-white py-20">
        <div className="flex absolute mt-8 w-full justify-center items-center z-10">
          <h1
            className="sejarahTitle text-9xl text-tertiary/40 tracking-wide font-black
          opacity-40 text-center"
          >
            SEJARAH
          </h1>
        </div>

        <div className="flex mt-8 h-100 w-4/5 mx-auto justify-center flex-col items-start relative z-20">
          <h1 className="text-6xl text-start font-black ">
            MELANGKAH DARI <span className="text-secondary">MASA</span> KE{" "}
            <span className="text-tertiary">MASA</span>
          </h1>
          <p>
            Menelusuri perjalanan, perubahan, dan langkah SMK Negeri 26 Jakarta
            dalam membangun pendidikan vokasi.
          </p>
        </div>

      </section>
    </>
  );
};

export default Sejarah;
