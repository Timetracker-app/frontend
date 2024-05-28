import { Form, useLoaderData, Link } from "react-router-dom";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTimeRange from "./FormTimeRange";
import { IoMdAdd } from "react-icons/io";

const WorkFilter = () => {
  const { work, params } = useLoaderData();
  const { worker, project, workplace, starttime, endtime } = params;
  const workers = [...new Set(work.map((item) => item.ime))];
  workers.unshift("");
  const projects = [...new Set(work.map((item) => item.projekt))];
  projects.unshift("");
  const workplaces = [...new Set(work.map((item) => item.stroj))];
  workplaces.unshift("");
  return (
    <div>
      <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center">
        {/*SEARCH
      <FormInput
        type="search"
        label="search work"
        name="search"
        //size="input-sm"
  />*/}
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
        <button type="submit" className="btn btn-sm">
          Search
        </button>
        <Link to="/" className="btn btn-sm">
          Reset
        </Link>
      </Form>
    </div>
  );
};

export default WorkFilter;
