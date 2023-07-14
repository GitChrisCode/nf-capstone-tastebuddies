import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import tbLogo from "../data/tbLogo.png"
import {InformationCircleIcon} from "@heroicons/react/20/solid";

function RegisterForm() {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    function navigateToLogin() {
        navigate('/login');
    }

    const handleSubmit = () => {
        console.log("HANDLE RegisterForm SUBMIT!!!: ", userName)

        const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        if (!passwordRegex.test(userPassword)) {
            console.error('Das Passwort erfüllt nicht die Anforderungen.');
            return;
        }

        if (userPassword !== confirmPassword) {
            console.error('Die eingegebenen Passwörter stimmen nicht überein.');
            return;
        }

        axios
            .post(
                '/tb/user/registration',
                undefined,
                {
                    params: {
                        userName: userName,
                        userPassword: userPassword,
                    },
                }
            )
            .then((response) => {
                console.log(response.data);
                navigate('/login');
            })
            .catch((error) => {
                console.error(error);
            });
    };


    return (
            <div className="grid grid-flow-row justify-items-center mb-12">
                <header
                    className="">
                    <img
                        src={tbLogo}
                        className="scale-auto"
                        alt="TasteBuddiesLogo.png"
                    />
                </header>
                <Card
                    color="transparent"
                    shadow={false}
                    className="flex flex-col  ">
                    <div className="">
                        <Typography variant="h4" color="blue-gray" clasName="mb-4">
                            Sign Up
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Enter your details to register.
                        </Typography>
                    </div>
                    <form className="mt-8 mb-2 w-[20rem]" onSubmit={handleSubmit}>
                        <div className="mb-4 flex flex-wrap flex-col gap-6">
                            <Input
                                size="lg"
                                label="User Name"
                                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-800 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                labelProps={{
                                    className: "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-800 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-800 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-800 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                }}
                                value={userName}
                                onChange={(event) => setUserName(event.target.value)}
                                required={true}/>

                            <Input
                                type="password"
                                size="lg"
                                label="Password"
                                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-800 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                labelProps={{
                                    className: "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-800 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-800 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-800 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                }}
                                value={userPassword}
                                onChange={(event) => setUserPassword(event.target.value)}
                                required={true}/>
                            <Typography variant="small" color="gray"
                                        className="flex items-center gap-1 font-normal mt-2">
                                <InformationCircleIcon className="w-4 h-4 -mt-px"/>
                                Use at least 8 characters, a capital letter, and a special character.
                            </Typography>
                            <Input
                                type="password"
                                size="lg"
                                label="Repeat Password"
                                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-800 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                labelProps={{
                                    className: "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-800 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-800 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-800 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                }}
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                required={true}/>
                        </div>
                        <div className="text-center mt-4">
                            <Button
                                type="submit"
                                className="px-4 py-1 text-sm text-Blue-600 font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-800 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-bule-800 focus:ring-offset-2"
                            >
                                Sign Up
                            </Button>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Typography color="gray" className="mt-4 text-center font-normal">
                                Already have an account?{" "}
                                <button
                                    onClick={navigateToLogin}
                                    className="ml-1 text-danger text-blue-700 transition duration-150 ease-in-out hover:text-blue-600 focus:text-blue-600 active:text-blue-700"
                                > Sign In
                                </button>
                            </Typography>
                        </div>
                    </form>
                </Card>
            </div>
    );
}

export default RegisterForm;