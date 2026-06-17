import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useProfileQuery, useUploadMutation } from "@/store/slices/userApi";
import { useRef, useState } from "react";
import { toast } from "sonner";

function AccountSettings() {
  const { data: userInfo, refetch } = useProfileQuery();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [uploadmutation, { isLoading }] = useUploadMutation();
  const ref = useRef<HTMLInputElement>(null);

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result as string);
      }
    };

    reader.readAsDataURL(e.target.files![0]);
  };

  const resetImage = () => {
    setAvatar(null);
    if (ref.current) {
      ref.current.value = "";
    }
  };

  const avatarHandler = async () => {
    try {
      if (!avatar) {
        toast.error("Please Upload Photo...");
        return;
      }
      const res = await uploadmutation({ image_url: avatar }).unwrap();
      resetImage();
      refetch();
      toast.success(`${res.message}`);
    } catch (error) {
      toast.error(`${(error as { data: { message: string } }).data.message}`);
    }
  };

  return (
    <section className="w-full min-h-screen bg-zinc-50 flex items-center justify-center pt-28 pb-16 px-4">
      <div className="w-full max-w-4xl mx-auto">
        <Card className="w-full border border-gray-200 shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-black">
              Account Settings
            </CardTitle>

            <CardDescription className="text-gray-500">
              Update your profile information and password.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <div className="grid lg:grid-cols-[320px_1fr]">
              <div className="border-b lg:border-b-0 lg:border-r border-gray-200 p-8 flex flex-col items-center justify-center">
                <Avatar className="w-32 h-32 border-4 border-gray-200">
                  <AvatarImage
                    src={avatar ? avatar : userInfo?.user?.avatar?.image_url}
                  />
                  <AvatarFallback className="text-3xl text-white bg-blue-400">
                    {userInfo?.user?.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <h3 className="mt-5 text-xl font-semibold">
                  {userInfo?.user?.name}
                </h3>

                <p className="text-sm text-gray-500">{userInfo?.user?.email}</p>

                <Input
                  placeholder=" Change Profile Photo"
                  type="file"
                  className="mt-6 w-full cursor-pointer"
                  onChange={imageHandler}
                  ref={ref}
                />

                <Button
                  className={`w-[80%]  mt-2 ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
                  onClick={avatarHandler}
                  disabled={isLoading}
                >
                  {isLoading ? "Uploading Image" : "Upload Image"}
                </Button>
              </div>

              <div className="p-8 space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-5">
                    Personal Information
                  </h2>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input placeholder="John Doe" className="h-11" />
                    </div>

                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        className="h-11"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-8">
                  <h2 className="text-xl font-semibold mb-5">
                    Change Password
                  </h2>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label>Current Password</Label>
                      <Input type="password" className="h-11" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label>New Password</Label>
                        <Input type="password" className="h-11" />
                      </div>

                      <div className="space-y-2">
                        <Label>Confirm Password</Label>
                        <Input type="password" className="h-11" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-black text-white hover:bg-zinc-800 px-8">
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default AccountSettings;
