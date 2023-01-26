import "./AdminNavbar.css";
import image from "./../../Assets/undraw_icons_wdp4.svg";
import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "../../components/Redux/user-slice";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ArticleIcon from '@mui/icons-material/Article';
import TaskIcon from '@mui/icons-material/Task';

const Navbar2 = (props) => {
    const breadcrumbs = useBreadcrumbs();
    const user = useSelector((state) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const locationName = location.pathname;
    let newLocationName = "";

    let counter = 0;

    for (let i = 0; i < locationName.length; i++) {
        if (locationName[i] === "/") {
            counter++;
        }
        if (counter > 1) {
            // return
        } else {
            newLocationName += locationName[i];
        }
    }

    const [sidebar, setSidebar] = useState(true);

    function showSidebar() {
        setSidebar(!sidebar);
    }

    function closeSidebar() {
        // setSidebar(state => state = false);
    }

    const logout = (e) => {
        e.preventDefault();
        dispatch(userActions.userInfo({}));
        // removeCookies("token");
        navigate("/");
    };
    const [top, setTop] = useState(false);

    const make = (window) => {
        if (window.pageYOffset > 8) setTop(true);
        else setTop(false);
    };

    React.useEffect(() => {
        window.onscroll = () => window.pageYOffset && make(window);

        return () => (window.onscroll = null);
    });

    return (
        <div className="Main">
            <div>
                <nav className={sidebar ? "nav-menu-active1" : "nav-menu"}>
                    <ul className="nav-menu-items">
                        <div className="top">
                            <img src={image} width="50px" alt="logo"></img>
                        </div>
                        <hr className="hr"></hr>
                        <li className="nav-text" title="Jobs">
                            <Link
                                onClick={() => setTop(false)}
                                className={
                                    newLocationName === "/AdminDashboard" || newLocationName === "/AddEvent" || newLocationName === "/Comments" && sidebar === false
                                        ? "flexstartborder"
                                        : sidebar === true && newLocationName === "/AdminDashboard" || newLocationName === "/AddEvent" || newLocationName === "/Comments"
                                            ? "flexcenterborder"
                                            : sidebar === true
                                                ? "flexstart"
                                                : "flexcenter"
                                }
                                to={"/AdminDashboard"}
                            >
                                {/* <i class="bi bi-book"></i> */}
                                <WorkOutlineIcon />
                                {<span>Events</span>}
                            </Link>
                        </li>


                        <li className="nav-text" title="Profile">
                            <Link
                                onClick={() => setTop(false)}
                                className={
                                    location.pathname === "/AdminJobs" || location.pathname === "/CreateJob2" && sidebar === false
                                        ? "flexstartborder"
                                        : sidebar === true && location.pathname === "/AdminJobs" || location.pathname === "/CreateJob2"
                                            ? "flexcenterborder"
                                            : sidebar === true
                                                ? "flexstart"
                                                : "flexcenter"
                                }
                                to={"/AdminJobs"}
                            >
                                {/* <i class="bi bi-person"></i> */}
                                <PermIdentityIcon />
                                {<span>JOBS</span>}
                            </Link>
                        </li>
                        <li className="nav-text" title="Profile">
                            <Link
                                onClick={() => setTop(false)}
                                className={
                                    location.pathname === "/AdminBlogs" && sidebar === false
                                        ? "flexstartborder"
                                        : sidebar === true && location.pathname === "/AdminBlogs"
                                            ? "flexcenterborder"
                                            : sidebar === true
                                                ? "flexstart"
                                                : "flexcenter"
                                }
                                to={"/AdminBlogs"}
                            >
                                {/* <i class="bi bi-person"></i> */}
                                <PermIdentityIcon />
                                {<span>BLOGS</span>}
                            </Link>
                        </li>
                        <li className="nav-text" title="Manage Users">
                            <Link
                                onClick={() => setTop(false)}
                                className={
                                    location.pathname === "/ManageUsers" && sidebar === false
                                        ? "flexstartborder"
                                        : sidebar === true && location.pathname === "/ManageUsers"
                                            ? "flexcenterborder"
                                            : sidebar === true
                                                ? "flexstart"
                                                : "flexcenter"
                                }
                                to={"/ManageUsers"}
                            >
                                {/* <i class="bi bi-person"></i> */}
                                <PermIdentityIcon />
                                {<span>STUDENTS</span>}
                            </Link>
                        </li>
                        <li className="nav-text" title="Logout">
                            <Link
                                onClick={logout}
                                className={
                                    location.pathname === "/" && sidebar === false
                                        ? "flexstartborder"
                                        : sidebar === true && location.pathname === "/"
                                            ? "flexcenterborder"
                                            : sidebar === true
                                                ? "flexstart"
                                                : "flexcenter"
                                }
                                to={"/"}
                            >
                                <LogoutIcon />
                                {<span>Logout</span>}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <main className="main" onClick={closeSidebar}>
                <div className="navbarMain">
                    <div className={top ? "navbar" : "navbar2"}>
                        <div className="helll">
                            {breadcrumbs.map(({ breadcrumb }) => (
                                <div>
                                    {breadcrumb === "Home" && <p>ok</p>}
                                    <span>{breadcrumb} / &nbsp;</span>
                                </div>
                            ))}
                        </div>
                        <div
                            style={{
                                display: "flex",
                                gap: "5px",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {/* <TextField className='anc1' id="outlined-basic" label="Search" variant="outlined" size='small' style={{width:'185px',height:'44px'}}/> */}
                            {/* <PersonIcon className='anc' /> */}
                            {/* <div className="circularportrait">
                <img src={user?.userInfo?.user?.userImg} />
              </div> */}
                            <MenuIcon className='anc1' onClick={showSidebar} />
                            <div title='Logout'>
                                <LogoutIcon className="anc4" onClick={logout} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hamza">{props.children}</div>
            </main>
        </div>
    );
};

export default Navbar2;
