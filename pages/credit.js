import Head from "next/head";
import Image from "next/image";

const Credits = () => {
  return (
    <>
      <Head>
        <title>Credits</title>
      </Head>
      <div className="w-full h-full">
        <div className="max-w-[1400px] mx-auto flex flex-col items-center">
          <div className="flex items-center">
            <p className="mr-4 text-2xl">Powered By</p>
            <Image width={160} height={80} alt="TheMovieDB img"
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"></Image>
          </div>
          <p className="px-4">This is a clone and I made it for fun purposes. I do not own any of the pictures or any other materials and I&apos;m not affiliated with Disney+ in any way.</p>
        </div>
      </div>
    </>
  );
}
 
export default Credits;