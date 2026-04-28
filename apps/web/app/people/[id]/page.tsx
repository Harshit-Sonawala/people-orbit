"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useFetchPeopleSingle } from "@/hooks/useFetchPeopleSingle";
import Header1 from "@/components/Header1";
import Header2 from "@/components/Header2";
import Header3 from "@/components/Header3";
import Card from "@/components/Card";
import Divider from "@/components/Divider";
import Button from "@/components/Button";
import {
  PersonRounded,
  BadgeRounded,
  CakeRounded,
  WorkRounded,
  EmailRounded,
  PhoneRounded,
  ShortTextRounded,
  ConstructionRounded,
  LinkedIn,
  LanguageRounded,
  GitHub,
  ArrowBackRounded,
  ArrowForwardRounded,
} from "@mui/icons-material";
import Image from "next/image";
import profilePic from "@/public/dummy_profilePic.jpg";
import bgImage from "@/public/dummy_bgImage.jpg";

function PeopleDetails() {
  const { id } = useParams();
  const {
    data: peopleSingle,
    isLoading,
    isError,
    error,
  } = useFetchPeopleSingle(id as string);

  return (
    <div className="flex flex-col flex-1 items-stretch justify-center gap-4 w-[80%] mx-auto">
      {isLoading && (
        <p className="text-center py-8">Loading Person Details...</p>
      )}
      {isError && (
        <p className="text-center text-error py-8">Error: {error.message}</p>
      )}
      {peopleSingle && (
        <div className="flex flex-col items-stretch gap-4 justify-center">
          <Header2>Person Details</Header2>
          <div className="relative rounded-lg">
            <Image
              src={bgImage}
              alt="Background"
              className="bg-primary-light w-full h-72 rounded-lg object-cover"
            />
            <div className="absolute left-8 bottom-8 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center rounded-full bg-surface-top border-4 border-surface-top">
              <Image
                src={profilePic}
                alt={peopleSingle.firstName.charAt(0)}
                fill
                className="rounded-full object-cover"
              />
            </div>
          </div>
          <Card className="gap-8 p-6">
            <div className="flex flex-row items-center justify-between gap-4">
              <div className="flex flex-col gap-2">
                <Header1>
                  {peopleSingle.firstName} {peopleSingle.lastName}
                </Header1>
                <Header3 className="text-primary">
                  {peopleSingle.designation}
                </Header3>
              </div>

              <div className="flex flex-row items-center justify-between gap-4">
                {peopleSingle.socialLinks.linkedIn && (
                  <a
                    href={peopleSingle.socialLinks.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-surface-top hover:bg-primary-light transition-colors"
                  >
                    <LinkedIn className="text-primary" />
                  </a>
                )}
                {peopleSingle.socialLinks.website && (
                  <a
                    href={peopleSingle.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-surface-top hover:bg-primary-light transition-colors"
                  >
                    <LanguageRounded className="text-primary" />
                  </a>
                )}
                {peopleSingle.socialLinks.github && (
                  <a
                    href={peopleSingle.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-surface-top hover:bg-primary-light transition-colors"
                  >
                    <GitHub className="text-primary" />
                  </a>
                )}
              </div>
            </div>

            <Divider variant="surface-top"/>

            <div className="flex flex-col gap-2">
              <Header3>About Me</Header3>
              <p>{peopleSingle.bio}</p>
            </div>

            <div className="flex flex-col gap-2">
              <Header3>Skills</Header3>
              <div className="flex flex-row gap-4">
                {peopleSingle.skills &&
                  peopleSingle.skills.map((eachSkill, i) => (
                    <p key={i} className="bg-surface-top text-primary font-semibold rounded-full py-1 px-2">
                      {eachSkill}
                    </p>
                  ))}
              </div>
            </div>

            <div className="flex flex-row items-center justify-stretch gap-4">
              <div
                className="flex flex-col items-stretch justify-center w-full gap-2"
              >
                <Header3>Contact</Header3>
                <div className="flex flex-row items-center gap-2">
                  <EmailRounded />
                  <p>{`Email: ${peopleSingle.email}`}</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <PhoneRounded />
                  <p>{`Phone: ${peopleSingle.phone}`}</p>
                </div>
              </div>
            </div>
            <div
                className="flex flex-col items-stretch justify-center w-full gap-2"
              >
                <Header3>Other</Header3>
                {peopleSingle.age && (
                  <div className="flex flex-row items-center gap-2">
                    <CakeRounded />
                    <p>{`Age: ${peopleSingle.age}`}</p>
                  </div>
                )}
                <div className="flex flex-row items-center gap-2">
                  <PersonRounded />
                  <p>{`Member since ${new Date(
                    peopleSingle.createdOn,
                  ).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}`}</p>
                </ div>

                <div className="flex flex-row items-center gap-2">
                  <BadgeRounded />
                  <p>{`User ID: ${peopleSingle.id}`}</p>
                </ div>
              </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default PeopleDetails;

// "use client";
// import React from "react";
// import { useParams, useRouter } from "next/navigation";
// import { useFetchPerson } from "../../../hooks/useFetchPerson";
// import Image from "next/image";
// import Header1 from "../../../components/Header1";
// import Header2 from "../../../components/Header2";
// import Divider from "../../../components/Divider";
// import Card from "../../../components/Card";
// import Button from "../../../components/Button";
// import {
//   ArrowBackRounded,
//   WorkRounded,
//   EmailRounded,
//   PhoneRounded,
//   LinkedIn,
//   LanguageRounded,
//   GitHub,
//   CakeRounded,
// } from "@mui/icons-material";
// import profilePic from "../../../public/dummy_profilePic.jpg";
// import bgImage from "../../../public/dummy_bgImage.jpg";

// const PersonDetailsPage = () => {
//   const { id } = useParams();
//   const router = useRouter();
//   const { data: person, isLoading, isError, error } = useFetchPerson(id as string);

//   if (isLoading) return <div className="p-8 text-center">Loading details...</div>;
//   if (isError) return <div className="p-8 text-center text-error">Error: {error.message}</div>;
//   if (!person) return <div className="p-8 text-center">Person not found</div>;

//   return (
//     <div className="flex flex-col flex-1 items-stretch justify-start gap-6 w-[80%] mx-auto my-6">
//       <div className="flex flex-row items-center gap-4">
//         <Button variant="outlined-rounded" onClick={() => router.back()}>
//           <ArrowBackRounded />
//           Back
//         </Button>
//         <Header1>Person Profile</Header1>
//       </div>

//       <Card className="p-0 overflow-hidden">
//         <div className="relative w-full h-48 md:h-64">
//           <Image
//             src={bgImage}
//             alt="Background"
//             fill
//             className="bg-primary-light object-cover"
//           />
//         </div>

//         <div className="relative px-8 pb-8">
//           <div className="absolute -top-16 left-8 flex items-center justify-center w-32 h-32 rounded-full bg-surface border-4 border-surface-top overflow-hidden">
//             <Image
//               src={profilePic}
//               alt={person.firstName}
//               fill
//               className="object-cover"
//             />
//           </div>

//           <div className="pt-20 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
//             <div className="flex flex-col gap-1">
//               <Header1 className="text-3xl">
//                 {person.firstName} {person.lastName}
//               </Header1>
//               <div className="flex items-center gap-2 text-primary font-medium">
//                 <WorkRounded fontSize="small" />
//                 <span>{person.designation}</span>
//               </div>
//             </div>

//           <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="md:col-span-2 flex flex-col gap-6">
//               <section>
//                 <Header2>About</Header2>
//                 <Divider className="my-2" />
//                 <p className="text-foreground-muted leading-relaxed">
//                   {person.bio || "No bio provided."}
//                 </p>
//               </section>

//               {person.skills && person.skills.length > 0 && (
//                 <section>
//                   <Header2>Skills</Header2>
//                   <Divider className="my-2" />
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {person.skills.map((skill) => (
//                       <span key={skill} className="px-3 py-1 bg-primary-light text-primary text-sm rounded-full">
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </section>
//               )}
//             </div>

//             <div className="flex flex-col gap-6">
//               <section>
//                 <Header2>Contact Information</Header2>
//                 <Divider className="my-2" />
//                 <div className="flex flex-col gap-4 mt-3">
//                   <div className="flex items-center gap-3">
//                     <EmailRounded className="text-primary" />
//                     <span className="text-sm">{person.email}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <PhoneRounded className="text-primary" />
//                     <span className="text-sm">{person.phone}</span>
//                   </div>
//                   {person.age && (
//                     <div className="flex items-center gap-3">
//                       <CakeRounded className="text-primary" />
//                       <span className="text-sm">{person.age} years old</span>
//                     </div>
//                   )}
//                 </div>
//               </section>

//               <section>
//                 <Header2>Meta</Header2>
//                 <Divider className="my-2" />
//                 <p className="text-xs text-foreground-muted mt-2">
//                   Member since {new Date(person.createdOn).toLocaleDateString()}
//                 </p>
//                 <p className="text-xs text-foreground-muted">
//                   Record ID: {person.id}
//                 </p>
//               </section>
//             </div>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default PersonDetailsPage;
