import { Link } from 'react-router-dom';

export default function () {

    
    return (
        <div className="top">
            <div className="logo">
                <Link to="/">
                    <img src="" alt="" />
                    <div className='logo-text'>Company Listing</div>
                </Link>
                <div className="close"><i className="fa-solid fa-close" id="close"></i></div>
            </div>
        </div>
    );
}
