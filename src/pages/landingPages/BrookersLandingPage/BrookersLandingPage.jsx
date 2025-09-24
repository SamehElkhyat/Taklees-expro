import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetDataApi } from "../../../store/Slice/GetDataApiReducer";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const [State, setState] = useState({});
  const [userProfile, setuserProfile] = useState(null);
  const dispatch = useDispatch();
  const navigationToLandingpage = async () => {
    let { payload } = await dispatch(GetDataApi());
    setuserProfile(payload);
  };

  const GetState = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Number-Of-Operations-Broker`,
        {
          withCredentials: true,
        }
      );
      setState(data);
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ ما");
    }
  };

  useEffect(() => {
    GetState();
    navigationToLandingpage();
  }, []);

  return (
    <Container className="p-3 sm:p-4 md:p-5 text-center">
      {userProfile !== null && userProfile !== undefined ? (
        <>
          {userProfile.role === "Broker" ||
          userProfile.role === "Admin" ||
          userProfile.role === "Manager" ? (
            <>
              <h1 className="m-3 font-bold text-[var(--secondColor--)] text-end text-lg sm:text-xl md:text-2xl mt-3 sm:mt-5 px-2">
                مرحبا بك في لوحه التحكم{" "}
              </h1>

              <Row className="flex flex-col lg:flex-row justify-center w-full gap-4">
                <div className="first-col-use flex flex-col justify-start w-full lg:w-[30%]">
                  <div className="box">
                    <Col className="">
                      <Link
                        className="text-decoration-none"
                        to="/availableOrders"
                      >
                        <Card className="text-center mb-3 p-3 shadow-lg">
                          <Card.Body>
                            <div className="position-absolute">
                              <p
                                style={{
                                  fontSize: "clamp(18px, 4vw, 24px)",
                                  fontWeight: "900",
                                  color: "#000",
                                  textAlign: "center",
                                  letterSpacing: "1px",
                                }}
                                className="text-start"
                              >
                                طلب {State.numberOfAllOrders}
                              </p>
                            </div>

                            <div className="text-end">
                              <i className="p-2 text-end w-full fa-solid fa-code-pull-request text-[var(--maincolor--)] text-[clamp(24px, 5vw, 30px)]"></i>
                              <h5 className="card-title font-bold text-base sm:text-lg md:text-xl">
                                العروض المتاحة
                              </h5>
                              <p className="card-text text-right mt-2 text-sm sm:text-base">
                                عرض الطلبات المتاحة
                              </p>
                            </div>
                          </Card.Body>
                        </Card>
                      </Link>
                    </Col>
                  </div>
                  <div className="box">
                    <Col className="">
                      <Link
                        className="text-decoration-none"
                        to="/currentoffers"
                      >
                        <Card className="text-center mb-3 p-3 shadow-lg">
                          <Card.Body>
                            <div className="position-absolute">
                              <p
                                style={{
                                  fontSize: "clamp(18px, 4vw, 24px)",
                                  fontWeight: "900",
                                  color: "#000",
                                  textAlign: "center",
                                  letterSpacing: "1px",
                                }}
                                className="text-start"
                              >
                                طلب {State.currentOrders}
                              </p>
                            </div>

                            <div className="text-end">
                              <i className="fa-solid fa-paper-plane text-[clamp(24px, 5vw, 30px)] p-2 text-[orange]"></i>
                              <h5 className="card-title font-bold text-base sm:text-lg md:text-xl">
                                العروض الجاريه
                              </h5>
                              <p className="card-text text-right mt-2 text-sm sm:text-base">
                                عرض الطلبات الجارية
                              </p>
                            </div>
                          </Card.Body>
                        </Card>
                      </Link>
                    </Col>
                  </div>

                  <div className="box">
                    <Col className="">
                      <Link
                        className="text-decoration-none"
                        to="/HistoryOfOrders"
                      >
                        <Card className="text-center mb-3 p-3 shadow-lg">
                          <Card.Body className="text-end">
                            <i className="fa-solid fa-clock-rotate-left text-[clamp(24px, 5vw, 30px)] p-2 text-[#9333EA]"></i>
                            <h5 className="card-title font-bold text-base sm:text-lg md:text-xl">
                              سجل العروض
                            </h5>
                            <p className="card-text text-right mt-2 text-sm sm:text-base">
                              عرض سجل العروض
                            </p>
                          </Card.Body>
                        </Card>
                      </Link>
                    </Col>
                  </div>
                </div>

                <div className="second-col-usr flex flex-col justify-end w-full lg:w-[30%]">
                  <div className="box">
                    <Col className="">
                      <Link
                        className="text-decoration-none"
                        to="/TransferOrders"
                      >
                        <Card className="text-center mb-3 p-3 shadow-lg">
                          <Card.Body>
                            <div className="position-absolute">
                              <p
                                style={{
                                  fontSize: "clamp(18px, 4vw, 24px)",
                                  fontWeight: "900",
                                  color: "#000",
                                  textAlign: "center",
                                  letterSpacing: "1px",
                                }}
                                className="text-start"
                              >
                                طلب {State.customerServiceOrders}
                              </p>
                            </div>

                            <div className="text-end">
                              <i className="text-[var(--succsses--)] fa-solid fa-triangle-exclamation text-[clamp(24px, 5vw, 30px)] p-2"></i>
                              <h5 className="font-bold text-base sm:text-lg md:text-xl">
                                المحول من خدمه العملاء
                              </h5>
                              <p className="text-right mt-2 text-sm sm:text-base">
                                عرض الطلبات{" "}
                              </p>
                            </div>
                          </Card.Body>
                        </Card>
                      </Link>
                    </Col>
                  </div>
                  {userProfile.role === "Broker" ? (
                    <>
                      <div className="box">
                        <Col className="">
                          <Link
                            className="text-decoration-none"
                            to="/BrookersCart"
                          >
                            <Card className="text-center mb-3 p-3 shadow-lg">
                              <Card.Body className="text-end">
                                <i className="fa-solid fa-cart-shopping text-[clamp(24px, 5vw, 30px)] p-2 text-gray-600"></i>
                                <h5 className="card-title font-bold text-base sm:text-lg md:text-xl">
                                  المحفظة
                                </h5>
                                <p className="text-right mt-2 text-sm sm:text-base">
                                  استعرض المحفظه
                                </p>
                              </Card.Body>
                            </Card>
                          </Link>
                        </Col>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="box">
                        <Col className="">
                          <Card className="text-center mb-3 p-3 shadow-lg border border-danger">
                            <Card.Body className="text-end">
                              <i className="fa-solid fa-ban text-[clamp(24px, 5vw, 30px)] p-2 text-red-600"></i>
                              <h5 className="card-title font-bold text-base sm:text-lg md:text-xl">
                                المحفظة
                              </h5>
                              <p className="text-right mt-2 text-sm sm:text-base">
                                غير مسموح باتسعراض المحفظه
                              </p>
                            </Card.Body>
                          </Card>
                        </Col>
                      </div>
                    </>
                  )}
                  <div className="box">
                    <Col className="">
                      <Link className="text-decoration-none" to="/SendOrders">
                        <Card className="text-center mb-3 p-3 shadow-lg">
                          <Card.Body>
                            <div className="position-absolute">
                              <p
                                style={{
                                  fontSize: "clamp(18px, 4vw, 24px)",
                                  fontWeight: "900",
                                  color: "#000",
                                  textAlign: "center",
                                  letterSpacing: "1px",
                                }}
                                className="text-start"
                              >
                                طلب {State.applyOrders}
                              </p>
                            </div>

                            <div className="text-end">
                              <i className="fa-solid fa-envelope-open-text text-[clamp(24px, 5vw, 30px)] p-2 text-[#E31D1D]"></i>
                              <h5 className="card-title font-bold text-base sm:text-lg md:text-xl">
                                العروض المقدمه
                              </h5>
                              <p className="card-text text-right mt-2 text-sm sm:text-base">
                                عرض الطلبات المقدمه
                              </p>
                            </div>
                          </Card.Body>
                        </Card>
                      </Link>
                    </Col>
                  </div>
                </div>
              </Row>
            </>
          ) : (
            <>
              <h1 className="text-lg sm:text-xl md:text-2xl">
                غير مسموح لك بالدخول
              </h1>
            </>
          )}
        </>
      ) : (
        <>
          <h1 className="text-lg sm:text-xl md:text-2xl">غير مسموح بالدخول</h1>
        </>
      )}
      <Toaster />
    </Container>
  );
};

export default Dashboard;
