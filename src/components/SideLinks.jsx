import React from "react";
import { GiCircularSaw, GiSewingMachine } from "react-icons/gi";
import { GrProjects } from "react-icons/gr";
import { IoIosPeople } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

export const links = [
  {
    id: 1,
    url: "/",
    text: "Work",
    icon: <GiCircularSaw />,
  },
  {
    id: 2,
    url: "/workplace",
    text: "Workplace",
    icon: <GiSewingMachine />,
  },
  {
    id: 3,
    url: "/project",
    text: "Project",
    icon: <GrProjects />,
  },
  {
    id: 4,
    url: "/worker",
    text: "Worker",
    icon: <IoIosPeople />,
  },
  {
    id: 5,
    url: "/profile",
    text: "Profile",
    icon: <CgProfile />,
  },
];
