import { useEmployees } from './useEmployee';
import { Link } from "react-router-dom";

export function Employee() {
    const employees = useEmployees();

    return (
        <div className="page-content">
            <div className="container">
                <div className="page-header">
                    <h1>Employees</h1>
                    <p className="text-muted">Manage your organization's employees</p>
                </div>

                <div className="card">
                    <div className="card-header">
                        <div className="flex items-center justify-between">
                            <h3>Employee Directory</h3>
                            <span className="text-muted">{employees.length} employees</span>
                        </div>
                    </div>
                    <div className="card-body" style={{ padding: 0 }}>
                        <div style={{ overflowX: "auto" }}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Department</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((emp) => (
                                        <tr key={emp.id}>
                                            <td>
                                                <span style={{ 
                                                    backgroundColor: "var(--primary-light)", 
                                                    color: "var(--primary-color)",
                                                    padding: "var(--spacing-1) var(--spacing-2)",
                                                    borderRadius: "var(--radius-sm)",
                                                    fontSize: "var(--font-size-xs)",
                                                    fontWeight: "600"
                                                }}>
                                                    #{emp.id}
                                                </span>
                                            </td>
                                            <td>
                                                <div>
                                                    <div style={{ fontWeight: "600", color: "var(--gray-900)" }}>
                                                        {emp.name}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span style={{ color: "var(--gray-600)" }}>
                                                    {emp.email}
                                                </span>
                                            </td>
                                            <td>
                                                <span style={{
                                                    backgroundColor: "var(--gray-100)",
                                                    color: "var(--gray-700)",
                                                    padding: "var(--spacing-1) var(--spacing-3)",
                                                    borderRadius: "var(--radius-md)",
                                                    fontSize: "var(--font-size-sm)",
                                                    fontWeight: "500"
                                                }}>
                                                    {emp.dep}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="employee-actions">
                                                    <Link to={`/employees/${emp.id}`}>
                                                        <button className="btn-primary btn-sm">
                                                            View Details
                                                        </button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}




