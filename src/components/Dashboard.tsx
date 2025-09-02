import { useEmployees } from "./useEmployee";

export function Dashboard() {
    const employees = useEmployees();

    return (
        <div className="page-content">
            <div className="container">
                <div className="page-header">
                    <h1>Dashboard</h1>
                    <p className="text-muted">Welcome to the Employee Management System</p>
                </div>
                
                <div className="dashboard-stats">
                    <div className="stat-card">
                        <div className="stat-number">{employees.length}</div>
                        <div className="stat-label">Total Employees</div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-number">
                            {new Set(employees.map(emp => emp.dep)).size}
                        </div>
                        <div className="stat-label">Departments</div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-number">
                            {employees.filter(emp => emp.dep === 'IT').length}
                        </div>
                        <div className="stat-label">IT Employees</div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-number">
                            {employees.filter(emp => emp.dep === 'Finance').length}
                        </div>
                        <div className="stat-label">Finance Employees</div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h3>Quick Overview</h3>
                    </div>
                    <div className="card-body">
                        <p>
                            This dashboard provides an overview of your employee data. 
                            You can view detailed employee information, manage departments, 
                            and track key metrics across your organization.
                        </p>
                        <div className="flex gap-4" style={{ marginTop: "var(--spacing-6)" }}>
                            <a href="/employees" className="btn-primary">
                                View All Employees
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
