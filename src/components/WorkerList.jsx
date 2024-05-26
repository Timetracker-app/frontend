import { useLoaderData } from "react-router-dom";

const WorkerList = () => {
  const { workers } = useLoaderData();

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Surname</th>
            <th>Email</th>
          </tr>
        </thead>
        {workers.map((val, key) => {
          const { ime, priimek, email } = val;
          return (
            <tbody>
              <tr key={key}>
                <td>{ime}</td>
                <td>{priimek}</td>
                <td>{email}</td>
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
export default WorkerList;
