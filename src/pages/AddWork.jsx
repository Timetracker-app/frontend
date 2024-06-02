import { Form, Link } from "react-router-dom";
import { FormSelect, FormTimeRange, PageTitle } from "../components";
import { useState } from "react";

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

const url = "/work";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  console.log(request);

  try {
    const response = await customFetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const AddWork = () => {
  const [worker, setWorker] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [project, setProject] = useState("");
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");

  const workerChange = (event) => {
    setWorker(event.target.value);
  };
  const workplaceChange = (event) => {
    setWorkplace(event.target.value);
  };
  const projectChange = (event) => {
    setProject(event.target.value);
  };
  const starttimeChange = (event) => {
    setStarttime(event.target.value);
  };
  const endtimeChange = (event) => {
    setEndtime(event.target.value);
  };

  return (
    <div>
      <div>
        <PageTitle text="Add Work" />
      </div>
      <Form
        method="post"
        className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center"
      >
        <FormSelect
          label="select worker"
          name="ime"
          list={workers}
          value={worker}
          onChange={workerChange}
          size="select-sm"
        ></FormSelect>
        <FormSelect
          label="select project"
          name="projekt"
          list={projects}
          value={project}
          onChange={projectChange}
          size="select-sm"
        ></FormSelect>
        <FormSelect
          label="select workplace"
          name="stroj"
          list={workplaces}
          value={workplace}
          onChange={workplaceChange}
          size="select-sm"
        ></FormSelect>
        <FormTimeRange
          label="select start date"
          name="zacetni_cas"
          value={starttime}
          onChange={starttimeChange}
          required={true}
        ></FormTimeRange>
        <FormTimeRange
          label="select end date"
          name="koncni_cas"
          value={endtime}
          onChange={endtimeChange}
          required={true}
        ></FormTimeRange>
        <button type="submit" className="bg-base-300 btn btn-sm">
          Add
        </button>
      </Form>
    </div>
  );
};

export default AddWork;
