import React from "react";

export default function GenericCardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  );
}
