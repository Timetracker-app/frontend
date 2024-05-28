import { useLoaderData, Link } from "react-router-dom";

const WorkplaceList = () => {
  const { workplaces } = useLoaderData();

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
        {workplaces.map((val, key) => {
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
    </div>
  );
};
export default WorkplaceList;
