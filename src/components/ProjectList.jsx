import { useLoaderData } from "react-router-dom";

const ProjectList = () => {
  const { projects } = useLoaderData();

  return (
    <div>
      <table>
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
                <td>{status}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
      ;
    </div>
  );
};
export default ProjectList;
