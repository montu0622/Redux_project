import React, { useEffect, useState } from "react";
import Form from "./Form";
import { deleteTask, getTask } from "../Services/services";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchTask, setStatus } from "../Store/slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { setHeaderHeading } from "../Store/slices/headerSlice";
import NoData from "./NoData";
import { setTogglee } from "../Store/slices/taskSlice";
import { Circles } from "react-loader-spinner";

const Task = () => {
  const [showForm, setShowForm] = useState(false);
  // const [tableData, setTableData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [toggle, setToggle] = useState();
  const [editTaskToggle, setEditTaskToggle] = useState(false);
  const [rowIndex, setRowIndex] = useState();
  const [taskEditId, setTaskEditId] = useState();
  const [perviousTaskData, setPreviousTaskData] = useState();
  const [editData, setEditData] = useState({
    task: "",
  });
  const [searchInput, setSearchInput] = useState("");
  const [pendingcount, setpendingcount] = useState("0");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [checkedToggle, setCheckedtoggle] = useState();
  const dispatch = useDispatch()
  var tableData = useSelector((state) => state?.task?.task)
  var state = useSelector((state) => state?.task)



  console.log(tableData, "tableData");


  useEffect(() => {
    dispatch(setHeaderHeading('Task'))

    dispatch(fetchTask())
    state.error &&   toast.error('error')

    // getTask()
    //   .then((res) => {
    //     setTableData(res.data);
    //     console.log(res, "shashanj");
    //     let tempcount = res.data.filter((item) => item.status === "pending");
    //     setpendingcount(tempcount.length);
    //     setDataLoaded(true);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [dataLoaded, toggle, checkedToggle]);


  const handleDelete = (tasks) => {
    deleteTask(tasks.id)
      .then((res) => {
        toast.success("Task deleted sucessfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1200,
          pauseOnHover: false,
        });
        setToggle(!toggle);
      })
      .catch((err) => {
        console.error(err)
        toast.error("something went wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1200,
        });
      });
  };

  const handleEditTaskDataSubmit = () => {
    axios
      .put("http://localhost:4500/Task-Data/" + taskEditId, {
        task: editData.task ? editData.task : perviousTaskData.task,
        status: "pending",
      })
      .then((res) => {
        setEditTaskToggle(false);
        setToggle(!toggle);
        toast.success("Task Edited sucessfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1200,
          pauseOnHover: false,
        });
      })
      .catch((err) => {
        toast.error("Something Went Wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1200,
        });
      });
  };

  const handleEditTask = (index, tasks) => {
    setEditTaskToggle(!editTaskToggle);
    setRowIndex(index);
    setTaskEditId(tasks.id);
    setPreviousTaskData(tasks);
  };











  const handleEditTaskData = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "task":
        setEditData((prevData) => ({ ...prevData, task: value }));
        break;
      default:
    }
  };

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const markedCheckedClicked = (tasks, index) => {
    setCheckedtoggle(!checkedToggle)
    const updatedTask = { ...tasks, status: "completed" };
    axios
      .put(`http://localhost:4500/Task-Data/${tasks.id}`, updatedTask)
      .then((res) => {
        setToggle(!toggle);
        toast.success("Task Completed", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1200,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSelectChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  useEffect(()=>{
console.log(tableData?.filter((tasks) =>tasks?.task?.toLowerCase().includes(searchInput)));
    tableData =  tableData?.filter((tasks) =>tasks?.task?.toLowerCase().includes(searchInput))
  },[searchInput])

  return (
    <>
      <ToastContainer theme="dark" />
 
      <div className="page_wrapper">
      <div className="top_bar d-flex justify-content-between align-items-center">
          <div className="count">
            <button onClick={()=>dispatch(setStatus('completed'))}>Dispatch</button>
            Total Tasks : {tableData?.length}
            <br></br>
            Pending Tasks : {pendingcount}
            <br />
            Completed Tasks : {tableData?.length - pendingcount}
          </div>
          <input
            onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
            placeholder="Search Task..."
            className="mb-3 ml-3 pl-2 mt-3 rounded"
          />
          <select onChange={handleSelectChange}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <button className="btn_primary" onClick={handleButtonClick}>
            New Todo
          </button>
        </div>
        { state && state.loading ? 
             <Circles
             height="50"
             width="50"
             color="#4fa94d"
             ariaLabel="circles-loading"
             wrapperStyle={{
             }}
             wrapperClass=""
             visible={true}
           />
            :
            <table cellPadding="12px" className="task_table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Mark as checked</th>
                <th>Task</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {tableData?.filter((item) => {
                  return selectedStatus === "all"
                    ? item
                    : item.status === selectedStatus;
                })
                  .map((tasks, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          {
                            <input
                              type="checkbox"
                              className="checkbox"
                              onClick={() => markedCheckedClicked(tasks, index)}
                              disabled={tasks.status === "completed"}
                              checked={tasks.status === "completed"}
                            />
                          }
                        </td>
                        <td>
                          {editTaskToggle && rowIndex === index ? (
                            <input
                              defaultValue={tasks.task}
                              name="task"
                              onChange={(e) => handleEditTaskData(e)}
                            />
                          ) :
                            tasks.status === "completed" ? (
                              <span className="strike">{tasks.task}</span>
                            ) : (
                              tasks.task
                            )}
                        </td>
                        <td>
                          <div
                            className={
                              tasks.status === "pending"
                                ? "pending"
                                : tasks.status === "completed"
                                  ? "complete"
                                  : " "
                            }
                          >
                            {tasks.status}
                          </div>
                        </td>
                        <td>
                          {editTaskToggle && rowIndex === index ? (
                            <button
                              className="btn btn-outline-primary"
                              onClick={() =>
                                handleEditTaskDataSubmit(index, tasks)
                              }
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => handleEditTask(index, tasks)}
                              disabled={tasks.status === "completed"}
                            >
                              <img src="../assets/icons/pen.svg" alt="edit" />
                            </button>
                          )}
                        </td>
  
                        <td>
                          {editTaskToggle && rowIndex === index ? (
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => setEditTaskToggle(false)}
                            >
                              Cancel
                            </button>
                          ) : (
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => handleDelete(tasks)}
                            >
                              <img src="../assets/icons/trash.svg" alt="edit" />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
  
            </tbody>
            {tableData.length === 0 && <NoData />}
            </table>

        }
        
       
      </div>
      <div>
        {showForm && (
          <Form setShowForm={setShowForm} setDataLoaded={setDataLoaded} />
        )}
      </div>
    </>
  );
};

export default Task;
