import { useState } from "react";

import { projects } from "../data/projects.ts";

const MyProjects = () => {
  const [activeStatus, setActiveStatus] = useState("all");

  const filteredProjects =
    activeStatus === "all"
      ? projects
      : projects.filter((p) => p.status === activeStatus);

  return (
    <div className="slide-in">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">My Projects</h2>
      </div>

      <div className="mb-6">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {["all", "open", "in-progress", "completed"].map((status) => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                activeStatus === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {status === "all" ? "All Projects" : status.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-blue-500"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      project.status === "open"
                        ? "bg-green-100 text-green-800"
                        : project.status === "in-progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {project.status.replace("-", " ")}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{project.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-500 mb-1">
                    Required Skills:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:justify-between md:items-center text-sm">
                  <div className="mb-2 md:mb-0">
                    <span className="text-gray-500 mr-4">
                      <i className="far fa-calendar-alt mr-1"></i> Deadline:{" "}
                      {project.deadline}
                    </span>
                    {project.budget && (
                      <span className="text-gray-500">
                        <i className="fas fa-dollar-sign mr-1"></i> Budget:{" "}
                        {project.budget}
                      </span>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                      View Proposals
                    </button>
                    <button className="px-3 py-1 border rounded-md hover:bg-gray-100 text-sm">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <i className="fas fa-project-diagram text-4xl text-gray-300 mb-4"></i>
          <h3 className="text-xl font-bold mb-2">No Projects Found</h3>
          <p className="text-gray-600 mb-4">
            {activeStatus === "all"
              ? "You haven't created any projects yet."
              : `You don't have any ${activeStatus.replace("-", " ")} projects.`}
          </p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Create New Project
          </button>
        </div>
      )}
    </div>
  );
};

export default MyProjects;
