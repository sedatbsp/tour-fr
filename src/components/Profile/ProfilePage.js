import profilePage from "@/data/profilePage";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AuthenticationService from "src/services/AuthenticationService";
import { useRouter } from 'next/router'
import { userService } from "src/services";

const { tagline, title, socials } = profilePage;

const inputs = ["firstName", "lastName", "email", "username", "password"];

const ProfilePage = (props) => {

    const { user, setUser } = props;
    //console.log(user)
    const [data, setData] = useState(user);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const router = useRouter();

    useEffect(() => {
        setUser(data);
    }, [data])

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

        AuthenticationService.update(data).then(() => {
            router.push("/")
        }).catch((error) => {
            console.log(error);
            if (error?.response?.status === 409) {
                setErrorMessage('Error.');
            } else {
                setErrorMessage('Oops! Unexpected error occurred. We are working to fix the error.')
            }
            setLoading(false);
        });


    };

    const onAreaChange = (event) => {
        const { id, value } = event.target;
        setData((prevData) => ({ ...prevData, [id]: value }));
    }

    return (
        <section className="contact-page">{
            console.log(user)}
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
                                    <div className="alert alert-dark" role="alert" style={{ fontSize: 12, color: "#000000", fontWeight: "bold" }}>
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
                                                    id="firstName"
                                                    type="text"
                                                    placeholder="First name"
                                                    name="firstName"
                                                    //value={data.firstName}
                                                    onChange={onAreaChange}
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
                                                    id="lastName"
                                                    type="text"
                                                    placeholder="Last name"
                                                    name="lastName"
                                                    //value={data.lastName}
                                                    onChange={onAreaChange}
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
                                                    id="email"
                                                    type="email"
                                                    placeholder="E-mail"
                                                    name="email"
                                                    //value={data.email}
                                                    onChange={onAreaChange}
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
                                                    id="username"
                                                    type="text"
                                                    placeholder="Username"
                                                    name="username"
                                                    //value={data.username}
                                                    onChange={onAreaChange}
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
                                                    id="password"
                                                    type="password"
                                                    placeholder="Password"
                                                    name="password"
                                                    onChange={onAreaChange}
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
                                                Update
                                            </button>
                                        </Col>
                                    </Row>
                                </form>
                                <p className="mt-2" style={{ fontSize: 13 }}>
                                    Do you have an account?
                                    <Link href="/login" className="pl-5">Sign in</Link>
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

export default ProfilePage;
