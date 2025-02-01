export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm">
      {"success" in message && (
        <div className="text-green-500  px-4 py-2 mx-2 justify-center text-center">
          {message.success}
        </div>
      )}
      {"error" in message && (
        <div className="text-red-500  px-4 py-2 mx-2 justify-center text-center">
          {message.error}
        </div>
      )}
      {"message" in message && (
        <div className="text-gray-500  px-4 py-2 mx-2 justify-center text-center">
          {message.message}
        </div>
      )}
    </div>
  );
}
