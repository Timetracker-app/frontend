import { useLoaderData, Link } from "react-router-dom";

const ProjectList = () => {
  const { projects } = useLoaderData();

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
        {projects.map((val, key) => {
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
    </div>
  );
};
export default ProjectList;
