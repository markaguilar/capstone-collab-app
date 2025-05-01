import React, { useState } from "react";

import { projects } from "../data/projects.ts";
import { studentProjects } from "../data/studentProject.ts";
import { developerProjects } from "../data/developerProject.ts";
import { recentActivities } from "../data/recentActivities.ts";
import { allSkills } from "../data/allSkills.ts";

const Home = () => {
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: "John Doe",
    email: "JohnDoe@gmail.com",
    role: "student",
    school: "Tech University",
    course: "Computer Science",
    capstoneIdeas: [
      {
        title: "AI Tutor for Programming",
        description: "An AI that helps students learn programming",
        date: "2023-10-01",
      },
      {
        title: "Campus Navigation App",
        description: "Mobile app to navigate university campus",
        date: "2023-09-15",
      },
    ],
    skills: ["JavaScript", "Python", "React"],
  });
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [projectFilter, setProjectFilter] = useState({
    status: "",
    skill: "",
    budget: "",
    sort: "newest",
  });
  const [newMessage, setNewMessage] = useState("");

  const filteredProjects = projects
    .filter((project) => {
      return (
        (projectFilter.status === "" ||
          project.status === projectFilter.status) &&
        (projectFilter.skill === "" ||
          project.skills.includes(projectFilter.skill)) &&
        (projectFilter.budget === "" ||
          (projectFilter.budget === "free" && !project.budget) ||
          (projectFilter.budget === "paid" && project.budget))
      );
    })
    .sort((a, b) => {
      if (projectFilter.sort === "deadline") {
        return new Date(a.deadline) - new Date(b.deadline);
      } else if (projectFilter.sort === "popular") {
        return b.proposals - a.proposals;
      } else {
        return new Date(b.deadline) - new Date(a.deadline);
      }
    });

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="gradient-bg text-white rounded-xl shadow-lg mb-10 overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Connect, Collaborate, Create
            </h1>
            <p className="text-xl mb-8">
              The premier platform connecting students with skilled developers
              to bring capstone projects to life.
            </p>
            {!currentUser && (
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={onOpenAuthModal}
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition"
                >
                  Get Started
                </button>
                <button className="px-6 py-3 border border-white text-white rounded-lg font-bold hover:bg-blue-700 transition">
                  Learn More
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-user-graduate text-blue-600 text-xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">Students</h3>
            <ol className="list-decimal pl-5 space-y-1 text-gray-600">
              <li>Create a project listing</li>
              <li>Review developer proposals</li>
              <li>Select the best match</li>
              <li>Collaborate and succeed</li>
            </ol>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-code text-blue-600 text-xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">Developers</h3>
            <ol className="list-decimal pl-5 space-y-1 text-gray-600">
              <li>Browse student projects</li>
              <li>Submit your proposals</li>
              <li>Get selected</li>
              <li>Build your portfolio</li>
            </ol>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-handshake text-blue-600 text-xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">Collaboration</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <i className="fas fa-comments text-blue-500 mt-1 mr-2"></i>
                <span>Built-in messaging system</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-file-contract text-blue-500 mt-1 mr-2"></i>
                <span>Clear project agreements</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-star text-blue-500 mt-1 mr-2"></i>
                <span>Review system for quality</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          {currentUser && (
            <button
              onClick={() => onProjectClick("all")}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View All Projects →
            </button>
          )}
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
                onClick={() => onProjectClick(project.id)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                    {project.skills.length > 3 && (
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        +{project.skills.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>
                      <i className="far fa-calendar-alt mr-1"></i>{" "}
                      {project.deadline}
                    </span>
                    <span>
                      <i className="fas fa-dollar-sign mr-1"></i>{" "}
                      {project.budget || "Negotiable"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <i className="fas fa-project-diagram text-4xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-bold mb-2">No Projects Available</h3>
            <p className="text-gray-600 mb-4">
              Check back later or create your own project if you're a student.
            </p>
            {currentUser?.role === "student" && (
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Create Project
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
