import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ADD_PROYECT_MEMBER, ADD_TASK, GET_ONE_PROYECT, REMOVE_TASK, UPDATE_PROYECT } from '../../Queries';
import Navigation from '../Navigation';
import { PlusCircleIcon } from '@heroicons/react/outline';
import AddProyectMember from './AddProyectMember';
import toast, { Toaster } from 'react-hot-toast';
import EditProyectForm from './EditProyectForm';
import AddTaskForm from './AddTaskForm';

const OneProjects = () => {
  const [open, setOpen] = useState<boolean>(false); // manage the add proyect member modal form
  const [addTaskOpen, setAddTaskOpen] = useState<boolean>(false); // manage the add task member modal form
  const [openEdit, setOpenEdit] = useState<boolean>(false); // manage the edit proyect member modal form
  const [token] = useState<string | any>(localStorage.getItem('token')); // store the user token from the localStorage
  const [creator] = useState<string | null>(localStorage.getItem('userId')); // store the userId from the localStorage
  const [email, setEmail] = useState<string | null>(''); // store the email state from the user input 
  const [role, setRole] = useState<string | null>(''); // store the role state from the user input
  const params: any | undefined = useParams(); // use useParams hook from react-router-dom to gets the proyect id in the route
  const proyectId: any | string = params?.projectId; //store the proyect id int stored in the route params

  // apollo useQuery hook to gets a single proyect
  const { data, refetch } = useQuery(GET_ONE_PROYECT,
    {
      variables: { token, proyectId },
    });

  // apollo useMutation for add a proyect member
  const [addProyectMember] = useMutation(ADD_PROYECT_MEMBER, {
    onCompleted: (data) => checkErrors(data)
  });

  // event hanler to call the add proyect member mutation
  const handleAddProyectMemberClick = async () => {
    await addProyectMember({ variables: { email, role, token, proyectId } });
  }

  // states for manage the data to edit a proyect
  let [title, setTitle] = useState<string | undefined>('');
  let [startAt, setStartAt] = useState<string | undefined>('');
  let [endsAt, setEndsAt] = useState<string | undefined>('');
  const [desc, setDesc] = useState<string | undefined>('');
  const [status, setStatus] = useState<string | undefined>('todo');

  // apollo hook useMutation to updates the proyect
  const [updateProyect] = useMutation(UPDATE_PROYECT, {
    onCompleted: (data) => checkUpdateProyectErrors(data)
  })

  // event hanler to call the upadateProyect mutation
  const handleEditClick = async () => {
    await updateProyect({ variables: { token, proyectId, title, startAt, endsAt } });
  }

  // apollo hook to add a task from the proyect
  const [addTask] = useMutation(ADD_TASK,
    {
      onCompleted: (data: any) => checkAddTaskErrors(data)
    });

  const handleAddTaskClick = async () => {
    const members = [creator];
    await addTask({ variables: { token, proyectId, title, members, description: desc, status, startAt, endsAt } });
  }

  // apollo useMutation hook to delete a task 
  const [deleteTask] = useMutation(REMOVE_TASK, { onCompleted: (data: any) => checkDeleteTaskErrors(data) });

  // event hanler to call the deleteTask mutation
  const handleDeleteTaskClick = async ({ target }: any) => {
    const taskId = target?.name;
    await deleteTask({ variables: { token, taskId } });
  }

  //event handler to manage the user input and store in the corresponding state
  const handleInputChange = ({ target }: any) => {
    const { value, name } = target;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'role') {
      setRole(value);
    }
    if (name === 'title') {
      setTitle(value);
    }
    if (name === 'status') {
      setStatus(value);
    }
    if (name === 'desc') {
      setDesc(value);
    }
    if (name === 'startAt') {
      const date = Date.parse(value);
      setStartAt(date.toString());
    }
    if (name === 'endsAt') {
      const date = Date.parse(value);
      setEndsAt(date.toString());
    }
  }

  //check if _err_ exists in the add members mutation
  const checkErrors = async (data: any) => {
    if (data?.addMember?.err || data.addMember?.memberHasAdded === false) {
      toast.error(`${data?.addMember?.err?.errorDesc}`, { duration: 2300, });
    } else if (data.addMember?.memberHasAdded === true) {
      toast.success('Member Added');
      await refetch();
      setOpen(false);
    }
  }

  //check if _err_ exists in the edit proyect mutation
  const checkUpdateProyectErrors = async (data: any) => {
    if (data?.editProyect?.err || data.editProyect?.proyectHasUpdated === false) {
      toast.error(`${data?.editProyect?.err?.errorDesc}`, { duration: 2300, });
    } else if (data.editProyect?.proyectHasUpdated === true) {
      toast.success('Proyect Updated');
      await refetch();
      setOpenEdit(false);
    }
  }

  //check if _err_ exists in the add task mutation
  const checkAddTaskErrors = async (data: any) => {
    if (data?.addTask?.err || data.addTask?.taskHasCreated === false) {
      toast.error(`${data?.adTask?.err?.errorDesc}`, { duration: 2300, });
    } else if (data.addTask?.taskHasCreated === true) {
      toast.success('Task Added');
      await refetch();
      setAddTaskOpen(false);
    }
  }

  //check if _err_ exists in the delete task mutation
  const checkDeleteTaskErrors = async (data: any) => {
    if (data?.deleteTask?.err || data.deleteTask?.taskHasDeleted === false) {
      toast.error(`${data?.deleteTask?.err?.errorDesc}`, { duration: 2300, });
    } else if (data.deleteTask?.taskHasDeleted === true) {
      toast.success('Task Deleted');
      await refetch();
    }
  }

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Navigation />
      <section className="w-full max-w-6xl px-4 m-4 mx-auto">
        <div className="grid gap-5 p-4 m-2 md:grid-cols-12">
          <main className="p-4 md:col-span-9">
            <div className="flex flex-row mx-auto">
              <h1 className="text-3xl">
                {data?.getOneProyect?.proyect?.title}
              </h1>
              <button
                onClick={() => setOpenEdit(true)}
                className="p-2 ml-auto mr-3 font-medium text-white duration-300 ease-in-out transform bg-blue-600 rounded-md hover:bg-blue-700 ransition">
                Edit Project
              </button>
              <button
                onClick={() => setAddTaskOpen(true)}
                className="p-2 mr-6 font-medium text-white duration-300 ease-in-out transform bg-black rounded-md hover:bg-gray-900 ransition">
                Add Task
              </button>
            </div>
            <section className="text-gray-700 ">
              <div className="container items-center px-5 py-8 mx-auto">
                <div className="flex flex-wrap mb-12 text-left">
                  {/* maps the tasks array from the _getOneProyect_ query data */}
                  {data?.getOneProyect?.proyect?.tasks.length === 0 ? <p>No Tasks yet</p> : data?.getOneProyect?.proyect?.tasks?.map((task: any) => (
                    <div className="w-full mx-auto my-4 bg-gray-100 rounded-xl" key={task?.id}>
                      <div className="p-6">
                        <h1 className="mx-auto mb-4 text-2xl font-semibold leading-none tracking-tighter text-black lg:text-3xl"> {task?.title} </h1>
                        <h2 className="px-2 mb-4 text-2xl font-medium text-black">{task?.status}</h2>
                        <h2 className="mx-auto mb-2 font-medium leading-none tracking-tighter text-black text-md lg:text-2xl">Task Members</h2>
                        {/* maps the members array in each task */}
                        {task?.members?.length === 0 ? <p> No Members yet </p> : task?.members?.map((member: any) => (
                          <div className="flex flex-col transition duration-200 ease-in-out transform rounded-lg hover:bg-gray-300" key={member?.id}>
                            <div className="flex flex-row p-3">
                              <img src={member?.avatar} alt={member?.email} className="mt-1 border-2 border-black border-opacity-75 h-11 w-11 rounded-xl" />
                              <p className="px-3 pt-2 mt-1">{member?.email}</p>
                            </div>
                          </div>
                        ))}
                        <Link to={`/tasks/${task?.id}`}>
                          <button name={task?.id} className="w-full px-16 py-2 mt-4 font-medium text-white transition duration-500 ease-in-out transform bg-black border-black rounded-md text-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blueGray-900">View more</button>
                        </Link>
                        <button name={task?.id} onClick={handleDeleteTaskClick} className="w-full px-16 py-2 mt-4 font-medium text-white transition duration-500 ease-in-out transform bg-red-600 border-red-600 rounded-md text-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blueGray-900">Delete Task</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>
          <aside className="w-full p-2 md:col-span-3 md:pt-0">
            <h1 className="mb-2 font-medium lg:text-3xl">Project Members</h1>
            <div className="flex flex-col">
              {/* maps the proyectMembes aray from the _getOneProyect_ query data */}
              {data?.getOneProyect?.proyect?.members?.map((member: any) => (
                <div className="flex flex-row w-full my-3 transition duration-200 ease-in-out transform bg-gray-200 rounded-xl hover:bg-gray-300" key={member?.id}>
                  <div className="flex flex-col items-center p-3 mx-auto text-center">
                    <img src={member?.avatar} alt={`${member?.email}: ${member?.role}`} className="my-2 border-2 border-black border-opacity-75 rounded-xl h-9 w-9 lg:h-12 lg:w-12" />
                    <p className="">{member?.email}</p>
                  </div>
                </div>
              ))}
              <div className="flex flex-row w-full my-3">
                <div className="flex flex-col items-center p-3 mx-auto text-center">
                  <button
                    onClick={() => setOpen(true)}
                    className="transition duration-300 ease-in-out transform rounded-full focus:ring-2 ring-gray-400 ring-offset-gray-400 ring-offset-2 focus:outline-none focus:shadow-outline">
                    <PlusCircleIcon className="w-20 h-20 p-0 m-0 text-gray-300 transition duration-200 ease-in-out hover:text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <AddProyectMember
        open={open}
        setOpen={setOpen}
        handleInputChange={handleInputChange}
        handleAddProyectMemberClick={handleAddProyectMemberClick} />
      <EditProyectForm
        data={data}
        open={openEdit}
        handleInputChange={handleInputChange}
        handleEditClick={handleEditClick}
        setOpen={setOpenEdit} />
      <AddTaskForm
        open={addTaskOpen}
        setOpen={setAddTaskOpen}
        handleAddTaskClick={handleAddTaskClick}
        handleInputChange={handleInputChange} />
    </>
  );
}

export default OneProjects;
