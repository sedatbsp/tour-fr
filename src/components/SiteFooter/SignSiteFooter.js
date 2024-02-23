import footerData from "@/data/footerData";
import Link from "next/link";
import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

const { logo, icons, companies, explore, social, year, author, about } =
  footerData;

const SiteFooter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData.get("email"));
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <Container>
        <div className="site-footer__top-inner">
          <Row>
            <Col xl={4} lg={6} md={6} className="animated fadeInUp">
                <div className="footer-widget__column footer-widget__about">
                  <div className="footer-widget__about-logo">
                    <Link href="/">
                      <a>
                        <Image src={logo.src} alt="" />
                      </a>
                    </Link>
                  </div>
                  <p className="footer-widget__about-text">{about}</p>
                  
                </div>
              </Col>
              <Col xl={8} lg={6} md={6} className="animated fadeInUp text-right">
              <ul className="footer-widget__about-contact list-unstyled">
                    {icons.map(({ id, icon, content, subHref }) => (
                      <li key={id}>
                        <div className="icon">
                          <i className={icon}></i>
                        </div>
                        <div className="text">
                          {subHref ? (
                            <a href={`${subHref}:${content}`}>{content}</a>
                          ) : (
                            <p>{content}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <div className="site-footer__bottom">
        <Container>
          <Row>
            <Col xs={12}>
              <div className="site-footer__bottom-inner">
                <div className="site-footer__bottom-left">
                  <div className="footer-widget__social">
                    {social.map(({ icon, link }, index) => (
                      <a href={link} key={index}>
                        <i className={`fab ${icon}`}></i>
                      </a>
                    ))}
                  </div>
                </div>
                <div className="site-footer__bottom-right">
                <p>
                    @ All Copyright {year}, <a href="https://odeontech.com/">{author}</a>
                </p>
                </div>
                <div className="site-footer__bottom-left-arrow">
                  <a href="#" className="scroll-to-target scroll-to-top">
                    <span className="icon-right-arrow"></span>
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default SiteFooter;
