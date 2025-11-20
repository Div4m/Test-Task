import { db } from "../config/db.js";


export class RoleSeeder{
    
    constructor(){}

    async seedRoles() {
    const roles = ["admin", "user"];

    try {
      for (const roleName of roles) {
        // Check if role exists
        const existing = await db.query(
          "SELECT * FROM roles WHERE role_name = $1",
          [roleName]
        );

        if (existing.rows.length === 0) {
          // Insert new role
          await db.query("INSERT INTO roles (role_name) VALUES ($1)", [roleName]);
          console.log(` Role '${roleName}' added successfully.`);
        } else {
          console.log(` Role '${roleName}' already exists.`);
        }
      }
      return { success: true, message: "All roles seeded successfully!" };
    } catch (err) {
      console.error(" Error seeding roles:", err);
      throw err; // Re-throw error so index.ts can handle it
    }
  }
}