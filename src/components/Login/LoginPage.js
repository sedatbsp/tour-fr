import loginPage from "@/data/loginPage";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useRouter } from 'next/router';
import { userService } from "src/services";
import Link from "next/link";

import { useSelector, useDispatch } from "react-redux";
import { login } from "../../store/actions/userAction"
import { toast } from 'react-toastify';

const { tagline, title, socials } = loginPage;

const inputs = ["username", "password"];

const LoginPage = () => {
  const currentUser = useSelector(state => state.user.userInit);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    // redirect to home if already logged in
    console.log(currentUser)
    if (Object.getOwnPropertyNames(currentUser).length !== 0) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fromData = new FormData(e.target);
    const data = {};
    inputs.forEach((input) => (data[input] = fromData.get(input)));

    try {
      const response = await userService.login(data.username, data.password);
      dispatch(login(response.data));
      const returnUrl = router.query.returnUrl || "/";
      router.push(returnUrl);
    } catch {
      toast.error("Kullanıcı Adı veya Şifre Hatalı")
      console.log("login error");
    }
  };

  return (
    <section className="contact-page">
      <Container>
        <Row>
          <Col xl={4} lg={5}>
            <div className="contact-page__left">
              <div className="section-title text-left">
                <span className="section-title__tagline">{tagline}</span>
                <h2 className="section-title__title">{title}</h2>
              </div>
              <div className="contact-page__social">
                {socials.map(({ id, icon, href }) => (
                  <a href={href} key={id}>
                    <i className={icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </Col>
          <Col xl={8} lg={7}>
            <div className="contact-page__right">
              <div className="comment-form">
                <form
                  onSubmit={(e) => handleSubmit(e)}
                  className="comment-one__form contact-form-validated"
                >
                  <Row>
                    <Row md={8}>
                      <div className="comment-form__input-box">
                        <input
                          type="text"
                          placeholder="username"
                          name="username"
                          required
                        />
                      </div>
                    </Row>
                    <Row xl={8}>
                      <div className="comment-form__input-box mt-2">
                        <input
                          type="password"
                          placeholder="password"
                          name="password"
                          required
                        />
                      </div>
                    </Row>
                  </Row>
                  <Row>
                    <Col md={12}>

                      <button
                        type="submit"
                        className="thm-btn comment-form__btn mt-2"
                      >
                        Sign in
                      </button>
                    </Col>
                  </Row>
                </form>
                <p className="mt-4" style={{ fontSize: "16px" }}>
                  Dont you have an account?
                  <Link href="/signup" className="pl-5"> Sign up</Link>
                </p>
                <div className="result"></div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default LoginPage;
