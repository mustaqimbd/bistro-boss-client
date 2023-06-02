import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SocialLogin from './Shared/SocialLogin';

const Login = () => {
    const { LoginUser } = useContext(AuthContext)
    const [disable, setDisable] = useState(true);
    const location = useLocation();
    const redirectTo = location.state?.pathname || '/';
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        LoginUser(email, password)
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    title: 'User login Successful!',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
                navigate(redirectTo, { replace: true })
            })
            .catch(e => console.log(e.message))
    }

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleValidateCaptcha = (e) => {
        const captcha = e.target.value;
        console.log(captcha);
        if (validateCaptcha(captcha)) {
            setDisable(false)
        } else {
            console.log('false');
        }
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row md:w-3/4">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control">
                            <LoadCanvasTemplate />
                            <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type above captcha" className="input input-bordered"
                            />

                        </div>
                        <div className="form-control mt-6">
                            <button disabled={false} type='submit' className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <p><small>New to here? Please create an account <Link to='/signup'>Sing up</Link></small></p>
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Login;