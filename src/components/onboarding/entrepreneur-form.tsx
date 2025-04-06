import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export function EntrepreneurForm() {
  const [companyName, setCompanyName] = useState("");
  const [about, setAbout] = useState("");
  const [phone, setPhone] = useState("");
  const [founder_name, setFounderName] = useState("");
  const [revenue, setRevenue] = useState("");
  const [profit, setProfit] = useState("");
  const [funding_history, setFundingHistory] = useState("");
  const [stakeholder_1, setStakeholder1] = useState("");
  const [stakeholder_2, setStakeholder2] = useState("");
  const [logo_file, setLogoFile] = useState<File | null>(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      toast({ title: "Error", description: "User not authenticated." });
      return;
    }

    let logo_url: string | null = null;

    if (logo_file) {
      const fileExt = logo_file.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("logos")
        .upload(filePath, logo_file);

      if (uploadError) {
        toast({
          title: "Logo upload failed",
          description: uploadError.message,
        });
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("logos")
        .getPublicUrl(filePath);

      logo_url = publicUrlData.publicUrl;
    }

    const { error } = await supabase.from("entrepreneur_profiles").insert([
      {
        id: user.id,
        company_name: companyName,
        about,
        phone,
        founder_name,
        revenue,
        profit,
        funding_history,
        stakeholder_1,
        stakeholder_2,
        logo_url,
      },
    ]);

    if (error) {
      toast({
        title: "Error saving profile",
        description: error.message,
      });
    } else {
      toast({
        title: "Profile completed!",
        description: "Your entrepreneur profile has been set up.",
      });
      navigate("/home");
    }
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-6">Entrepreneur's Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Your company name"
            className="bg-muted"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="about">About The Company</Label>
          <Textarea
            id="about"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="A brief description of your company"
            className="bg-muted min-h-[100px]"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone / Socials</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+ 123 456 789"
            className="bg-muted"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="founder_name">Founder</Label>
          <Input
            id="founder_name"
            value={founder_name}
            onChange={(e) => setFounderName(e.target.value)}
            placeholder="Founder name"
            className="bg-muted"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Financials</Label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              placeholder="Revenue"
              className="bg-muted"
            />
            <Input
              value={profit}
              onChange={(e) => setProfit(e.target.value)}
              placeholder="Profit"
              className="bg-muted"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="funding_history">Fund Raising History</Label>
          <Input
            id="funding_history"
            value={funding_history}
            onChange={(e) => setFundingHistory(e.target.value)}
            placeholder="Previous funding rounds"
            className="bg-muted"
          />
        </div>

        <div className="space-y-2">
          <Label>Stakeholders</Label>
          <Input
            value={stakeholder_1}
            onChange={(e) => setStakeholder1(e.target.value)}
            placeholder="Stakeholder 1"
            className="bg-muted mb-2"
          />
          <Input
            value={stakeholder_2}
            onChange={(e) => setStakeholder2(e.target.value)}
            placeholder="Stakeholder 2"
            className="bg-muted"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="logo">Logo</Label>
          <Input
            id="logo"
            type="file"
            accept="image/*"
            className="bg-muted"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setLogoFile(e.target.files[0]);
              }
            }}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-peerbridge-500 hover:bg-peerbridge-600 mt-6"
        >
          Let's Go
        </Button>
      </form>
    </div>
  );
}
