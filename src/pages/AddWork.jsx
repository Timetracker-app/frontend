import { Form, Link } from "react-router-dom";
import {
  FormSelect,
  FormTimeRange,
  PageTitle,
  Notification,
} from "../components";
import { useState } from "react";
import { useNotification } from "../features/NotificationContext";

import { customFetch } from "../utils";

const userString = JSON.parse(localStorage.getItem("token"));
const token = userString.token;

const workersResponse = await customFetch("/worker", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
const workersData = workersResponse.data.result;
const workers = [...new Set(workersData.map((item) => item.ime))];
console.log(workers);

const workplacesResponse = await customFetch("/workplace", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
const workplacesData = workplacesResponse.data.result;
const workplaces = [
  ...new Set(
    workplacesData.filter((item) => item.status === 1).map((item) => item.stroj)
  ),
];
console.log(workplaces);

const projectsResponse = await customFetch("/project", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
const projectsData = projectsResponse.data.result;
const projects = [
  ...new Set(
    projectsData.filter((item) => item.status === 1).map((item) => item.projekt)
  ),
];
console.log(projects);

const url = "/work";

const handleAdd = async (data, notify) => {
  console.log(data);

  try {
    if (data.zacetni_cas === "" || data.koncni_cas === "") {
      throw new Error("Wrong input!");
    }
    const response = await customFetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    });
    console.log(response);
    if (response.status === 201) {
      notify("Work was successfully added!", "success");
    }
    return response;
  } catch (error) {
    if (error?.response?.data?.errorMsg?.status === 103) {
      console.log(error?.response?.data?.errorMsg);
      notify("Worker does not exist!", "error");
    } else if (error?.response?.data?.errorMsg?.status === 105) {
      console.log(error?.response?.data?.errorMsg);
      notify("Workplace does not exist!", "error");
    } else if (error?.response?.data?.errorMsg?.status === 107) {
      console.log(error?.response?.data?.errorMsg);
      notify("Project does not exist!", "error");
    } else if (error?.response?.data?.errorMsg?.status === 108) {
      console.log(error?.response?.data?.errorMsg);
      notify("Workplace is inactive!", "error");
    } else if (error?.response?.data?.errorMsg?.status === 109) {
      console.log(error?.response?.data?.errorMsg);
      notify("Project is inactive!", "error");
    } else {
      console.log("Failed to add work", error);
      notify("Failed to add work", "error");
    }
    return null;
  }
};

/*
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
*/

const AddWork = () => {
  const { notify } = useNotification();

  const [worker, setWorker] = useState(workers[0]);
  const [workplace, setWorkplace] = useState(workplaces[0]);
  const [project, setProject] = useState(projects[0]);
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

  const handleAddClick = (e) => {
    e.preventDefault();

    const data = {
      ime: worker,
      projekt: project,
      stroj: workplace,
      zacetni_cas: starttime,
      koncni_cas: endtime,
    };
    handleAdd(data, notify);
  };

  return (
    <div>
      <div>
        <PageTitle text="Add Work" />
      </div>
      <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center">
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
        <button
          type="submit"
          className="bg-base-300 btn btn-sm"
          onClick={handleAddClick}
        >
          Add
        </button>
      </Form>
      <Notification />
    </div>
  );
};

export default AddWork;
