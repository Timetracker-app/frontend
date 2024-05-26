import { useLoaderData } from "react-router-dom";

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
                <td>{status}</td>
                <td>
                  <button className="btn btn-sm">Edit</button>
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
