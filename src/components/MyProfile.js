import { Card, Avatar, TextInput, Button } from "flowbite-react";
import { useState } from "react";

function MyProfile() {
const user = JSON.parse(localStorage.getItem("user"));

const [profile, setProfile] = useState({
name: user?.name || "",
email: user?.email || "",
phone: user?.phone || "",
});

const handleChange = (e) => {
setProfile({
...profile,
[e.target.name]: e.target.value,
});
};

const handleUpdate = () => {
localStorage.setItem(
"user",
JSON.stringify({
...user,
name: profile.name,
email: profile.email,
phone: profile.phone,
})
);


alert("Profile Updated Successfully");
window.location.reload();


};

return ( <div className="ml-64 min-h-screen bg-gray-100 p-6">

  <Card className="mb-6">
    <h1 className="text-3xl font-bold text-[#007979]">
      My Profile
    </h1>

    <p className="text-gray-600 mt-2">
      Manage your profile information.
    </p>
  </Card>

  <Card>

    <div className="flex flex-col items-center">

      <Avatar
        img="/profile.jpg"
        rounded
        size="xl"
      />

      <h2 className="mt-4 text-2xl font-bold text-[#007979]">
        {profile.name}
      </h2>

      <p className="text-gray-500">
        {user?.role}
      </p>

    </div>

    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

      <div>
        <label className="font-semibold">
          Name
        </label>

        <TextInput
          name="name"
          value={profile.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="font-semibold">
          Email
        </label>

        <TextInput
          name="email"
          value={profile.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="font-semibold">
          Phone Number
        </label>

        <TextInput
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          placeholder="Enter Phone Number"
        />
      </div>

      <div>
        <label className="font-semibold">
          Role
        </label>

        <TextInput
          value={user?.role || ""}
          disabled
        />
      </div>

    </div>

    <div className="mt-6">
      <Button
        color="success"
        onClick={handleUpdate}
      >
        Update Profile
      </Button>
    </div>

  </Card>

</div>

);
}

export default MyProfile;