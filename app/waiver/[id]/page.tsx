"use client";

import { userAcceptWaiver } from "@/app/actions";
import { openSans, poppinsHeavy } from "@/fonts";
import { useState } from "react";

export default function Waiver({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const acceptWaiver = async () => {
    const id = (await params).id;
    const res = await userAcceptWaiver(parseInt(id));
    if (res) {
    }
  };
  return (
    <div className="mt-2 mx-4">
      <div className={`text-3xl text-blue-800 mb-4 ${poppinsHeavy.className}`}>
        Liability Waiver
      </div>
      <div className={openSans.className}>
        {`As a participant in Bull City Run Club (the event), 
        I do hereby waive and forever release any and all rights and claims for damages
        or injuries that I may have against the Bull City Running Company LLC and all of their
        agents assisting with the event, sponsors and their representatives, volunteers and
        employees for any and all injuries to me or my personal property. This release includes
        all injuries and/or damages suffered by me before, during, or after participating in the event.
        I recognize, intend and understand that this release is binding on my heirs, executors,
        administrators, or assignees. I know that running and walking is a potentially
        hazardous activity. I should not participate unless I am medically able to do so and
        properly trained. I assume all risks associated with walking and  running in this
        event including, but not limited to: falls, contact with other participants, the
        effects of weather, traffic, and route conditions, man-made and natural hazards,
        and I waive any and all claims which I might have based on any of those and other
        risks typically found in walking or running on roads, sidewalks, and trails.
        I acknowledge all such risks and they are known and understood by me.`}
      </div>
      <button
        onClick={acceptWaiver}
        className="bg-blue-800 hover:bg-blue-950 text-white font-bold py-6 w-full rounded mt-8"
      >
        Accept Conditions
      </button>
      {errorMessage && <span className="text-red-500">{errorMessage}</span>}
    </div>
  );
}
