import { Form, Link } from "react-router-dom";
import FormSelect from "../components/FormSelect";
import FormTimeRange from "../components/FormTimeRange";

import { customFetch } from "../utils";

const workersResponse = await customFetch("/worker");
const workersData = workersResponse.data.result;
const workers = [...new Set(workersData.map((item) => item.ime))];
console.log(workers);

const workplacesResponse = await customFetch("/workplace");
const workplacesData = workplacesResponse.data.result;
const workplaces = [
  ...new Set(
    workplacesData.filter((item) => item.status === 1).map((item) => item.stroj)
  ),
];
console.log(workplaces);

const projectsResponse = await customFetch("/project");
const projectsData = projectsResponse.data.result;
const projects = [
  ...new Set(
    projectsData.filter((item) => item.status === 1).map((item) => item.projekt)
  ),
];
console.log(projects);

const AddWork = () => {
  return (
    <div>
      <div className="text-xl my-4">Add Work</div>
      <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center">
        <FormSelect
          label="select worker"
          name="worker"
          list={workers}
          defaultValue=""
          size="select-sm"
        ></FormSelect>
        <FormSelect
          label="select project"
          name="project"
          list={projects}
          defaultValue=""
          size="select-sm"
        ></FormSelect>
        <FormSelect
          label="select workplace"
          name="workplace"
          list={workplaces}
          defaultValue=""
          size="select-sm"
        ></FormSelect>
        <FormTimeRange
          label="select start date"
          name="starttime"
          defaultValue=""
          size="select-sm"
        ></FormTimeRange>
        <FormTimeRange
          label="select end date"
          name="endtime"
          defaultValue=""
          size="select-sm"
        ></FormTimeRange>
        <button type="submit" className="bg-base-300 btn btn-sm">
          Add
        </button>
      </Form>
    </div>
  );
};

export default AddWork;
