import { GetStaticProps } from "next";
import prisma from "../../lib/prisma";
import { useEffect, useState } from "react";
import { Button, Loader, ScrollArea, Text } from "@mantine/core";
import SuperJSON from "superjson";
import { EducationInfo, Orphan, User } from "@prisma/client";
import { useRouter } from "next/router";
import { serverLink } from "../../shared/links";
import { IconPlus } from "@tabler/icons-react";
//import EducationTable from "../../../components/education/EducationTable";

// * get orphans from database and pass the result as props to Index page.
export const getStaticProps: GetStaticProps = async () => {
  const educationInfo = await prisma.educationInfo.findMany({
    include: { User: true, Orphan: true },
    orderBy: { id: "asc" },
  });
  const orphans = await prisma.orphan.findMany();
  console.log(orphans);
  const stringJson = SuperJSON.stringify({ educationInfo, orphans });

  return { props: { stringJson } };
};

interface Props {
  stringJson: string;
}

function EducationTableNew  ({ stringJson }: Props)  {
    // const [cardInfo, setCardInfo] = useState<orphanWithGuardianAndSponsorshipInfo>(orphans[0]);
  // const updateTable = (orphan: EducationInfo) => setCardInfo(orphan);
  console.log("Education Index");
  const { orphans, educationInfo } = SuperJSON.parse<{
    educationInfo: (EducationInfo & { User: User; Orphan: Orphan })[];
    orphans: Orphan[];
  }>(stringJson);
  console.log(orphans, educationInfo);
  const [hydration, setHydration] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setHydration(true);
  }, [hydration, stringJson]);

  const [orphanId, setOrphanId] = useState<number>();
  const [eductionId, setEductionId] = useState<number>();

  if (!hydration || !educationInfo) return <Loader size={100} />;
  return (
    <>
     <div
        style={{height: "750px" }}
        className=" flex-grow w-full max-w-7xl mx-auto lg:flex shadow-lg rounded-lg lg:max-w-7xl md:max-w-md "
      >
        <div className=" flex-1 min-w-0 bg-white xl:flex mb-10 ">
          <div className=" border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-gray-50">
            <div className=" h-full w-72 pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
              <div className=" h-full relative">
                <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 shadow-md hover:border-gray-200 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gray-500 mb-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-full"
                      src="https://avatars.githubusercontent.com/u/123456789?v=4"
                    />
                  </div>
                  <div className="flex-1 min-w-0 ">
                    <span className="absolute inset-0" />
                    <p className="text-sm font-bold text-blue-600">
                      حمود العطاس
                    </p>
                    <p className="text-sm text-gray-500 truncate">12</p>
                  </div>
                </div>
                {/* sreach bar */}
                <div className="mb-4 ">
                  <div className="relative ">
                    <div className=" absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-700"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      name="search"
                      className=" focus:ring-red-500 shadow-md focus:border-red-500 block w-full pl-10 sm:text-sm  rounded-full p-2 border"
                    />
                  </div>
                </div>

                {/* user 1 */}
                <div
                  style={{ height: "525px" }}
                  className=" mt-10 block rounded-lg px-1 py-2 w-full max-h-full md:w-54  items-center pl-3 hover:border-gray-400 focus-within:ring-2 mb-3  shadow-md overflow-y-auto"
                >
                  {orphans.map((orphan) => (
                    <div
                      className="relative w-60  rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 hover:bg-gray-200 shadow-md cursor-pointer"
                      onClick={() => {
                        setOrphanId(orphan.id);
                        console.log(orphanId);
                      }}
                      key={orphan.id}
                    >
                      <div className=" flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://avatars.githubusercontent.com/u/123456789?v=4"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <a className=" focus:outline-none">
                          <div className="flex items-center justify-between">
                            <p className=" text-sm  font-bold text-blue-600">
                              {orphan.name}
                            </p>
                            <div className=" text-gray-400 text-xs">Token</div>
                          </div>
                          {/* <div className="flex items-center justify-between">
                                                            <p className=" text-sm text-gray-500 truncate">{orphan.age}</p>
                                                            <div className=" text-white text-xs bg-red-400 rounded-full px-1 py-0">2</div>
                                                </div> */}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* <EducationTable education={educationInfo} /> */}

            
          </div>

          {/* the second column */}

          <div
            style={{ height: "725px" }}
            className="ml-10 mt-10 relative w-96 pl-3 px-2 items-center rounded-md shadow-md max-h-full overflow-y-auto "
          >
            <div className="mb-4 ">
              <div className="relative ">
                <div className=" absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  name="search"
                  className=" focus:ring-red-500 shadow-md focus:border-red-500 block w-full pl-10 sm:text-sm  rounded-full p-2 border"
                />
              </div>
            </div>
            {educationInfo
              .filter((x) => x.Orphan.id === orphanId)
              .map((education) => (
                <div
                  className="relative w-52 rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 hover:bg-gray-200 shadow-md cursor-pointer"
                  onClick={() => {
                    setEductionId(education.id);
                    console.log(orphanId);
                  }}
                  key={education.id}
                >
                  <p className="justify-center font-bold text-blue-600">
                    {education.date.toDateString()}
                  </p>
                </div>
              ))}
          </div>

          {/* the last column */}
         
          
            

            {
              <div  
              className=" bg-white w-full px-6 pt-2 pb-2 rounded-xl  transform hover:scale-105 transition duration-500 ">
                {educationInfo
                  .filter((x) => x.id === eductionId)
                  .map((education) => (
                    <div
                      className=" list-none min-h-fit py-2 p-1 text-center"
                      // onClick={() => updateTable(education)}
                      key={education.id}
                    >
                      
                      <h3 className="mb-3 text-xl font-bold text-indigo-600">
                        {education.date.toDateString()}
                      </h3>
                      <div className="relative">
                        <img
                          className="w-44 justify-center rounded-xl hover:bg-slate-200 cursor-pointer"
                          src="https://images.unsplash.com/photo-1561835491-ed2567d96913?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
                          alt="Colors"
                        />
                     
                     </div>
                      <div className="mt-2 text-gray-800  font-bold cursor-pointer">
                        الإضافة بواسطة:
                        <p> {education.User.name}</p>
                      </div>

                      <div>
                        <div className="my-4">
                        <div className="flex space-x-1 items-center">
                        <h3>ملاحظة:</h3>
                          <p>{education.note}</p>
                          </div>
                          <div className="flex space-x-1 items-center">
                          <h3>السنة الدراسية:</h3>
                          <p>{education.schoolYear}</p>
                          </div>

                          <div className="flex space-x-1 items-center">
                            <h3>كشف الدرجات:</h3>
                            <p>{education.scoreSheet}</p>
                          </div>
                          <div className="flex space-x-1 items-center">
                            <h3>المدرسة:</h3>
                            <p>{education.Orphan.schoolName}</p>
                          </div>
                          <div className="flex space-x-1 items-center">
                            <h3>الدرجة:</h3>
                            <p> {education.degree}</p>
                          </div>
                          
                        </div>
                        
                      </div>
                    </div>
                  ))}
              </div>
            }
          



        </div>
      </div>

      <div className=" ml-20 text-left">
        <Button
          size="xl"
          className=""
          m={15}
          onClick={() => router.push(`${serverLink}education/create`)}
        >
          <IconPlus />
          Add new Education info
        </Button>
      </div>   
    </>
  )
}

export default EducationTableNew