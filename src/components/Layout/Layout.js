import Header from "@/components/Header/Header";
import Preloader from "@/components/Preloader/Preloader";
import { useRootContext } from "@/context/context";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import MobileMenu from "../MobileMenu/MobileMenu";
import PageHeader from "../PageHeader/PageHeader";
import Search from "../Search/Search";
import SiteFooter from "../SiteFooter/SiteFooter";
import SignSiteFooter from "../SiteFooter/SignSiteFooter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children, pageTitle }) => {
  const [loading, setLoading] = useState(true);
  const { menuStatus } = useRootContext();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{pageTitle} - Tour Guide</title>
      </Head>
      <Preloader loading={loading} />
      <main style={{ opacity: loading ? 0 : 1 }} className="page-wrapper">
        <Header pageTitle={pageTitle} />
        <ToastContainer
          position="bottom-right"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {children}
        {pageTitle == "Sign Up" || pageTitle == "Login" ? <SignSiteFooter /> : <SiteFooter />}
      </main>
      {menuStatus && <MobileMenu />}
      <Search />
    </>
  );
};

export default Layout;
