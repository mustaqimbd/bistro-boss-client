import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../Provider/AuthProvider';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SocialLogin from './Shared/SocialLogin';

const SignUp = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const [disable, setDisable] = useState(true);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate()

    const onSubmit = data => {
        console.log('object');
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
                updateUserProfile(data.name, data.photoUrl)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email }
                        fetch('http://localhost:5000/users', {
                            method: "POST",
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data);
                            })
                            .catch(e => console.log(e))
                        reset()
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Sign up success',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate('/')
                    })
                    .catch(e => console.log(e.message))
            })
            .catch(e => {
                console.log(e.message);
            })
    };




    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])
    const captchaRef = useRef();

    const handleValidateCaptcha = () => {
        const captcha = captchaRef.current.value;
        if (validateCaptcha(captcha)) {
            setDisable(false)
        } else {
            console.log('false');
        }
    }

    return (
        <>
            <Helmet>
                <title>Bistro boss | Sing up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse md:w-3/4">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" {...register("name", { required: true, maxLength: 20 })} placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className='text-red-600'>Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" name="photoUrl" {...register("photoUrl", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                                {errors.photoUrl && <span className='text-red-600'>Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                {errors.email && <span className='text-red-600'>Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    // pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])$/
                                })} placeholder="password" className="input input-bordered" />

                                {errors.password?.type === 'minLength' && <p className='text-red-600' role="alert">Password must be at least 6 character!</p> || errors.password?.type === 'required' && <p className='text-red-600' role="alert">Password required</p>
                                    || errors.password?.type === 'pattern' && <p className='text-red-600' role="alert">Password with at least a symbol, upper and lower case letters and a number</p>
                                }
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <LoadCanvasTemplate />
                                <input ref={captchaRef} type="text" name="captcha" placeholder="type above captcha" className="input input-bordered"
                                />
                                <button onClick={handleValidateCaptcha} className="btn btn-outline btn-wide btn-sm mt-5">Validate Captcha</button>
                            </div>
                            <div className="form-control mt-6">
                                <input type='submit' className="btn btn-primary" value="Sign up" />
                            </div>
                        </form>
                        <p><small>Already have an account! Please <Link to='/login'>Log in</Link></small></p>
                        <SocialLogin />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;