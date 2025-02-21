import { createClient } from "@/utils/supabase/server";
import { MDXRemote } from "next-mdx-remote/rsc";

const { NEXT_PUBLIC_SUPABASE_URL } = process.env;
export default async function Events() {
  const supabase = await createClient();

  // Fetch events along with the count of registrations
  const { data: events } = await supabase.from("events").select(`
      id,
      name,
      post_image,
      description,
      event_time,
      location,
      created_at,
      registrations:registrations (id)
    `);

  // Calculate the number of registrations for each event
  const eventsWithRegistrations = events?.map((event) => ({
    ...event,
    registrations_count: event.registrations.length,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <pre>{JSON.stringify(eventsWithRegistrations, null, 2)}</pre>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventsWithRegistrations?.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Event Image : https://jupwefectbxpwjickcyu.supabase.co/storage/v1/object/public/blogs//5.jpg */}
            <img
              src={`${NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blogs//${event.post_image}`}
              alt={event.name}
              className="w-full h-48 object-cover"
            />
            {/* Event Details */}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
              {/* <p className="text-gray-600 mb-2">{event.description}</p> */}
              <MDXRemote source={event.description} />
              <p className="text-gray-600 mb-2">
                <strong>Time:</strong>{" "}
                {new Date(event.event_time).toLocaleString()}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Location:</strong> {event.location}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Registrations:</strong> {event.registrations_count}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
