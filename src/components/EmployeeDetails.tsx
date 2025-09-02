import { useParams, Link } from "react-router-dom";
import { useEmployees } from "./useEmployee";

function EmployeeDetails() {
    const { id } = useParams<{ id: string }>();
    const employees = useEmployees();
    const employee = employees.find(emp => emp.id === Number(id));

    if (!employee) {
        return (
            <div className="page-content">
                <div className="container">
                    <div className="empty-state">
                        <h2>Employee Not Found</h2>
                        <p>The employee you're looking for doesn't exist.</p>
                        <Link to="/employees" className="btn-primary">
                            Back to Employees
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-content">
            <div className="container">
                <div className="page-header">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1>Employee Details</h1>
                            <p className="text-muted">View detailed information about {employee.name}</p>
                        </div>
                        <Link to="/employees" className="btn-secondary">
                            ← Back to Employees
                        </Link>
                    </div>
                </div>

                <div className="employee-details">
                    <div className="card">
                        <div className="card-header">
                            <div className="flex items-center gap-4">
                                <div style={{
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "50%",
                                    backgroundColor: "var(--primary-color)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    fontSize: "var(--font-size-xl)",
                                    fontWeight: "600"
                                }}>
                                    {employee.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h2 style={{ margin: 0, color: "var(--gray-900)" }}>
                                        {employee.name}
                                    </h2>
                                    <p style={{ margin: 0, color: "var(--gray-500)" }}>
                                        Employee #{employee.id}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="detail-item">
                                <span className="detail-label">Employee ID</span>
                                <span className="detail-value">#{employee.id}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Full Name</span>
                                <span className="detail-value">{employee.name}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Email Address</span>
                                <span className="detail-value">
                                    <a href={`mailto:${employee.email}`} style={{ color: "var(--primary-color)" }}>
                                        {employee.email}
                                    </a>
                                </span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Department</span>
                                <span className="detail-value">
                                    <span style={{
                                        backgroundColor: "var(--primary-light)",
                                        color: "var(--primary-color)",
                                        padding: "var(--spacing-2) var(--spacing-4)",
                                        borderRadius: "var(--radius-md)",
                                        fontSize: "var(--font-size-sm)",
                                        fontWeight: "500"
                                    }}>
                                        {employee.dep}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="flex gap-4">
                                <a href={`mailto:${employee.email}`} className="btn-primary">
                                    Send Email
                                </a>
                                <Link to="/employees" className="btn-secondary">
                                    View All Employees
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeDetails;