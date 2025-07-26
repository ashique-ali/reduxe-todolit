import { useState } from "react";
import { IoEyeOffOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa6";
import axios from "axios";
import Config from "../../Config/Config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthProvider";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const baseUrl = Config.baseUrl;
    const [showPass, setShowPass] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const TogglePassword = () => {
        setShowPass(!showPass)
    }

    const formChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios({
                url: `${baseUrl}/api/admin/login`,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    ...formData
                }
            })
            const token = data?.data?.token;
            if (token) {
                localStorage.setItem('authToken', token);
            }
            login('/');
            navigate("/list");
        } catch (error) {
            console.error("Error ::>>", error.response?.data || error.message);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: "400px" }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            name="username"
                            value={formData?.username}
                            onChange={formChangeHandler}
                            className="form-control"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <div className="form-group position-relative">
                            <input
                                type={showPass ? "text" : "password"}
                                name="password"
                                value={formData?.password}
                                onChange={formChangeHandler}
                                className="form-control"
                                placeholder="Enter your password"
                                required
                            />
                            <span className="position-absolute" onClick={TogglePassword} style={{ top: "50%", right: "10px", transform: "translateY(-50%)", cursor: "pointer" }}>
                                {showPass ? <FaRegEye /> : <IoEyeOffOutline />}
                            </span>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
                <p className="text-center mt-3">
                    Don't have an account?{" "}
                    <a href="/register" className="text-primary">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
