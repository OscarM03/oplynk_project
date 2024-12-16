import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      {children}
    </section>
  );
};

export default layout;
