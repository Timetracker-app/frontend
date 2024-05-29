import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";

const WorkplaceList = () => {
  const { workplaces } = useLoaderData();

  const totalWorkplaces = workplaces.length;

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;
  const pageCount = Math.ceil(totalWorkplaces / pageSize);
  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const slicedWorkplaces = workplaces.slice(startIndex, endIndex);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Workplace</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        {slicedWorkplaces.map((val, key) => {
          const { stroj, cas, status } = val;
          return (
            <tbody>
              <tr key={key}>
                <td>{stroj}</td>
                <td>{cas}</td>
                <td className={status === 1 ? "text-success" : "text-error"}>
                  {status === 1 ? "active" : "inactive"}
                </td>
                <td>
                  <Link to={`/workplace/${stroj}`} className="btn btn-sm">
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
export default WorkplaceList;
