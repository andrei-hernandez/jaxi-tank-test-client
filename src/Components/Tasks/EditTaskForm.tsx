import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useRef } from 'react';

const EditTaskForm = (
  {
    data = {
      getOneTask: {
        task: {
          title: '',
          description: '',
          startAt: '',
          endsAt: '',
          status: ''
        }
      }
    },
    open = false,
    setOpen = (open: boolean) => { },
    handleEditTaskClick = () => { },
    handleInputChange = (e: any) => { }
  }
) => {
  // edit task modal form
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center max-w-screen sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="w-full px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div className="w-full sm:flex sm:items-start">
                  <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Edit Proyect
                    </Dialog.Title>
                    <div className="text-gray-700">
                      <div className="relative w-full mt-4">
                        <label htmlFor="name" className="text-base leading-7 text-black">Task Title</label>
                        <input
                          type="title"
                          id="proyectTitle"
                          name="title"
                          onChange={handleInputChange}
                          defaultValue={data?.getOneTask?.task?.title}
                          placeholder="Example: Awesome Title"
                          className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" />
                      </div>
                      <div className="relative w-full mt-4">
                        <label htmlFor="name" className="text-base leading-7 text-black">Task Description</label>
                        <textarea
                          name="desc"
                          id="desc"
                          onChange={handleInputChange}
                          defaultValue={data?.getOneTask?.task?.description}
                          cols={30}
                          rows={7} placeholder="Example: Awesome Description" className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"></textarea>
                      </div>
                      <div className="relative w-full mt-4">
                        <label htmlFor="name" className="text-base leading-7 text-black">Task Status</label>
                        <select
                          name="status"
                          onChange={handleInputChange}
                          id="status" className="px-1 mx-3"
                          defaultValue={data?.getOneTask?.task?.status}>
                          <option value="todo">To-Do</option>
                          <option value="doing">Doing</option>
                          <option value="done">Done</option>
                        </select>
                      </div>
                    </div>
                    <div className="text-gray-700">
                      <div className="relative w-full mt-4">
                        <label htmlFor="name" className="text-base leading-7 text-black">Start At</label>
                        <input
                          onChange={handleInputChange}
                          type="date"
                          id="startAt"
                          name="startAt"
                          defaultValue={data?.getOneTask?.task?.startAt}
                          className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" />
                      </div>
                    </div>
                    <div className="text-gray-700">
                      <div className="relative w-full mt-4">
                        <label htmlFor="name" className="text-base leading-7 text-black">Ends At</label>
                        <input
                          onChange={handleInputChange}
                          type="date"
                          id="endsAt"
                          name="endsAt"
                          defaultValue={data?.getOneTask?.task?.endsAt}
                          className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={handleEditTaskClick}
                    className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-gray-800 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Edit Proyect
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default EditTaskForm;
