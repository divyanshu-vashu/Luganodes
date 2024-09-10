import React from "react";

const Home = () => {
  return <></>;
};

export default Home;

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/transactions",
    },
  };
};
