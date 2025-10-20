import Navbar from "../components/Navbar";
import { FaReact, FaGoogle, FaNodeJs } from "react-icons/fa";
import { SiExpress, SiMongodb, SiLeaflet } from "react-icons/si";
import JohnnyAvatar from "../assets/avatars/Johnny.jpg";
import RyanAvatar from "../assets/avatars/Ryan.jpg";
import KohtarohAvatar from "../assets/avatars/kohtaroh.jpg";
import JonathanAvatar from "../assets/avatars/jonathan.png";
import RishabhAvatar from "../assets/avatars/rishabh.jpg";
import React from "react";
export default function About() {
  const team = [
    {
      name: "Johnny\nZhou",
      role: "Training Lead",
      desc: "Full stack developer",
      avatar: JohnnyAvatar,
    },
    {
      name: "Ryan\nTan",
      role: "Training Lead",
      desc: "Full stack developer",
      avatar: RyanAvatar,
    },
    {
      name: "Kohtaroh\nYamanishi",
      role: "Trainee",
      desc: "Frontend developer",
      avatar: KohtarohAvatar,
    },
    {
      name: "Jonathan\nBT",
      role: "Trainee",
      desc: "Frontend developer",
      avatar: JonathanAvatar,
    },
    {
      name: "Rishabh\nAnand",
      role: "Trainee",
      desc: "Backend developer",
      avatar: RishabhAvatar,
    },
  ];

  const stack = [
    { name: "React", icon: <FaReact className="text-sky-500 text-5xl" /> },
    {
      name: "Google Auth",
      icon: <FaGoogle className="text-red-500 text-5xl" />,
    },
    { name: "Node.js", icon: <FaNodeJs className="text-green-500 text-5xl" /> },
    { name: "Express", icon: <SiExpress className="text-gray-700 text-5xl" /> },
    {
      name: "MongoDB",
      icon: <SiMongodb className="text-emerald-600 text-5xl" />,
    },
    { name: "Leaflet", icon: <SiLeaflet className="text-lime-600 text-5xl" /> },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex flex-col">
      <Navbar variant="dark" />

      <main className="pt-24 flex flex-col flex-1">
        {/* Section 1: Team Introduction */}
        <section className="flex flex-col items-center py-16 px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">
            Meet Our Engineers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 max-w-6xl">
            {team.map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-amber-300/40 transition p-6"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-40 h-40 rounded-full object-cover mb-4 ring-2 ring-amber-400"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  <p>
                    {member.name.split("\n").map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                </h3>
                <p className="text-sm text-amber-600 font-medium">
                  {member.role}
                </p>
                <p className="text-gray-600 mt-2 text-sm">{member.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Project Introduction */}
        <section className="relative py-20 px-6 text-center bg-amber-100/80 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              About the Project
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              <strong className="text-amber-600">GeoMemo</strong> is a
              location-based note-taking app that allows users to create, store,
              and manage memos tied to specific geographic locations. Whether
              you're traveling, exploring new places, or simply want to remember
              something important about a location, GeoMemo has you covered.
            </p>
          </div>
        </section>

        <section className="flex flex-col items-center py-20 px-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">
            Our Technology Stack
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10 max-w-5xl">
            {stack.map((tech, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 hover:shadow-amber-300/50 transition"
              >
                {tech.icon}
                <p className="mt-3 text-gray-700 font-semibold">{tech.name}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-amber-200 to-transparent" />
    </div>
  );
}
