import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./NavBar.css";
import Logo from "../../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";
import { useSafeNavigation } from "../../hooks/useSafeNavigation";
import { Box, Divider, Drawer } from "@mui/material";
import { motion } from "framer-motion";
import { GetDataApi } from "../../store/Slice/GetDataApiReducer";
import { eventEmitter } from "../eventEmitter";
import UserSideBar from "./UserSideBar";
import AdminSideBar from "./AdminSideBar";
import Broker from "./Broker";
import Accountant from "./Accountant";
import Manger from "./Manger";
import CustomerServices from "./CustomerServices";
import NonUserSideBar from "./NonUserSideBar";

const NavBar = () => {
  const dispatch = useDispatch();
  const [userProfile, setuserProfile] = useState(null);
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  let { pathname } = useLocation();
  const { navigate } = useSafeNavigation();
  const [userLink, setUserLink] = useState(null);

  const navigationToLandingpage = async () => {
    let { payload } = await dispatch(GetDataApi());
    setuserProfile(payload);
    let link;
    if (payload !== undefined) {
      switch (payload.role) {
        case "User":
          link = "/LandingPageForUsers";
          break;
        case "Admin":
          link = "/LandingPageAdmin";
          break;
        case "Company":
          link = "/LandingPageForUsers";
          break;
        case "Account":
          link = "/AccountantLandingPage";
          break;
        case "CustomerService":
          link = "/LandingPageCustomeService";
          break;
        case "Broker":
          link = "/BrookersLandingPage";
          break;
        case "Manager":
          link = "/LandingPageManger";
          break;
        case "Saber":
          link = "/LandingPageSaber";
          break;
        default:
          link = null;
      }
      setUserLink(link);
    }
  };

  useEffect(() => {
    if (
      pathname == "/ActiveEmail" ||
      pathname == "/SignUp" ||
      pathname == "/SignUpForCompany" ||
      pathname == "/SignUpForMokhalseen" ||
      pathname == "/SignIn" ||
      pathname == "/IntorSignUp"
    ) {
      return;
    } else {
      navigationToLandingpage();
      // الاستماع للحدث
      eventEmitter.on("dataUpdated", navigationToLandingpage);
      // تنظيف الحدث عند إزالة الكومبوننت
      return () => {
        eventEmitter.off("dataUpdated", navigationToLandingpage);
      };
    }
  }, [pathname]);
  return (
    <>
      <Drawer
        className="position-absolute z-index-99999999999"
        open={open}
        onClose={toggleDrawer(false)}
        anchor="right" // يحدد أن الـ Drawer يظهر من اليمين
      >
        <Box
          id="DrawerList"
          className="drawer-list"
          sx={{
            width: 300,
            backgroundColor: "#f8f9fa",
            height: "100%",
            "& .MuiListItemButton-root": {
              padding: "12px 24px",
              "&:hover": {
                backgroundColor: "#e9ecef",
                borderRadius: "8px",
                margin: "0 8px",
                transition: "all 0.2s ease-in-out",
              },
            },
            "& .MuiListItemText-primary": {
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "#343a40",
            },
            "& .MuiDivider-root": {
              margin: "16px 0",
              backgroundColor: "#dee2e6",
            },
          }}
          role="presentation"
        >
          {userProfile !== null ? (
            <>
              {userProfile?.role === "Admin" ? (
                <>
                  <AdminSideBar />
                </>
              ) : userProfile?.role === "User" ? (
                <>
                  <UserSideBar />
                </>
              ) : userProfile?.role === "Broker" ? (
                <>
                  <Broker />
                </>
              ) : userProfile?.role === "Account" ? (
                <>
                  <Accountant />
                </>
              ) : userProfile?.role === "Manager" ? (
                <>
                  <Manger />
                </>
              ) : userProfile?.role === "CustomerService" ? (
                <>
                  <CustomerServices />
                </>
              ) : userProfile?.role === "Company" ? (
                <>
                  <UserSideBar />
                </>
              ) : (
                <>
                  <NonUserSideBar />
                </>
              )}
            </>
          ) : (
            <></>
          )}

          <Divider />
        </Box>
      </Drawer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2, transition: { duration: 1.7 } }}
        exit={{ opacity: 0 }}
      >
        <header className="navbar-header">
          <div className="navbar-container-new">
            <div className="navbar-content">
              {/* Right: Logo */}
              <Link to="/" className="navbar-logo-link">
                <img src={Logo} alt="تخليص إكسبرو" className="navbar-logo-img" />
              
              </Link>

              {/* Center: Nav links */}
              {userProfile == null ? (
                <>
                  <nav className="navbar-nav-center">
                    <Link className="nav-link-modern active" to="/">
                      الرئيسية
                      <span className="nav-underline"></span>
                    </Link>
                    <Link className="nav-link-modern" to="/about">
                      من نحن
                      <span className="nav-underline"></span>
                    </Link>
                    <Link className="nav-link-modern" to="/services">
                      خدماتنا
                      <span className="nav-underline"></span>
                    </Link>
                    <Link className="nav-link-modern" to="/contact">
                      تواصل معنا
                      <span className="nav-underline"></span>
                    </Link>
                  </nav>
                </>
              ) : (
                <></>
              )}

              {/* Left: Search + CTA + Mobile menu / User menu */}
              <div className="navbar-actions">
                {userProfile == null ? (
                  <>
                    <button className="search-btn" aria-label="البحث">
                      <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.1-4.4a6.75 6.75 0 11-13.5 0 6.75 6.75 0 0113.5 0z" />
                      </svg>
                    </button>
                    
                    <Link to="/SignIn" className="signin-btn">
                      <span>تسجيل الدخول</span>
                    </Link>
                    
                    <Link to="/IntorSignUp" className="cta-btn">
                      <svg className="cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                      </svg>
                      <span>إنشاء حساب</span>
                    </Link>
                    
                    <button 
                      className="mobile-menu-btn" 
                      onClick={toggleDrawer(true)} 
                      aria-label="Toggle menu"
                    >
                      <svg className={`mobile-menu-icon ${open ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="user-actions">
                      <button
                        type="button"
                        onClick={toggleDrawer(true)}
                        className="user-menu-btn"
                      >
                        <i
                          className={`user-menu-icon ${
                            open
                              ? "fa-solid fa-chevron-right"
                              : "fa-solid fa-chevron-down"
                          }`}
                          aria-hidden="true"
                        ></i>
                      </button>

                      <Link to={userLink} className="user-profile-link">
                        {userProfile?.fullName}
                        <i className="fa-solid fa-toolbox user-profile-icon"></i>
                      </Link>

                      <div className="notification-icon">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10.5 4.68727V3.75H13.5V4.68731C16.1369 5.35963 18.0833 7.76335 18.0833 10.6184V15.3158C18.0833 15.7194 18.2193 16.2984 18.3833 16.8298C18.4618 17.0841 18.5405 17.3084 18.5996 17.4689C18.6291 17.5489 18.6534 17.6125 18.6701 17.6553L18.6891 17.7034L18.6936 17.7147L18.6945 17.717L18 18.75H5.99996L5.30542 17.717L5.30632 17.7147L5.31085 17.7034L5.32979 17.6553C5.3465 17.6125 5.37086 17.5489 5.40032 17.4689C5.45941 17.3084 5.53817 17.0841 5.61665 16.8298C5.78067 16.2984 5.91663 15.7194 5.91663 15.3158V10.6184C5.91663 7.76329 7.8631 5.35953 10.5 4.68727ZM12 6C9.47329 6 7.41663 8.06309 7.41663 10.6184V15.3158C7.41663 15.9518 7.22451 16.7031 7.05676 17.25H16.9432C16.7754 16.7031 16.5833 15.9518 16.5833 15.3158V10.6184C16.5833 8.06309 14.5266 6 12 6ZM15 21H9.00004V19.5H15V21Z"
                              fill="#080341"
                            ></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu - keeping your existing mobile menu for consistency */}
          {open && userProfile == null && (
            <div className="mobile-menu">
              <div className="px-4 py-4 space-y-4">
                <Link className="block py-2 text-slate-700 hover:text-emerald-600 transition-colors font-medium" to="/" onClick={toggleDrawer(false)}>
                  الرئيسية
                </Link>
                <Link className="block py-2 text-slate-700 hover:text-emerald-600 transition-colors font-medium" to="/about" onClick={toggleDrawer(false)}>
                  من نحن
                </Link>
                <Link className="block py-2 text-slate-700 hover:text-emerald-600 transition-colors font-medium" to="/services" onClick={toggleDrawer(false)}>
                  خدماتنا
                </Link>
                <Link className="block py-2 text-slate-700 hover:text-emerald-600 transition-colors font-medium" to="/contact" onClick={toggleDrawer(false)}>
                  تواصل معنا
                </Link>
                <div className="pt-2 border-t border-gray-200 space-y-3">
                  <Link 
                    to="/SignIn" 
                    className="inline-flex items-center gap-2 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all w-full justify-center"
                    onClick={toggleDrawer(false)}
                  >
                    <span>تسجيل الدخول</span>
                  </Link>
                  
                  <Link 
                    to="/IntorSignUp" 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md w-full justify-center"
                    onClick={toggleDrawer(false)}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    <span>إنشاء حساب</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </header>
      </motion.div>
    </>
  );
};

export default NavBar;
