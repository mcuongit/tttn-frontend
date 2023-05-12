import { Avatar, Dropdown, Sidebar, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { USER_ROLE, path } from "../../utils/constant";
import { handleLogin } from "../slices/loginSlice";
import { menuAdmin, menuDoctor } from "./menuContant.jsx";
import { saveUser } from "../slices/userSlice";

function LayoutAdmin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userSignedIn = useSelector((state) => state.userAdmin);
    const { userData } = userSignedIn;
    const [isSignedOut, setIsSignedOut] = useState(false);
    const [menuApp, setMenuApp] = useState([]);
    useEffect(() => {
        if (isSignedOut) {
            navigate(path.LOGIN);
        }
    }, [isSignedOut]);

    useEffect(() => {
        if (userSignedIn && userData) {
            switch (userData.roleId) {
                case USER_ROLE.ADMIN:
                    setMenuApp(menuAdmin);
                    break;
                case USER_ROLE.DOCTOR:
                    setMenuApp(menuDoctor);
                    break;
                default:
                    break;
            }
        }
    }, []);

    const handleSignOut = () => {
        dispatch(handleLogin(false));
        dispatch(saveUser({}));
        setIsSignedOut(true);
    };

    return (
        <div>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center gap-x-5">
                        <div className="flex items-center justify-start">
                            <button
                                data-drawer-target="logo-sidebar"
                                data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    />
                                </svg>
                            </button>
                            <Link
                                to="http://localhost:5173/admin"
                                className="flex ml-2 md:mr-24"
                            >
                                <div className="mr-3">
                                    <AdminIcon />
                                </div>
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">
                                    Quản trị
                                </span>
                            </Link>
                        </div>
                        <div className="basis-1/2 lg:basis-1/3">
                            <TextInput
                                id="base"
                                type="search"
                                sizing="md"
                                placeholder="Search"
                            />
                        </div>
                        {userSignedIn && userData && (
                            <div className="grow flex justify-end">
                                <Dropdown
                                    label={
                                        <Avatar
                                            alt="User settings"
                                            img={
                                                userData.image
                                                    ? `${
                                                          import.meta.env
                                                              .VITE_BACKEND_URL
                                                      }/users/avatar/${
                                                          userData.image
                                                      }`
                                                    : ""
                                            }
                                            rounded={true}
                                        />
                                    }
                                    arrowIcon={false}
                                    inline={true}
                                >
                                    <Dropdown.Header>
                                        <span className="block text-sm">
                                            {userData.firstName +
                                                " " +
                                                userData.lastName}
                                        </span>
                                        <span className="block truncate text-sm font-medium">
                                            {userData.email}
                                        </span>
                                    </Dropdown.Header>
                                    <Dropdown.Item>
                                        <Link to={path.ADMIN}>Tổng quan</Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item>Cài đặt</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={handleSignOut}>
                                        Đăng xuất
                                    </Dropdown.Item>
                                </Dropdown>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <aside
                id="logo-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0"
            >
                <div className="w-fit border-r border-gray-200">
                    <Sidebar aria-label="Default sidebar example">
                        <Sidebar.Items>
                            <Sidebar.ItemGroup>
                                {menuApp.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            {item.child ? (
                                                <Sidebar.Collapse
                                                    icon={item.icon}
                                                    label={item.name}
                                                >
                                                    {item.child.map(
                                                        (child, index) => {
                                                            return (
                                                                <Sidebar.Item
                                                                    key={index}
                                                                    as={NavLink}
                                                                    to={
                                                                        child.link
                                                                    }
                                                                    end
                                                                >
                                                                    {child.name}
                                                                </Sidebar.Item>
                                                            );
                                                        }
                                                    )}
                                                </Sidebar.Collapse>
                                            ) : (
                                                <Sidebar.Item
                                                    icon={item.icon}
                                                    as={NavLink}
                                                    to={item.link}
                                                    end
                                                >
                                                    {item.name}
                                                </Sidebar.Item>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </Sidebar.ItemGroup>
                        </Sidebar.Items>
                    </Sidebar>
                </div>
            </aside>
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg mt-14">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

const AdminIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-40 -40 80 80"
            className="h-8 w-8"
        >
            <circle r="39" />
            <path
                fill="#fff"
                d="M0,38a38,38 0 0 1 0,-76a19,19 0 0 1 0,38a19,19 0 0 0 0,38"
            />
            <circle r="5" cy="19" fill="#fff" />
            <circle r="5" cy="-19" />
        </svg>
    );
};

export default LayoutAdmin;
