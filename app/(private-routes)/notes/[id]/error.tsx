"use client";

const Error = ({ error }: { error: Error }) => {
  return (
    <div>
      <p>Could not fetch the list of notes. {error.message}</p>
    </div>
  );
};

export default Error;
