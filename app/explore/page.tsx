// "use client";

// import { useState, useEffect } from "react";
// import { createClient } from "@/utils/supabase/client";
// import QRCode from "qrcode";
// import { useRouter } from "next/navigation";

// export default function ExplorePage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone_no: "",
//     year: "1st Year",
//     event_id: "9855530c-9af9-453f-945d-ba2d5dc932a6", // Fixed event ID
//   });

//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState(false);
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [userData, setUserData] = useState<any>(null);
//   const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

//   const supabase = createClient();
//   const router = useRouter();

//   useEffect(() => {
//     const checkRegistration = async () => {
//       setFetching(true);
//       const { data: userData, error: userError } =
//         await supabase.auth.getUser();
//       if (userError) {
//         setError(userError.message);
//         setFetching(false);
//         return;
//       }

//       const userId = userData.user?.id;
//       if (!userId) {
//         setError("User not authenticated");
//         setFetching(false);
//         return;
//       }

//       const { data: exploreData, error: exploreError } = await supabase
//         .from("explore")
//         .select("*")
//         .eq("user_id", userId)
//         .single();

//       if (exploreError && exploreError.code !== "PGRST116") {
//         setError(exploreError.message);
//         setFetching(false);
//         return;
//       }

//       if (exploreData) {
//         setIsRegistered(true);
//         setUserData(exploreData);
//         generateQRCode(exploreData.id);
//       }
//       setFetching(false);
//     };

//     checkRegistration();
//   }, []);

//   const generateQRCode = async (exploreId: string) => {
//     try {
//       const url = await QRCode.toDataURL(exploreId);
//       setQrCodeUrl(url);
//     } catch (err) {
//       console.error("Failed to generate QR code:", err);
//     }
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const { data: userData, error: userError } =
//         await supabase.auth.getUser();
//       if (userError) throw userError;

//       const userId = userData.user?.id;
//       if (!userId) throw new Error("User not authenticated");

//       const { data: exploreData, error: exploreError } = await supabase
//         .from("explore")
//         .insert([{ ...formData, user_id: userId }])
//         .select();

//       if (exploreError) throw exploreError;

//       setSuccess(true);
//       setIsRegistered(true);
//       setUserData(exploreData);
//       generateQRCode(exploreData[0].id);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 max-w-lg text-gray-800">
//       <h1 className="text-3xl font-bold text-center mb-6">Explore Form</h1>
//       {isRegistered ? (
//         <div className="bg-green-100 border border-green-400 p-4 rounded-lg shadow-lg text-center">
//           <h2 className="text-xl font-semibold">You are already registered!</h2>
//           <p>
//             <strong>Name:</strong> {userData.name}
//           </p>
//           <p>
//             <strong>Phone:</strong> {userData.phone_no}
//           </p>
//           <p>
//             <strong>Year:</strong> {userData.year}
//           </p>
//           {qrCodeUrl && (
//             <div className="mt-4 flex flex-col items-center">
//               <img
//                 src={qrCodeUrl}
//                 alt="QR Code"
//                 className="w-32 h-32 mb-2"
//               />
//               <button
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 onClick={() => {
//                   const link = document.createElement("a");
//                   link.href = qrCodeUrl;
//                   link.download = "explore.png";
//                   document.body.appendChild(link);
//                   link.click();
//                   document.body.removeChild(link);
//                 }}
//               >
//                 Download QR
//               </button>
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <div className="mb-4">
//             <label className="block text-sm font-medium">Name</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
//               onChange={(e) =>
//                 setFormData({ ...formData, name: e.target.value })
//               }
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium">Phone No</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
//               onChange={(e) =>
//                 setFormData({ ...formData, phone_no: e.target.value })
//               }
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium">Year</label>
//             <select
//               className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
//               onChange={(e) =>
//                 setFormData({ ...formData, year: e.target.value })
//               }
//             >
//               <option>1st Year</option>
//               <option>2nd Year</option>
//               <option>3rd Year</option>
//             </select>
//           </div>
//           <button
//             className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//             onClick={handleSubmit}
//             disabled={loading}
//           >
//             {loading ? "Submitting..." : "Submit"}
//           </button>
//         </div>
//       )}
//       {error && <p className="text-red-500 mt-4">{error}</p>}
//       {success && (
//         <p className="text-green-500 mt-4">Form submitted successfully!</p>
//       )}
//     </div>
//   );
// }

export default function UnderConstruction() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "3rem", color: "#333" }}>Under Construction</h1>
      <p style={{ fontSize: "1.2rem", color: "#555" }}>
        We're working hard to bring you something amazing. Stay tuned!
      </p>
    </div>
  );
}
