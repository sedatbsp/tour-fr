import Information from "@/components/Information/Information";
import Layout from "@/components/Layout/Layout";
import SignUpPage from "@/components/SignUp/SignUpPage";
import React from "react";

const SignUp = () => {
  return (
    <Layout pageTitle="Sign Up">
      {/*<PageHeader title="Login" />*/}
      <SignUpPage/>
      <Information />
      {/*<GoogleMap />*/}
    </Layout>
  );
};

export default SignUp;
