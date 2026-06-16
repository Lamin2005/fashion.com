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
import { useProfileQuery } from "@/store/slices/userApi";

function AccountSettings() {
  const { data: userInfo } = useProfileQuery();

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
                  <AvatarImage src={userInfo?.user?.avatar?.image_url} />
                  <AvatarFallback className="text-3xl">JD</AvatarFallback>
                </Avatar>

                <h3 className="mt-5 text-xl font-semibold">
                  {userInfo?.user?.name}
                </h3>

                <p className="text-sm text-gray-500">{userInfo?.user?.email}</p>

                <Button variant="outline" className="mt-6 w-full">
                  Change Profile Photo
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
