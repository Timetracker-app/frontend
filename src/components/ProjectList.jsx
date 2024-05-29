import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";

const ProjectList = () => {
  const { projects } = useLoaderData();
  const totalProjects = projects.length;

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;
  const pageCount = Math.ceil(totalProjects / pageSize);
  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const slicedProjects = projects.slice(startIndex, endIndex);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        {slicedProjects.map((val, key) => {
          const { projekt, cas, status } = val;
          return (
            <tbody>
              <tr key={key}>
                <td>{projekt}</td>
                <td>{cas}</td>
                <td className={status === 1 ? "text-success" : "text-error"}>
                  {status === 1 ? "active" : "inactive"}
                </td>
                <td>
                  <Link to={`/project/${projekt}`} className="btn btn-sm">
                    Edit
                  </Link>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
      <div className="mt-12 flex justify-end">
        <div className="join">
          <button
            className="btn btn-xs sm:btn-sm join-item"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {pages.map((pageNumber) => {
            return (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`btn btn-xs sm:btn-sm border-none join-item ${
                  pageNumber === currentPage
                    ? "bg-base-300 border-base-300 "
                    : ""
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
          <button
            className="btn btn-xs sm:btn-sm join-item"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === pageCount}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProjectList;
