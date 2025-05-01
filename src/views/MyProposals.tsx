import { useState } from "react";

const MyProposals = () => {
  const [proposals, setProposals] = useState([
    {
      id: 1,
      projectId: 1,
      projectTitle: "E-commerce Platform for Local Artisans",
      status: "pending",
      submittedDate: "2023-06-15",
      studentName: "Sarah Johnson",
      timeline: "6 weeks",
      cost: "$1200",
    },
    {
      id: 2,
      projectId: 2,
      projectTitle: "AI-Powered Study Assistant App",
      status: "accepted",
      submittedDate: "2023-05-20",
      studentName: "Michael Chen",
      timeline: "8 weeks",
      cost: "$1800",
    },
  ]);

  const [activeStatus, setActiveStatus] = useState("all");

  const filteredProposals =
    activeStatus === "all"
      ? proposals
      : proposals.filter((p) => p.status === activeStatus);

  return (
    <div className="slide-in">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">My Proposals</h2>
      </div>

      <div className="mb-6">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {["all", "pending", "accepted", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                activeStatus === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {status === "all"
                ? "All Proposals"
                : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filteredProposals.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredProposals.map((proposal) => (
            <div
              key={proposal.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{proposal.projectTitle}</h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      proposal.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : proposal.status === "accepted"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {proposal.status.charAt(0).toUpperCase() +
                      proposal.status.slice(1)}
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <img
                    src={`https://i.pravatar.cc/30?u=${proposal.studentName}`}
                    alt={proposal.studentName}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <span>{proposal.studentName}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500">
                      Submitted
                    </h4>
                    <p>{proposal.submittedDate}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500">
                      Timeline
                    </h4>
                    <p>{proposal.timeline}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500">
                      Cost
                    </h4>
                    <p>{proposal.cost}</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button className="px-3 py-1 border rounded-md hover:bg-gray-100 text-sm">
                    View Project
                  </button>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                    Message Student
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <i className="fas fa-file-alt text-4xl text-gray-300 mb-4"></i>
          <h3 className="text-xl font-bold mb-2">No Proposals Found</h3>
          <p className="text-gray-600 mb-4">
            {activeStatus === "all"
              ? "You haven't submitted any proposals yet."
              : `You don't have any ${activeStatus} proposals.`}
          </p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Browse Projects
          </button>
        </div>
      )}
    </div>
  );
};

export default MyProposals;
