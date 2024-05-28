import { useLoaderData } from "react-router-dom";
import { customFetch } from "../utils";
import { Link, Form } from "react-router-dom";
import FormSelect from "../components/FormSelect";
import FormTimeRange from "../components/FormTimeRange";
import { formatDateTime } from "../utils/index";

const workersResponse = await customFetch("/worker");
const workersData = workersResponse.data.result;
const workers = [...new Set(workersData.map((item) => item.ime))];
console.log(workers);

const workplacesResponse = await customFetch("/workplace");
const workplacesData = workplacesResponse.data.result;
const workplaces = [...new Set(workplacesData.map((item) => item.stroj))];
console.log(workplaces);

const projectsResponse = await customFetch("/project");
const projectsData = projectsResponse.data.result;
const projects = [...new Set(projectsData.map((item) => item.projekt))];
console.log(projects);

export const loader = async ({ params }) => {
  const response = await customFetch(`/work/${params.id}`);
  return { work: response.data.result };
};

const SingleWork = () => {
  const { work } = useLoaderData();
  const workID = work.map((item) => item.IDdela)[0];
  const worker = work.map((item) => item.ime)[0];
  const project = work.map((item) => item.projekt)[0];
  const workplace = work.map((item) => item.stroj)[0];
  const starttime = formatDateTime(work.map((item) => item.zacetni_cas)[0]);
  const endtime = formatDateTime(work.map((item) => item.koncni_cas)[0]);

  return (
    <div>
      <div className="text-xl my-4">Edit Work</div>
      <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center">
        <FormSelect
          label="select worker"
          name="worker"
          list={workers}
          defaultValue={worker}
          size="select-sm"
        ></FormSelect>
        <FormSelect
          label="select project"
          name="project"
          list={projects}
          defaultValue={project}
          size="select-sm"
        ></FormSelect>
        <FormSelect
          label="select workplace"
          name="workplace"
          list={workplaces}
          defaultValue={workplace}
          size="select-sm"
        ></FormSelect>
        <FormTimeRange
          label="select start date"
          name="starttime"
          defaultValue={starttime}
          size="select-sm"
        ></FormTimeRange>
        <FormTimeRange
          label="select end date"
          name="endtime"
          defaultValue={endtime}
          size="select-sm"
        ></FormTimeRange>
        <button type="submit" className="bg-base-300 btn btn-sm">
          Edit
        </button>
        <button className="btn btn-sm btn-error">Delete</button>
      </Form>
    </div>
  );
};
export default SingleWork;
