import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { GET_TASKS_FROM_USER } from '../../Queries';

const AllTasks = () => {

  const [token] = useState<string | any>(localStorage.getItem('token')); // gets the token from the localStorage

  // apollo useQuery hook for get all the tasks from the user 
  const { data } = useQuery(GET_TASKS_FROM_USER, { variables: { token } });

  return (
    <>
      <section className="text-gray-700 ">
        <div className="container items-center px-5 py-8 mx-auto lg:px-16">
          <div className="flex flex-wrap mb-12 text-left">
            {/* maps the tasks array from the _getTasksFomUser_ query */}
            {data?.getTasksFromUser?.tasks.map((task: any) => (
              <div className="w-full p-6 mx-auto lg:w-96" key={task.id}>
                <div className="p-4 transition ease-in-out transform bg-gray-100 lg:p-8 rounded-xl duration-400 hover:bg-gray-200">
                  <h1 className="mx-auto mb-6 text-2xl font-semibold leading-none tracking-tighter text-black title-font">{task?.title}</h1>
                  <h1 className="mx-auto mb-6 font-medium leading-none tracking-tighter text-black text-xg title-font">
                    <ul>
                      <p className="text-lg">task Members</p>
                      {
                        //maps the members array in each task
                        task?.members?.map((member: any) => (
                          <li className="pl-3 mt-2 text-gray-700 text-md" key={member?.email}>{member?.email}</li>
                        ))
                      }
                    </ul>
                  </h1>
                  <p className="mx-auto text-sm font-medium leading-relaxed text-gray-700 ">Creator: {task?.creator?.email}</p>
                  <p className="mx-auto text-sm font-medium leading-relaxed text-gray-700 ">Start At: {format(task?.startAt)}</p>
                  <p className="mx-auto text-sm font-medium leading-relaxed text-gray-700 ">Ends At: {format(task?.endsAt)}</p>
                  <Link to={`/tasks/${task?.id}`}>
                    <button name={task?.id} className="w-full px-16 py-2 mt-4 font-medium text-white transition duration-500 ease-in-out transform bg-black border-black rounded-md text-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blueGray-900">View Task</button>
                  </Link>
                  <Link to={`/projects/${task?.proyectId}`}>
                    <button name={task?.proyectId} className="w-full px-16 py-2 mt-4 font-medium text-white transition duration-500 ease-in-out transform bg-blue-600 border-blue-600 rounded-md text-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blue-700">View Project</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section >
    </>
  );
}

export default AllTasks;
