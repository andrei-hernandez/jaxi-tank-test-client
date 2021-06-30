import { Link } from 'react-router-dom';
import Navigation from '../Navigation';

const Content = (): JSX.Element => {

  return (
    <>
      <Navigation />
      <section className="mt-16 text-blueGray-700">
        <div className="container items-center px-5 py-8 mx-auto lg:px-24">
          <div className="flex flex-wrap mb-12 text-left">
            <div className="w-full p-4 mx-auto lg:w-1/3">
              <div className="p-4 transition ease-in-out bg-gray-100 lg:p-8 rounded-xl hover:bg-gray-200 duration-400">
                <h1 className="mx-auto mb-8 text-2xl font-semibold leading-none tracking-tighter text-black lg:text-3xl title-font"> Projects </h1>
                <p className="mx-auto text-base font-medium leading-relaxed text-blueGray-700 ">Manage your projects for a better work managment and control of your priorities.</p>
                <Link to="/projects">
                  <button className="w-full px-16 py-2 mt-4 text-base font-medium text-white transition duration-500 ease-in-out transform bg-black border-black rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blueGray-900 "> Go to projects </button>
                </Link>
              </div>
            </div>
            <div className="w-full p-4 mx-auto lg:w-1/3">
              <div className="p-4 transition ease-in-out bg-gray-100 lg:p-8 rounded-xl hover:bg-gray-200 duration-400">
                <h1 className="mx-auto mb-8 text-2xl font-semibold leading-none tracking-tighter text-black lg:text-3xl title-font"> Tasks </h1>
                <p className="mx-auto text-base font-medium leading-relaxed text-blueGray-700 ">Access your tasks no matter what project you are in. And work better.</p>
                <Link to="/tasks">
                  <button className="w-full px-16 py-2 mt-4 text-base font-medium text-white transition duration-500 ease-in-out transform bg-black border-black rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blueGray-900 "> Go to tasks </button>
                </Link>
              </div>
            </div>
            <div className="w-full p-4 mx-auto lg:w-1/3">
              <div className="p-4 transition ease-in-out bg-gray-100 lg:p-8 rounded-xl hover:bg-gray-200 duration-400">
                <h1 className="mx-auto mb-8 text-2xl font-semibold leading-none tracking-tighter text-black lg:text-3xl title-font"> Contacts </h1>
                <p className="mx-auto text-base font-medium leading-relaxed text-blueGray-700 ">Did you like someone? Add it to your contacts. And keep in touch.</p>
                <Link to="/contacts">
                  <button className="w-full px-16 py-2 mt-4 text-base font-medium text-white transition duration-500 ease-in-out transform bg-black border-black rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blueGray-900 "> Go to contacts </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Content;
