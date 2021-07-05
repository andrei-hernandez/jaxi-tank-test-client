import { useMutation, useQuery } from '@apollo/client';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { format } from 'timeago.js';
import { ADD_TASK_MEMBER, GET_ONE_TASK, UPDATE_TASK } from '../../Queries';
import Navigation from '../Navigation';
import AddTaskMember from './AddTaskMember';
import EditTaskForm from './EditTaskForm';

const OneTask = () => {
  const [token] = useState(localStorage.getItem('token')); // store the token from the localStorage
  const [open, setOpen] = useState<boolean>(false); // manage the add task member modal form state
  const [editTaskOpen, setEditTaskOpen] = useState<boolean>(false); // // manage the edit task modal form state
  const { taskId }: any = useParams(); //gets the task id from the params in the pathname using useParams hook by react-router-dom
  const [email, setEmail] = useState<string | null>(''); // manage the email from the user input
  const [title, setTitle] = useState<string | null>(''); // manage the title from the user input
  const [desc, setDesc] = useState<string | null>(''); // manage the description from the user input
  const [startAt, setStartAt] = useState<string | null>(''); // manage the startAt date from the user input
  const [endsAt, setEndsAt] = useState<string | null>(''); // manage the endsAt date from the user input
  const [status, setStatus] = useState<string | null>('todo'); // manage the task status from the user input

  // apollo useQuery hook for get a single task
  const { data, refetch } = useQuery(GET_ONE_TASK, { variables: { token, taskId } });

  // event handler for each fiel in the forms and storing in the state
  const handleInputChange = ({ target }: any) => {
    const { value, name } = target;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'title') {
      setTitle(value);
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
    if (name === 'status') {
      value === '' ? setStatus('todo') : setStatus(value);
    }
  }

  // apollo useMutation hook for edit a task
  const [editTask] = useMutation(UPDATE_TASK, { onCompleted: (data: any) => checkEditTaskErrors(data) });

  // event handler for edit a task
  const handleEditTaskClick = async () => {
    await editTask({ variables: { token, taskId, title, description: desc, status, startAt, endsAt } });
  }

  // apollo useMutation hook to create a taskMember
  const [addTaskMember] = useMutation(ADD_TASK_MEMBER, { onCompleted: (data: any) => checkErrors(data) });

  // event handler for add a taskMembe
  const handleAddTaskMemberClick = async () => {
    await addTaskMember({ variables: { token, taskId, memberEmail: email } });
  }

  const checkErrors = async (data: any) => {
    if (data?.addTaskMember?.err || data.addTaskMember?.memberHasAdded === false) {
      toast.error(`${data?.addTaskMember?.err?.errorDesc}`, { duration: 2300, });
    } else if (data.addTaskMember?.memberHasAdded === true) {
      toast.success('Member Added');
      await refetch();
      setOpen(false);
    }
  }

  const checkEditTaskErrors = async (data: any) => {
    if (data?.editTask?.err || data.editTask?.taskHasUpdated === false) {
      toast.error(`${data?.editTask?.err?.errorDesc}`, { duration: 2300, });
    } else if (data.editTask?.taskHasUpdated === true) {
      toast.success('Task Updated');
      await refetch();
      setEditTaskOpen(false);
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
              <h1 className="ml-5 text-3xl">
                {data?.getOneTask?.task?.title}
              </h1>
              <button
                onClick={() => setEditTaskOpen(true)}
                className="p-2 ml-auto mr-6 font-medium text-white duration-300 ease-in-out transform bg-blue-600 rounded-md hover:bg-blue-700 ransition">
                Edit Task
              </button>
            </div>
            <section className="text-gray-700 ">
              <div className="container items-center px-5 py-8 mx-auto">
                <div className="flex flex-wrap mb-12 text-left">
                  <div className="w-full mx-auto my-4 bg-gray-100 rounded-xl" >
                    <div className="p-6">
                      <h2 className="p-2 mb-4 text-xl font-medium text-black">{data?.getOneTask?.task?.description}</h2>
                    </div>
                    <div className="px-4 py-2 ml-4">
                      <div className="text-xl p2">
                        Start At: {format(data?.getOneTask?.task?.startAt)}
                      </div>
                    </div>
                    <div className="px-4 pb-4 ml-4">
                      <div className="text-xl p2">
                        Ends At: {format(data?.getOneTask?.task?.endsAt)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <aside className="w-full p-2 md:col-span-3 md:pt-0">
            <h1 className="mb-2 font-medium lg:text-3xl">Task Members</h1>
            <div className="flex flex-col">
              {data?.getOneTask?.task?.members?.map((member: any) => (
                <div className="flex flex-row w-full my-3 transition duration-200 ease-in-out transform bg-gray-200 rounded-xl hover:bg-gray-300" key={member?.id}>
                  <div className="flex flex-col items-center p-3 mx-auto text-center">
                    <img src={member?.avatar} alt={member?.email} className="my-2 border-2 border-black border-opacity-75 rounded-xl h-9 w-9 lg:h-12 lg:w-12" />
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
      <AddTaskMember
        open={open}
        setOpen={setOpen}
        handleInputChange={handleInputChange}
        handleAddContactClick={handleAddTaskMemberClick}
      />
      <EditTaskForm
        data={data}
        open={editTaskOpen}
        handleEditTaskClick={handleEditTaskClick}
        handleInputChange={handleInputChange}
        setOpen={setEditTaskOpen}
      />
    </>
  );
}

export default OneTask;
