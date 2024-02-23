import GoogleMap from "@/components/GoogleMap/GoogleMap";
import Information from "@/components/Information/Information";
import Layout from "@/components/Layout/Layout";
import LoginPage from "@/components/Login/LoginPage";
import PageHeader from "@/components/PageHeader/PageHeader";
import React from "react";

const Login = () => {
  return (
    <Layout pageTitle="Login">
      {/*<PageHeader title="Login" />*/}
      <LoginPage />
      <Information />
      {/*<GoogleMap />*/}
    </Layout>
  );
};

export default Login;
