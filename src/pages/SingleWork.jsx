import { useLoaderData } from "react-router-dom";
import { customFetch } from "../utils";
import { Link, Form } from "react-router-dom";
import { useState } from "react";
import {
  FormSelect,
  FormTimeRange,
  PageTitle,
  Notification,
} from "../components";
import { formatDateTime } from "../utils/index";
import { useNotification } from "../features/NotificationContext";

const userString = JSON.parse(localStorage.getItem("token"));
const token = userString?.token;

export const loader = async ({ params }) => {
  const response = await customFetch(`/work/${params.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const workersResponse = await customFetch("/worker", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const workersData = workersResponse.data.result;
  const workers = [...new Set(workersData.map((item) => item.ime))];

  const workplacesResponse = await customFetch("/workplace", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const workplacesData = workplacesResponse.data.result;
  const workplaces = [...new Set(workplacesData.map((item) => item.stroj))];

  const projectsResponse = await customFetch("/project", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const projectsData = projectsResponse.data.result;
  const projects = [...new Set(projectsData.map((item) => item.projekt))];
  return { work: response.data.result, workers, workplaces, projects };
};

const handleUpdate = async (workID, updatedData, notify) => {
  console.log(updatedData);

  try {
    if (updatedData.zacetni_cas === "" || updatedData.koncni_cas === "") {
      throw new Error("Wrong input!");
    }
    const t1 = new Date(updatedData.zacetni_cas);
    const t2 = new Date(updatedData.koncni_cas);
    const diff = t2.getTime() - t1.getTime();

    if (diff <= 0 || diff > 86400000) {
      throw new Error("Invalid datetime!");
    }

    const response = await customFetch(`/work/${workID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: updatedData,
    });
    console.log(response);
    if (response.status === 204) {
      notify("Work was successfully edited!", "success");
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
    } else {
      console.log("Failed to edit work", error);
      notify("Failed to edit work", "error");
    }

    return null;
  }
};

const handleDelete = async (workID, notify) => {
  try {
    const response = await customFetch(`/work/${workID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    if (response.status === 204) {
      notify("Work was successfully deleted!", "success");
    }
    return response;
  } catch (error) {
    console.log(error);
    notify("Failed to delete work", "error");
    return null;
  }
};

const SingleWork = () => {
  const { notify } = useNotification();

  const { work, workers, workplaces, projects } = useLoaderData();
  const workID = work.map((item) => item.IDdela)[0];
  const worker = work.map((item) => item.ime)[0];
  const project = work.map((item) => item.projekt)[0];
  const workplace = work.map((item) => item.stroj)[0];
  const starttime = formatDateTime(work.map((item) => item.zacetni_cas)[0]);
  const endtime = formatDateTime(work.map((item) => item.koncni_cas)[0]);

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

  const handleUpdateClick = (e) => {
    e.preventDefault();

    const updatedData = {
      ime: workerState,
      projekt: projectState,
      stroj: workplaceState,
      zacetni_cas: starttimeState,
      koncni_cas: endtimeState,
    };
    handleUpdate(workID, updatedData, notify);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    document.getElementById("modal").showModal();
  };

  const handleConfirmationClick = (e) => {
    handleDelete(workID, notify);
  };

  return (
    <div>
      <div>
        <PageTitle text="Edit Work" />
      </div>
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
        <FormTimeRange
          label="select start date"
          name="starttime"
          value={starttimeState}
          onChange={starttimeStateChange}
          required={true}
        ></FormTimeRange>
        <FormTimeRange
          label="select end date"
          name="endtime"
          value={endtimeState}
          onChange={endtimeStateChange}
          required={true}
        ></FormTimeRange>
        <button
          type="submit"
          className="bg-base-300 btn btn-sm"
          onClick={handleUpdateClick}
        >
          Edit
        </button>
        <button className="btn btn-sm btn-error" onClick={handleDeleteClick}>
          Delete
        </button>
      </Form>
      <Notification />
      <div>
        <dialog id="modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Warning</h3>
            <p className="py-4">Are you sure you want to delete this work?</p>
            <div className="modal-action">
              <form method="dialog">
                <button
                  className="btn btn-error"
                  onClick={handleConfirmationClick}
                >
                  Delete
                </button>
                <button className="btn">Cancel</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};
export default SingleWork;
