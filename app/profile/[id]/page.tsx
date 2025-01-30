import { getUser } from "@/app/actions";

export const Profile = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const user = await getUser(parseInt(id));
  return (
    <div>
      <div>{`Welcome back ${user?.firstName}`}</div>
      <div>
        <div>{user?.visits}</div>
        <div>Number of visits</div>
      </div>
      {new Date().getDay() === 3 && (
        <div>
          <button>Check in!</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
