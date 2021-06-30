import { useQuery } from '@apollo/client';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { GET_PROYECTS } from '../../Queries';

const AllProjects = () => {

  const [token] = useState<string | null>(localStorage.getItem('token'));

  const { data, refetch } = useQuery(GET_PROYECTS,
    {
      variables: { token }
    }
  );

  return (
    <section className="text-gray-700 ">
      <div className="container items-center px-5 py-8 mx-auto lg:px-16">
        <div className="flex flex-wrap mb-12 text-left">
          {data?.getProyects?.proyects.map((proyect: any) => (
            <div className="w-full p-6 mx-auto lg:w-96" key={proyect.id}>
              <div className="p-4 transition ease-in-out transform bg-gray-100 lg:p-8 rounded-xl duration-400 hover:bg-gray-200">
                <h1 className="mx-auto mb-6 text-2xl font-semibold leading-none tracking-tighter text-black title-font">{proyect?.title}</h1>
                <h1 className="mx-auto mb-6 font-medium leading-none tracking-tighter text-black text-xg title-font">
                  {
                    proyect?.tasks?.length === 0 ? <p>No taks yet</p> : <ul>
                      <p className="text-lg">Tasks</p>
                      {
                        proyect?.tasks?.map((task: any) => (
                          <li className="pl-3 mt-1 text-gray-700 text-md" key={task?.id}>{task?.title}</li>
                        ))
                      }
                    </ul>
                  }
                </h1>
                <h1 className="mx-auto mb-6 font-medium leading-none tracking-tighter text-black text-xg title-font">
                  <ul>
                    <p className="text-lg">Members</p>
                    {
                      proyect?.members?.map((member: any) => (
                        <li className="pl-3 mt-2 text-gray-700 text-md" key={member?.email}>{member?.email}</li>
                      ))
                    }
                  </ul>
                </h1>
                <p className="mx-auto text-sm font-medium leading-relaxed text-gray-700 ">Creator: {proyect?.creator?.email}</p>
                <p className="mx-auto text-sm font-medium leading-relaxed text-gray-700 ">Start At: {proyect?.startAt}</p>
                <p className="mx-auto text-sm font-medium leading-relaxed text-gray-700 ">Ends At: {proyect?.endsAt}</p>
                <button className="w-full px-16 py-2 mt-4 font-medium text-white transition duration-500 ease-in-out transform bg-black border-black rounded-md text-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blueGray-900">View more</button>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-center w-full p-4 mx-auto lg:w-1/3">
            <div className="items-center justify-center">
              <button
                className="transition duration-300 ease-in-out transform rounded-full focus:ring-2 ring-gray-400 ring-offset-gray-400 ring-offset-2 focus:outline-none focus:shadow-outline">
                <PlusCircleIcon className="p-0 m-0 text-gray-300 transition duration-200 ease-in-out hover:text-gray-400 w-44 h-44" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}

export default AllProjects;