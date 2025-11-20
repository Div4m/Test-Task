import { useState } from "react";
import { useParams ,useNavigate } from "react-router-dom";
import { PasswordService } from "../api/passwordReset";
import "../css/password.css";

const PasswordReset = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const passwordService = new PasswordService();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("password do not match");
            return;
        }
        try {
            await passwordService.resetPassword(token as string, newPassword);
            setMessage("Password reset successful");
            navigate("/login");
        } catch (error: any) {
            setMessage(error.message || "Password reset failed");
        }

    }

    return (
        <div className="auth-container">
            <h2>Reset Password</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <button type="submit">Update Password</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default PasswordReset;
