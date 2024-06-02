import { Form, useLoaderData, Link } from "react-router-dom";
import { useState } from "react";
import FormSelect from "./FormSelect";
import FormDateRange from "./FormDateRange";
import { customFetch } from "../utils";
import { CSVLink } from "react-csv";

const workersResponse = await customFetch("/worker");
const workersData = workersResponse.data.result;
const workers = [...new Set(workersData.map((item) => item.ime))];
workers.unshift("");

const workplacesResponse = await customFetch("/workplace");
const workplacesData = workplacesResponse.data.result;
const workplaces = [...new Set(workplacesData.map((item) => item.stroj))];
workplaces.unshift("");

const projectsResponse = await customFetch("/project");
const projectsData = projectsResponse.data.result;
const projects = [...new Set(projectsData.map((item) => item.projekt))];
projects.unshift("");

const WorkFilter = () => {
  const { work, params } = useLoaderData();
  const { worker, project, workplace, starttime, endtime } = params;

  const [workerState, setWorkerState] = useState(worker);
  const [projectState, setProjectState] = useState(project);
  const [workplaceState, setWorkplaceState] = useState(workplace);
  const [starttimeState, setStarttimeState] = useState(starttime);
  const [endtimeState, setEndtimeState] = useState(endtime);

  const workerStateChange = (event) => {
    setWorkerState(event.target.value);
  };
  const projectStateChange = (event) => {
    setProjectState(event.target.value);
  };
  const workplaceStateChange = (event) => {
    setWorkplaceState(event.target.value);
  };
  const starttimeStateChange = (event) => {
    setStarttimeState(event.target.value);
  };
  const endtimeStateChange = (event) => {
    setEndtimeState(event.target.value);
  };

  /*
  const workers = [...new Set(work.map((item) => item.ime))];
  workers.unshift("");
  const projects = [...new Set(work.map((item) => item.projekt))];
  projects.unshift("");
  const workplaces = [...new Set(work.map((item) => item.stroj))];
  workplaces.unshift("");
  */

  return (
    <div>
      <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center">
        <FormSelect
          label="select worker"
          name="worker"
          list={workers}
          value={workerState}
          onChange={workerStateChange}
        ></FormSelect>
        <FormSelect
          label="select project"
          name="project"
          list={projects}
          value={projectState}
          onChange={projectStateChange}
        ></FormSelect>
        <FormSelect
          label="select workplace"
          name="workplace"
          list={workplaces}
          value={workplaceState}
          onChange={workplaceStateChange}
        ></FormSelect>
        <FormDateRange
          label="select start date"
          name="starttime"
          value={starttimeState}
          onChange={starttimeStateChange}
          required={false}
        ></FormDateRange>
        <FormDateRange
          label="select end date"
          name="endtime"
          value={endtimeState}
          onChange={endtimeStateChange}
          required={false}
        ></FormDateRange>
        <button type="submit" className="bg-base-300 btn btn-sm">
          Search
        </button>
        <Link to="/" className="bg-base-300 btn btn-sm">
          Reset
        </Link>
        <CSVLink
          data={work}
          headers={[
            { label: "Work ID", key: "IDdela" },
            { label: "Worker", key: "ime" },
            { label: "Project", key: "projekt" },
            { label: "Workplace", key: "stroj" },
            { label: "Start Time", key: "zacetni_cas" },
            { label: "End Time", key: "koncni_cas" },
          ]}
          separator={";"}
          className="bg-base-300 btn btn-sm"
          filename="work-list"
        >
          Export Data (.csv)
        </CSVLink>
      </Form>
    </div>
  );
};

export default WorkFilter;
