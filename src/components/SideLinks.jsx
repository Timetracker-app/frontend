import React from "react";
import { GiCircularSaw, GiSewingMachine } from "react-icons/gi";
import { GrProjects } from "react-icons/gr";
import { IoIosPeople, IoMdAdd } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

export const links = [
  {
    id: 1,
    url: "/",
    text: "Work",
    icon: <GiCircularSaw />,
    subLinks: [
      { id: 1.1, url: "/add-work", text: "Add Work", icon: <IoMdAdd /> },
    ],
  },
  {
    id: 2,
    url: "/workplace",
    text: "Workplace",
    icon: <GiSewingMachine />,
    subLinks: [
      {
        id: 2.1,
        url: "/add-workplace",
        text: "Add Workplace",
        icon: <IoMdAdd />,
      },
    ],
  },
  {
    id: 3,
    url: "/project",
    text: "Project",
    icon: <GrProjects />,
    subLinks: [
      { id: 3.1, url: "/add-project", text: "Add Project", icon: <IoMdAdd /> },
    ],
  },
  {
    id: 4,
    url: "/worker",
    text: "Worker",
    icon: <IoIosPeople />,
    subLinks: [
      { id: 4.1, url: "/add-worker", text: "Add Worker", icon: <IoMdAdd /> },
    ],
  },
  {
    id: 5,
    url: "/profile",
    text: "Profile",
    icon: <CgProfile />,
  },
];
