import React from 'react';

const SignUpForm = ({ handleInputChange = (e: any) => { }, handleSubmit = (e: any) => { } }) => {
  return (
    <section className="flex flex-col items-center h-screen md:flex-row">
      <div className="relative hidden w-full h-screen bg-blueGray-400 lg:block md:w-1/3 xl:w-1/3">
        <img src="https://dummyimage.com/300x600/F3F4F7/000000" alt="" className="absolute object-cover w-full h-full" />
      </div>
      <div className="flex w-full h-screen px-6 bg-whitelack md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12 items-left justify-left">
        <div className="inline-block w-full py-32 align-middle lg:py-6 lg:h-100">
          <h1 className="my-12 font-black tracking-tighter text-black 2xl sm:text-5xl title-font">Sign Up.</h1>
          <form className="mt-6" action="#" method="POST">
            <div>
              <label className="text-base font-medium leading-relaxed text-blueGray-700">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 text-base text-gray-700 bg-gray-100 border-transparent rounded-lg bg-blueGray-100 ext-blue-700 focus:border-gray-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-700 ring-offset-gray-700 ring-offset-2" autoComplete="email" required />
            </div>
            <div className="mt-4">
              <label className="text-base font-medium leading-relaxed text-blueGray-700">User Name</label>
              <input
                type="username"
                name="userName"
                id="userName"
                minLength={6}
                placeholder="Your User Name"
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 text-base text-gray-700 bg-gray-100 border-transparent rounded-lg ext-blue-700 focus:border-gray-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-700 ring-offset-gray-700 ring-offset-2" required />
            </div>
            <div className="mt-4">
              <label className="text-base font-medium leading-relaxed text-blueGray-700">Avatar URL</label>
              <input
                type="url"
                name="avatar"
                id="avatar"
                onChange={handleInputChange}
                placeholder="https://someavatar.com"
                className="w-full px-4 py-2 mt-2 text-base text-gray-700 bg-gray-100 border-transparent rounded-lg ext-blue-700 focus:border-gray-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-700 ring-offset-gray-700 ring-offset-2" />
            </div>
            <div className="mt-4">
              <label className="text-base font-medium leading-relaxed text-blueGray-700">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                onChange={handleInputChange}
                placeholder="Your Password"
                className="w-full px-4 py-2 mt-2 text-base text-gray-700 bg-gray-100 border-transparent rounded-lg ext-blue-700 focus:border-gray-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-700 ring-offset-gray-700 ring-offset-2" required />
            </div>
            <button type="submit" onClick={handleSubmit} className="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg bg-gradient-to-r from-black hover:from-black to-black focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-700 ring-offset-gray-700 ring-offset-2 hover:to-black">Log In</button>
          </form>
          <p className="mt-8 text-center">Need an account? <a href="/" className="font-semibold text-blue-500 hover:text-blue-400">Sign In</a></p>
        </div>
      </div>
    </section >
  );
}

export default SignUpForm;
