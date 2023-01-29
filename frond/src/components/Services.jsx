import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";


const Services = () => {

    const ServiceCard = ({color, title, icon, subtitle}) =>(
        <div className="flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
        <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
          {icon}
        </div>
        <div className="ml-5 flex flex-col flex-1">
          <h3 className="mt-2 text-white text-lg">{title}</h3>
          <p className="mt-1 text-white text-sm md:w-9/12">
            {subtitle}
          </p>
        </div>
      </div>
    );

    return (
        <div className="flex w-full justify-center items-center gradient-bg-services">
        <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
          <div className="flex-1 flex flex-col justify-start items-start">
            <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
              Let's take action! Humankind needs to invest 2% of global GDP to prevent extreme conditions
              & a masssive extiction on earth.
            </h1>
            <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
              Our mission is to make it easy for everyone to participate on climate change projects, without using your own money,
              in the most transparent way. <br />
              We enable contributions from credit cards rewards programs to support intelligent projects against climate change.

            </p>
          </div>
    
          <div className="flex-1 flex flex-col justify-start items-center">
            <ServiceCard
              color="bg-[#2952E3]"
              title="Full Transparency of the invesment strategy"
              icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
              subtitle="Using the blockchain technology, we can track every single dollar that is invested on climate change projects."
            />
            <ServiceCard
              color="bg-[#8945F8]"
              title="Go Local, community oriented"
              icon={<BiSearchAlt fontSize={21} className="text-white" />}
              subtitle="Impact globally by investing locally. We support projects that are close to you, so you can see the impact of your contribution."
            />
            <ServiceCard
              color="bg-[#F84550]"
              title="Directly protect the planet and biodiversity"
              icon={<RiHeart2Fill fontSize={21} className="text-white" />}
              subtitle="And know your impact, by number of trees planted, amount of CO2 mitigated, or other metrics."
            />
          </div>
        </div>
      </div>
    );
}

export default Services;