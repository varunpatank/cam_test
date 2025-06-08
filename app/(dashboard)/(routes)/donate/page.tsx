// v.0.0.01 salah
"use client";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { WobbleCard } from "@/components/ui/wobble-card";
import MagicButton from "@/components/MagicButton";
import { HandHeart } from "lucide-react";
import { ConfirmModalVeryCustom } from "@/components/modals/confirm-modal-verycustom";
// export const maxDuration = 300;

const products = [
  {
    title: "1",
    thumbnail:
      "https://worldcrunch.com/media-library/photo-of-palestinians-among-rubble-in-gaza.jpg?id=50640616&width=2000&height=1500&quality=85&coordinates=0%2C0%2C640%2C0",
  },
  {
    title: "2",
    thumbnail:
      "https://media.newyorker.com/photos/65d7b9392c5c3fdb4f86e80e/16:9/w_2560,h_1440,c_limit/Chotiner-Gaza-Death-Toll.jpg",
  },
  {
    title: "3",
    thumbnail:
      "https://media.npr.org/assets/img/2024/03/19/ap24067614726584-7dd7d24bd4cb90badda990f1ca930cffff77c72f.jpg?s=1100&c=50&f=jpeg",
  },

  {
    title: "0",
    thumbnail:
      "https://borgenproject.org/wp-content/uploads/Hunger-in-South-Sudan.jpg",
  },
  {
    title: "0",
    thumbnail:
      "https://image.savethechildren.org/south-sudan-hunger-famine-crisis-ch1703842-rec.jpg-ch11041810.jpg/535pmwhaj5oktt08ymi00g28566ftqtm.jpg?g=auto&w=1536&format=webp&itok=F9zfLQiH",
  },
  {
    title: "0",
    thumbnail:
      "https://media.npr.org/assets/img/2024/04/11/gettyimages-2016310248_slide-ce32b232a3ffcaed364b560364f93ea54aefa913.jpg?s=1100&c=50&f=jpeg",
  },
  {
    title: "0",
    thumbnail:
      "https://borgenproject.org/wp-content/uploads/Hunger-in-South-Sudan.jpg",
  },
  {
    title: "0",
    thumbnail:
      "https://media.npr.org/assets/img/2024/04/11/gettyimages-2016310248_slide-ce32b232a3ffcaed364b560364f93ea54aefa913.jpg?s=1100&c=50&f=jpeg",
  },
  {
    title: "0",
    thumbnail:
      "https://i.stci.uk/sites/www.savethechildren.net/files/styles/article_full/public/field/image/CH11013478_Refugees%20and%20returnees%20from%20Sudan%20waiting%20to%20be%20transported%20to%20Transit%20Centre%202%20in%20Renk%2C%20South%20Sudan.jpg",
  },
  {
    title: "0",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:1000/1*feomheSe__EMMPDV2VaaIg.png",
  },
  {
    title: "0",
    thumbnail:
      "https://steamledge.com/wp-content/uploads/2022/09/BootCamp01_26-1024x768.jpg",
  },
  {
    title: "0",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:1000/1*feomheSe__EMMPDV2VaaIg.png",
  },
  {
    title: "0",
    thumbnail:
      "https://steamledge.com/wp-content/uploads/2022/09/BootCamp01_26-1024x768.jpg",
  },
];
const DonatePage = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto  px-0">
      <div className="max-w-7xl w-full">
        <HeroParallax products={products} />
      </div>
      <div
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-2 w-full mt-6 mb-6"
        id="donation"
      >
        <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 lg:min-h-[600px] xl:min-h-[300px]">
          <div className="max-w-sm">
            <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white mb-4">
              We will donate 1/3 to Palestine 🇵🇸, 1/3 to Sudan 🇸🇩 & 1/3 to
              coding charity.
            </h2>
            <p className="text-sm text-slate-300">
              DISCLAIMER: We will first pay off our bills of exactly:{" "}
              <span className="text-purple-300 text-[1.5rem]">$8.00</span> and
              you will recieve a reciept & proof
            </p>{" "}
            <ConfirmModalVeryCustom
              onConfirm={() => console.log("hi")}
              continueText="<3"
              cannot={true}
              Title="Not yet"
              additionalText={`We still didn't start accepting donations, keep your money thank you :D..`}
              continueButtonColor="bg-purple-600 hover:bg-purple-800"
            >
              <div>
                <MagicButton
                  title="Donate"
                  icon={<HandHeart />}
                  position="right"
                  width="60"
                />
              </div>
            </ConfirmModalVeryCustom>
          </div>
        </WobbleCard>
      </div>
    </main>
  );
};

export default DonatePage;
