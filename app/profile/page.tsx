import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

interface UserDetails {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
}

interface Event {
  id: string;
  name: string;
  event_time: string;
  location: string;
}

interface Registration {
  id: string;
  event_id: string;
  events: Event;
}

export default async function Profile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Fetch user details with type
  const { data: userDetails } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single<UserDetails>();

  // Fetch events with type
  const { data: registrations } = await supabase
    .from("registrations")
    .select(
      `
      id,
      event_id,
      events:event_id (id, name, event_time, location)
    `
    )
    .eq("user_id", user.id)
    .returns<Registration[]>();

  return (
    <div>
      <h1>Profile</h1>
      <div>
        <h2>User Details</h2>
        <p>Name: {userDetails?.name}</p>
        <p>Email: {userDetails?.email}</p>
        <p>Role: {userDetails?.role}</p>
        <img
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile/${userDetails?.image}`}
          className="w-full h-48 object-cover"
          alt="Profile"
        />
      </div>
      <div>
        <h2 className="underline">Registered Events</h2>
        <div>
          <ul>
            {registrations?.map((registration) => (
              <li key={registration.id}>
                <p>Event: {registration.events.name}</p>
                <p>
                  Time:{" "}
                  {new Date(registration.events.event_time).toLocaleString()}
                </p>
                <p>Location: {registration.events.location}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <h2 className="font-bold p-6">This is how we are getting data:</h2>
      <h2>User Details:</h2>
      <pre>{JSON.stringify(userDetails, null, 2)}</pre>
      <h2 className="font-bold p-6">Registrations:</h2>
      <pre>{JSON.stringify(registrations, null, 2)}</pre>
    </div>
  );
}
