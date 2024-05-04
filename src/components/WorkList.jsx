import { useLoaderData } from "react-router-dom";
import { formatDate } from "../utils";

const WorkList = () => {
  const { work } = useLoaderData();

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Worker</th>
            <th>Project</th>
            <th>Workplace</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        {work.map((val, key) => {
          const { IDdela, ime, projekt, stroj, zacetni_cas, koncni_cas } = val;
          const starttime = formatDate(zacetni_cas);
          const endtime = formatDate(koncni_cas);
          return (
            <tbody>
              <tr key={key}>
                <td>{ime}</td>
                <td>{projekt}</td>
                <td>{stroj}</td>
                <td>{starttime}</td>
                <td>{endtime}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
      ;
    </div>
  );
};
export default WorkList;
