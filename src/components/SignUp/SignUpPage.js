import signUpPage from "@/data/signUpPage";
import Link from "next/link";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AuthenticationService from "src/services/AuthenticationService";
import { useRouter } from 'next/router'

const { tagline, title, socials } = signUpPage;

const inputs = ["firstName", "lastName", "email", "username", "password"];

const SignUpPage = () => {

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const fromData = new FormData(e.target);
    const data = {};
    inputs.forEach((input) => (data[input] = fromData.get(input)));

    setSubmitted(true);

    if (!data.firstName || !data.lastName || !data.email || !data.username || !data.password) {
      return;
    }
    setLoading(true);

    AuthenticationService.register(data).then(() => {
      router.push("/login")
    }).catch((error) => {
      console.log(error);
      if (error?.response?.status === 409) {
        setErrorMessage('username or password is not valid');
      } else {
        setErrorMessage('Oops! Unexpected error occurred. We are working to fix the error.')
      }
      setLoading(false);
    });


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
                {errorMessage &&
                  <div className="alert alert-dark" role="alert" style={{fontSize:12, color:"#000000", fontWeight:"bold"}}>
                    {errorMessage}
                  </div>
                }
                <form
                  onSubmit={handleSubmit}
                  //className="comment-one__form contact-form-validated"
                  className={submitted ? 'was-validated' : ''}
                  noValidate
                >
                  <Row>
                    <Row md={8}>
                      <div className="comment-form__input-box">
                        <input
                          type="text"
                          placeholder="First name"
                          name="firstName"
                          maxLength={50}
                          required
                        />
                        <div className="invalid-feedback">
                          Full name is required
                        </div>
                      </div>
                    </Row>
                    <Row xl={8}>
                      <div className="comment-form__input-box">
                        <input
                          type="text"
                          placeholder="Last name"
                          name="lastName"
                          maxLength={50}
                          required
                        />
                        <div className="invalid-feedback">
                          Last name is required
                        </div>
                      </div>
                    </Row>
                    <Row xl={8}>
                      <div className="comment-form__input-box">
                        <input
                          type="email"
                          placeholder="E-mail"
                          name="email"
                          maxLength={32}
                          required
                        />
                        <div className="invalid-feedback">
                          Email is required
                        </div>
                      </div>
                    </Row>
                    <Row xl={8}>
                      <div className="comment-form__input-box">
                        <input
                          type="text"
                          placeholder="Username"
                          name="username"
                          maxLength={32}
                          required
                        />
                        <div className="invalid-feedback">
                          Username is required
                        </div>
                      </div>
                    </Row>
                    <Row xl={8}>
                      <div className="comment-form__input-box">
                        <input
                          type="password"
                          placeholder="Password"
                          name="password"
                          maxLength={128}
                          required
                        />
                        <div className="invalid-feedback">
                          Password is required
                        </div>
                      </div>
                    </Row>
                  </Row>
                  <Row>
                    <Col md={12} className="mt-3" >

                      <button
                        type="submit"
                        className="thm-btn comment-form__btn"
                        disabled={loading}
                      >
                        Sign up
                      </button>
                    </Col>
                  </Row>
                </form>
                <p className="mt-2" style={{ fontSize: 13 }}>
                  Do you have an account? 
                  <Link href={"/login"} className="pl-5">Sign in</Link>
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

export default SignUpPage;
