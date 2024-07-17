import React from "react";
import userPhoto from "./assets/images/user-photo.jpg";
import githubIcon from "./assets/icons/github-icon.svg";
import linkedinIcon from "./assets/icons/linkedin-icon.svg";
import twitterIcon from "./assets/icons/twitter-icon.svg";

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100">
      <div className="overflow-hidden mx-auto bg-white rounded-xl shadow-md">
        <div className="flex flex-row h-[66vh]">
          <div className="flex flex-col text-white bg-lime-700 grow">
            <div className="relative p-8 mb-8 grow-[3] w-[300px]">
              <div className="absolute bottom-0">
                <dl>
                  <dt className="font-semibold before:mr-2 before:content-email">
                    Email
                  </dt>
                  <dd>zac.patrick@mail.com</dd>
                  <dt className="mt-4 font-semibold before:mr-2 before:content-phone">
                    Phone
                  </dt>
                  <dd>(+33) 6 32 43 1290</dd>
                </dl>
              </div>
            </div>
            <div className="p-8 border-white border-solid grow border-t-[16px]">
              <p className="font-semibold">Find me on</p>
              <div className="flex flex-row gap-4 mt-2">
                <a
                  href="https://github.com/"
                  className="text-gray-600 hover:text-gray-900"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <img src={githubIcon} />
                </a>
                <a
                  href="https://linkedin.com/"
                  className="text-gray-600 hover:text-gray-900"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <img src={linkedinIcon} />
                </a>
                <a
                  href="https://x.com/"
                  className="text-gray-600 hover:text-gray-900"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <img src={twitterIcon} />
                </a>
              </div>
            </div>
          </div>
          <div className="relative w-[250px]">
            <div className="absolute z-10 w-[300px] h-[500px] left-[-70px] top-[40px]">
              <img
                src={userPhoto}
                width={805}
                height={1006}
                className="object-cover w-[300px] h-[500px]"
              />
            </div>
            <div className="absolute z-20 w-8 h-8 slate-gradation-animation top-[100px] left-[-90px]"></div>
            <div className="absolute z-20 w-8 h-8 slate-gradation-animation top-[70px] left-[210px]"></div>
            <div className="absolute z-20 w-8 h-8 slate-gradation-animation top-[520px] left-[100px]"></div>
            <div className="absolute w-12 h-12 rounded-full lime-gradation-animation top-[510px] left-[200px]"></div>
            <div className="absolute z-20 w-32 h-32 rounded-full lime-gradation-animation top-[-60px] left-[590px]"></div>
          </div>
          <div className="flex flex-col p-8 mt-12 grow-[3] w-[400px]">
            <h1 className="text-5xl font-medium leading-16">
              <span className="text-lime-700">ZAC</span>
              <br />
              PATRICK
            </h1>
            <div className="mt-8">
              <p className="font-bold">Front-end Developer • San Francisco</p>
              <p className="mt-4">
                High accomplishment and user-focused Front-end Developer adept
                in collaborating with UX and design teams to plan the technical
                writing and execution of functional specifications for websites
                and applications.
              </p>
            </div>
            <div className="mt-4">
              <p className="font-bold">Working with technologies:</p>
              <ul className="mt-4 leading-7 list-disc list-inside text-gray-600">
                <li>JavaScript</li>
                <li>React</li>
                <li>Node.js</li>
                <li>GraphQL</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
