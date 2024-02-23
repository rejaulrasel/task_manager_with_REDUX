import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.userSlice);
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-6xl ">{user.name}</h1>
      <h1 className="text-6xl ">{user.email}</h1>
    </div>
  );
};

export default Profile;
