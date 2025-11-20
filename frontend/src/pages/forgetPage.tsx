import { useState } from "react";
import { PasswordService } from "../api/passwordReset";


const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const passwordService = new PasswordService();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await passwordService.request(email);
            alert("the email has been sent ")
            setMessage("if email exists, a reset link has been sent.")

        } catch (error: any) {
            alert ("error in sending email");
            setMessage(error.message);

        }
    };

    return (
        <div className="auth-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send Reset Link</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );

}
export default ForgetPassword;