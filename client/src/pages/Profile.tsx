import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useProfileQuery, useUploadMutation } from "@/store/slices/userApi";
import { useRef, useState } from "react";
import { toast } from "sonner";
import EmailUpdateForm from "@/components/profile/EmailUpdateForm";
import NameUpdateForm from "@/components/profile/NameUpdateForm";
import PasswordUpdateForm from "@/components/profile/PasswordUpdateFrom";
import { Link } from "react-router";
import PageSkeleton from "@/components/common/PageSkeleton";
import ForgotPasswordForm from "@/components/profile/ForgotPasswordForm";

function AccountSettings() {
  const { data: userInfo, refetch, isLoading } = useProfileQuery();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [uploadmutation, { isLoading: isMutation }] = useUploadMutation();
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

  if (isLoading) {
    return (
      <>
        <PageSkeleton type="profile" />
      </>
    );
  }

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
                  {isMutation ? "Uploading Image" : "Upload Image"}
                </Button>
              </div>

              <div className="p-8 space-y-8">
                <div>
                  <h2 className="text-xl font-semibold">
                    Personal Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  <div className="space-y-6">
                    <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4 hover:shadow-md transition">
                      <h3 className="text-sm font-medium text-gray-500">
                        Update Name
                      </h3>
                      <NameUpdateForm name={userInfo?.user?.name ?? ""} />
                    </div>

                    <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4 hover:shadow-md transition">
                      <h3 className="text-sm font-medium text-gray-500">
                        Update Email
                      </h3>
                      <EmailUpdateForm email={userInfo?.user?.email ?? ""} />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4 hover:shadow-md transition">
                      <h3 className="text-sm font-medium text-gray-500">
                        Change Password
                      </h3>
                      <PasswordUpdateForm />
                    </div>

                    <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4 hover:shadow-md transition">
                      <h3 className="text-sm font-medium text-gray-500">
                        Forgot Password
                      </h3>
                      <ForgotPasswordForm />
                    </div>

                    <div className="flex justify-end">
                      <Link to="/">
                        <Button className="bg-black cursor-pointer text-white hover:bg-zinc-800 px-8">
                          Back
                        </Button>
                      </Link>
                    </div>
                  </div>
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
