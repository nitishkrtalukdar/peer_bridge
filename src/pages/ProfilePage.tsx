import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { MobileNav } from "@/components/mobile-nav";
import {
  Bell,
  ArrowLeft,
  User,
  Shield,
  Settings,
  HelpCircle,
  LogOut,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkThemeEnabled, setDarkThemeEnabled] = useState(false);
  const [username, setUsername] = useState("Default User");
  const [fullName, setFullName] = useState("Default User");
  const [phone, setPhone] = useState("+91 9999999999");
  const [email, setEmail] = useState("default@email.com");
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState("user");

  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
  
      if (userError || !user) {
        console.error("User fetch error:", userError?.message);
        return;
      }
  
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, full_name, role")
        .eq("id", user.id)
        .single();
  
      if (profileError) {
        console.error("Error fetching profile:", profileError.message);
      } else {
        setUserId(profile.id);
        setFullName(profile.full_name || "Default User");
        setRole(profile.role || "user");
      }
    };
  
    fetchProfile();
  }, []);
  
  

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("isAuthenticated");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const handleUpdateProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };

  if (isEditing) {
    return (
      <div className="flex flex-col min-h-screen bg-background pb-16">
        <header className="p-4 bg-peerbridge-500 text-white flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="text-white mr-2"
            onClick={() => setIsEditing(false)}
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="font-bold text-xl">Edit My Profile</h1>
          <div className="ml-auto">
            <Button variant="ghost" size="icon" className="text-white">
              <Bell size={20} />
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 space-y-6">
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-2">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/default-avatar.png" alt={fullName} />
                <AvatarFallback>
                  {fullName?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-peerbridge-500 hover:bg-peerbridge-600"
              >
                <Camera size={12} />
              </Button>
            </div>
            <h2 className="font-medium">{fullName}</h2>
            <p className="text-xs text-muted-foreground">ID: {userId || "N/A"}</p>
            <p className="text-xs text-muted-foreground">Role: {role}</p>
          </div>

          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Account Settings</h3>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-muted"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Push Notifications</Label>
              <Switch
                id="notifications"
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="darkTheme">Turn Dark Theme</Label>
              <Switch
                id="darkTheme"
                checked={darkThemeEnabled}
                onCheckedChange={setDarkThemeEnabled}
              />
            </div>
          </div>

          <Button
            onClick={handleUpdateProfile}
            className="w-full bg-peerbridge-500 hover:bg-peerbridge-600 mt-4"
          >
            Update Profile
          </Button>
        </main>
        <MobileNav />
      </div>
    );
  }

  // View Mode
  return (
    <div className="flex flex-col min-h-screen bg-background pb-16">
      <header className="p-4 bg-peerbridge-500 text-white flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="text-white mr-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="font-bold text-xl">Profile</h1>
        <div className="ml-auto">
          <Button variant="ghost" size="icon" className="text-white">
            <Bell size={20} />
          </Button>
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="flex flex-col items-center mb-8">
          <Avatar className="h-20 w-20 mb-3">
            <AvatarImage src="/default-avatar.png" alt={fullName} />
            <AvatarFallback>{fullName?.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <h2 className="font-bold text-xl">{fullName}</h2>
          <p className="text-sm text-muted-foreground">ID: {userId || "N/A"}</p>
          <p className="text-sm text-muted-foreground">Role: {role}</p>
        </div>

        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full justify-start text-left p-4 h-auto bg-blue-50"
            onClick={() => setIsEditing(true)}
          >
            <div className="mr-3 p-2 bg-blue-500 rounded-full">
              <User className="h-5 w-5 text-white" />
            </div>
            <span>Edit Profile</span>
          </Button>

          <Button variant="outline" className="w-full justify-start text-left p-4 h-auto bg-blue-50">
            <div className="mr-3 p-2 bg-blue-500 rounded-full">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span>Security</span>
          </Button>

          <Button variant="outline" className="w-full justify-start text-left p-4 h-auto bg-blue-50">
            <div className="mr-3 p-2 bg-blue-500 rounded-full">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <span>Setting</span>
          </Button>

          <Button variant="outline" className="w-full justify-start text-left p-4 h-auto bg-blue-50">
            <div className="mr-3 p-2 bg-blue-500 rounded-full">
              <HelpCircle className="h-5 w-5 text-white" />
            </div>
            <span>Help</span>
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start text-left p-4 h-auto bg-blue-50"
            onClick={handleLogout}
          >
            <div className="mr-3 p-2 bg-blue-500 rounded-full">
              <LogOut className="h-5 w-5 text-white" />
            </div>
            <span>Logout</span>
          </Button>
        </div>
      </main>

      <MobileNav />
    </div>
  );
};

export default ProfilePage;
