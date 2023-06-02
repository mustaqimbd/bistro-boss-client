import { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa'
import { AuthContext } from '../../Provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SocialLogin = () => {
    const { signInWithGoogle } = useContext(AuthContext)
    const location = useLocation();
    const redirectTo = location.state?.pathname || '/';
    const navigate = useNavigate()

    const handleGoogleSingIn = () => {
        signInWithGoogle()
            .then(result => {
                const user = result.user;
                console.log('result.user', result.user);
                const saveUser = { name: user.displayName, email: user.email }
                fetch('http://localhost:5000/users', {
                    method: "POST",
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.insertedId) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Sign up success',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                        if (data.message) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Log in success',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    })
                    .catch(e => console.log(e))
            })
            .catch(e => console.log(e))
    }
    return (
        <div>
            <div className="divider"></div>
            <div className='text-center mb-5'>
                <button onClick={handleGoogleSingIn} className="btn btn-circle btn-outline">
                    <FaGoogle />
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;