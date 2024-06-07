import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";

const WorkerList = () => {
  const { workers } = useLoaderData();

  const totalWorkers = workers.length;

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;
  const pageCount = Math.ceil(totalWorkers / pageSize);
  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const slicedWorkers = workers.slice(startIndex, endIndex);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
          </tr>
        </thead>
        {slicedWorkers.map((val, key) => {
          const { ime, priimek, email, role, status } = val;
          return (
            <tbody>
              <tr key={key}>
                <td>{ime}</td>
                <td>{priimek}</td>
                <td>{email}</td>
                <td className={status === 1 ? "text-success" : "text-error"}>
                  {status === 1 ? "active" : "inactive"}
                </td>
                <td>{role}</td>
                <td>
                  <Link to={`/worker/${ime}`} className="btn btn-sm">
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
export default WorkerList;
