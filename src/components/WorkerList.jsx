import { useLoaderData } from "react-router-dom";

const WorkerList = () => {
  const { workers } = useLoaderData();

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
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
              </tr>
            </tbody>
          );
        })}
      </table>
      ;
    </div>
  );
};
export default WorkerList;
