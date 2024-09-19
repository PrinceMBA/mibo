// import { neon } from "@neondatabase/serverless";

// const sql = neon(
//   "postgresql://jsm_mibo_owner:gNqVM1awk6Ar@ep-soft-resonance-a2ac2g4b.eu-central-1.aws.neon.tech/jsm_mibo?sslmode=require"
// );

// const posts = await sql("SELECT * FROM posts");

// // See https://neon.tech/docs/serverless/serverless-driver
// // for more information

import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const { name, email, clerkId } = await request.json();

    if (!name || !email || !clerkId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await sql`
      INSERT INTO users (
        name, 
        email, 
        clerk_id
      ) 
      VALUES (
        ${name}, 
        ${email},
        ${clerkId}
     );`;

    return new Response(JSON.stringify({ data: response }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
