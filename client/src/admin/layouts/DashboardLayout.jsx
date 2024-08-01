import SideNav from '../components/SideNav';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import useAuthStore from '../auth/useAuthStore';

export default function (props) {

    const [viewSidenav, setViewSideNav] = useState(false);
    const { logout } = useAuthStore()
    
    const handleLogout = (e) => {
        logout()
    }

    return (
        <div>

            <div className="container">

                <aside id="sidenav" className={viewSidenav ? 'display-aside' : ''}>

                    <div className="logo-top">
                        <div className="logo">
                            <Link to="/">
                                <div className='logo-text'>Company Listing</div>
                            </Link>
                        </div>
                        <div className="close"><i className="fa-solid fa-close" onClick={() => setViewSideNav(!viewSidenav)}></i></div>
                    </div>

                    <SideNav />

                </aside>

                <main>
                    <div className="topnav">
                        <div className="menu" id="menu" onClick={() => setViewSideNav(!viewSidenav)}><i className="fa-solid fa-bars"></i></div>
                        <div className="item">
                            <div className="link-option" onClick={handleLogout}>Logout</div>
                        </div>
                    </div>
                    <div className="content">
                        {props.children}
                    </div>
                </main>

            </div>
        </div>
    );
}