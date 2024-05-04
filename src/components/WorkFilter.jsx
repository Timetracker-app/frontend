import { Form, useLoaderData, Link } from "react-router-dom";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTimeRange from "./FormTimeRange";

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
    <Form>
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
      ></FormSelect>
      <FormSelect
        label="select project"
        name="project"
        list={projects}
        defaultValue={project}
      ></FormSelect>
      <FormSelect
        label="select workplace"
        name="workplace"
        list={workplaces}
        defaultValue={workplace}
      ></FormSelect>
      <FormTimeRange
        label="select start date"
        name="starttime"
        defaultValue={starttime}
      ></FormTimeRange>
      <FormTimeRange
        label="select end date"
        name="endtime"
        defaultValue={endtime}
      ></FormTimeRange>
      <button type="submit" className="btn">
        Search
      </button>
      <Link to="/" className="btn">
        Reset
      </Link>
    </Form>
  );
};

export default WorkFilter;
