import Protected from "@/components/auth/ProtectedRoute";

export default function Profile() {
  return (
    <Protected>
      <div>This is protected route</div>
    </Protected>
  );
}
