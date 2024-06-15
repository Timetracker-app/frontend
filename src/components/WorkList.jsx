import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { formatDate, timeDiff } from "../utils";

const WorkList = () => {
  const { work } = useLoaderData();
  console.log(work);
  const totalWorks = work.length;
  const reversedWork = [...work].reverse();

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;
  const pageCount = Math.ceil(totalWorks / pageSize);
  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const slicedWork = reversedWork.slice(startIndex, endIndex);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Worker</th>
            <th>Project</th>
            <th>Workplace</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        {slicedWork.map((val, key) => {
          const { IDdela, ime, projekt, stroj, zacetni_cas, koncni_cas } = val;
          const starttime = formatDate(zacetni_cas);
          const endtime = formatDate(koncni_cas);
          //const workTime = timeDiff(zacetni_cas, koncni_cas);
          //console.log(workTime);

          return (
            <tbody>
              <tr key={key}>
                <td>{ime}</td>
                <td>{projekt}</td>
                <td>{stroj}</td>
                <td>{starttime}</td>
                <td>{endtime}</td>
                <td>
                  <Link to={`/work/${IDdela}`} className="btn btn-sm">
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
export default WorkList;
