import SideNavButton from './SideNavButton';

export default function () {
    return (
        <div className="nav" >
            <ul className="sidenav">
                <SideNavButton title="Companies" icon="fa-solid fa-building" href="/admin/companies" />
                <SideNavButton title="Employees" icon="fa-solid fa-user" href="/admin/employees" />
            </ul>
        </div >
    );
}