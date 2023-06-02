import { FaBook, FaCalendar, FaHome, FaShoppingCart, FaUsers, FaUtensils, FaWallet } from 'react-icons/fa'
import { NavLink, Outlet } from 'react-router-dom';
import './Dashboard.css'
import useCart from '../Hooks/useCart';
import useAdmin from '../Hooks/useAdmin';
const Dashboard = () => {
    const [cart] = useCart();
    //Todo : load data from here for admin 
    // const isAdmin = true;
    const [isAdmin] = useAdmin();
    console.log('dashboard dashboard',isAdmin);
    return (
        <div>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">

                    <Outlet />

                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                </div>
                <div className="drawer-side bg-[#D1A054]">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">
                        {
                            isAdmin ? <>
                                <li ><NavLink to='/dashboard/home'><FaHome /> Admin Home</NavLink></li>
                                <li><NavLink to='/dashboard/reservation'><FaUtensils /> Add Items</NavLink></li>
                                <li ><NavLink to='/dashboard/payment-history'><FaWallet /> Payment History</NavLink></li>
                                <li ><NavLink to='/manage-item'><FaBook /> Manage items</NavLink>
                                </li>
                                <li ><NavLink to='/dashboard/mycart'>Manage Bookings</NavLink>
                                </li>
                                <li ><NavLink to='/dashboard/all-users'> <FaUsers /> All users</NavLink>
                                </li>
                            </>
                                : <>
                                    <li ><NavLink to='/dashboard/home'><FaHome /> User Home</NavLink></li>
                                    <li><NavLink to='/dashboard/reservation'><FaCalendar /> Reservations</NavLink></li>
                                    <li ><NavLink to='/dashboard/payment-history'><FaWallet /> Payment History</NavLink></li>
                                    <li ><NavLink to='/dashboard/mycart'><FaShoppingCart /> My Cart  <span className="badge badge-secondary">{cart?.length || 0}</span></NavLink>
                                    </li>
                                    <div className='divider'></div>
                                    <li ><NavLink to='/'>Home</NavLink></li>
                                    <li ><NavLink to='/menu'>Our menu</NavLink></li>
                                    <li ><NavLink to='/order/'>Order Food</NavLink></li>
                                </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;