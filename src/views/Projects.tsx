import { useState } from "react";

import { projects } from "../data/projects.ts";

const Projects = () => {
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
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSkills, setFilterSkills] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    skills: [],
    deadline: "",
    budget: "",
  });
  const [newSkill, setNewSkill] = useState("");
  const [proposal, setProposal] = useState({
    text: "",
    timeline: "",
    cost: "",
  });

  const handleCreateProject = () => {
    onCreateProject(newProject);
    setNewProject({
      title: "",
      description: "",
      skills: [],
      deadline: "",
      budget: "",
    });
    setShowCreateForm(false);
  };

  const handleSubmitProposal = () => {
    onSubmitProposal(selectedProject.id, proposal);
    setProposal({
      text: "",
      timeline: "",
      cost: "",
    });
    setShowProposalForm(false);
  };

  const addSkill = () => {
    if (newSkill && !newProject.skills.includes(newSkill)) {
      setNewProject({
        ...newProject,
        skills: [...newProject.skills, newSkill],
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setNewProject({
      ...newProject,
      skills: newProject.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  // Filter projects based on search and filters
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || project.status === filterStatus;

    const matchesSkills =
      filterSkills.length === 0 ||
      filterSkills.every((skill) => project.skills.includes(skill));

    return matchesSearch && matchesStatus && matchesSkills;
  });

  const allSkills = [...new Set(projects.flatMap((p) => p.skills))];

  return (
    <div className="slide-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h2 className="text-3xl font-bold mb-4 md:mb-0">Browse Projects</h2>

        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>

          <select
            className="px-4 py-2 border rounded-lg"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          {currentUser?.role === "student" && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
            >
              <i className="fas fa-plus mr-2"></i> New Project
            </button>
          )}
        </div>
      </div>

      {/* Skills Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 mb-2">
          Filter by Skills:
        </h3>
        <div className="flex flex-wrap gap-2">
          {allSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => {
                if (filterSkills.includes(skill)) {
                  setFilterSkills(filterSkills.filter((s) => s !== skill));
                } else {
                  setFilterSkills([...filterSkills, skill]);
                }
              }}
              className={`px-3 py-1 text-sm rounded-full ${filterSkills.includes(skill) ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
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

                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <img
                    src={`https://i.pravatar.cc/30?u=${project.student.name}`}
                    alt={project.student.name}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <span>
                    {project.student.name} • {project.student.course} at{" "}
                    {project.student.school}
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

                  {currentUser?.role === "developer" &&
                    project.status === "open" && (
                      <button
                        onClick={() => {
                          setSelectedProject(project);
                          setShowProposalForm(true);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Submit Proposal
                      </button>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <i className="fas fa-search text-4xl text-gray-300 mb-4"></i>
          <h3 className="text-xl font-bold mb-2">No Projects Found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or filters.
          </p>
          {currentUser?.role === "student" && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create Your First Project
            </button>
          )}
        </div>
      )}

      {/* Create Project Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">Create New Project</h3>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={newProject.title}
                    onChange={(e) =>
                      setNewProject({ ...newProject, title: e.target.value })
                    }
                    placeholder="E.g., E-commerce Platform for Local Artisans"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-md"
                    rows="4"
                    value={newProject.description}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        description: e.target.value,
                      })
                    }
                    placeholder="Describe your project in detail..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Required Skills
                  </label>
                  <div className="flex mb-2">
                    <input
                      type="text"
                      className="flex-grow px-3 py-2 border rounded-l-md"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill (e.g., React, Python)"
                    />
                    <button
                      onClick={addSkill}
                      className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {newProject.skills.map((skill) => (
                      <div
                        key={skill}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <i className="fas fa-times text-xs"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Deadline
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border rounded-md"
                      value={newProject.deadline}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          deadline: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Budget (Optional)
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      value={newProject.budget}
                      onChange={(e) =>
                        setNewProject({ ...newProject, budget: e.target.value })
                      }
                      placeholder="$500 - $1000"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateProject}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submit Proposal Modal */}
      {showProposalForm && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">
                  Submit Proposal for {selectedProject.title}
                </h3>
                <button
                  onClick={() => setShowProposalForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-bold mb-2">Project Details:</h4>
                <p className="text-gray-600 mb-2">
                  {selectedProject.description}
                </p>
                <div className="text-sm text-gray-500">
                  <p>
                    <span className="font-semibold">Deadline:</span>{" "}
                    {selectedProject.deadline}
                  </p>
                  {selectedProject.budget && (
                    <p>
                      <span className="font-semibold">Budget:</span>{" "}
                      {selectedProject.budget}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Proposal
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-md"
                    rows="6"
                    value={proposal.text}
                    onChange={(e) =>
                      setProposal({ ...proposal, text: e.target.value })
                    }
                    placeholder="Explain why you're the best fit for this project. Describe your approach, relevant experience, and any other details that might help the student choose you."
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estimated Timeline
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      value={proposal.timeline}
                      onChange={(e) =>
                        setProposal({ ...proposal, timeline: e.target.value })
                      }
                      placeholder="E.g., 6 weeks, 3 months"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Cost Estimate
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      value={proposal.cost}
                      onChange={(e) =>
                        setProposal({ ...proposal, cost: e.target.value })
                      }
                      placeholder="E.g., $1000, Negotiable"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowProposalForm(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitProposal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Submit Proposal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
