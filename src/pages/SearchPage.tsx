import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { MobileNav } from "@/components/mobile-nav";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvestorCard } from "@/components/dashboard/investor-card";
import { InvestorPreview } from "@/types";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [investors, setInvestors] = useState<InvestorPreview[]>([]);
  const [entrepreneurs, setEntrepreneurs] = useState<InvestorPreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);

      const { data: investorData, error: investorError } = await supabase
        .from("investor_profiles")
        .select("id, full_name, investor_type, preferred_industries");

      const { data: entrepreneurData, error: entrepreneurError } = await supabase
        .from("entrepreneur_profiles")
        .select("id, company_name,founder_name");

      if (investorError || entrepreneurError) {
        console.error("Error fetching data", investorError || entrepreneurError);
        setLoading(false);
        return;
      }

      const formattedInvestors = investorData.map((inv) => ({
        id: inv.id,
        name: inv.full_name,
        investorType: inv.investor_type,
        preferredIndustries: [],
      }));
      console.log("Formatted investors:", formattedInvestors);


      const formattedEntrepreneurs = entrepreneurData.map((ent) => ({
        id: ent.id,
        name: ent.founder_name,
        investorType: ent.company_name,
        preferredIndustries: ent.preferred_industries || [],
      }));

      setInvestors(formattedInvestors);
      setEntrepreneurs(formattedEntrepreneurs);
      setLoading(false);
    };

    fetchProfiles();
  }, []);

  const filterProfiles = (profiles: InvestorPreview[]) => {
    if (!searchQuery) return profiles;

    const query = searchQuery.toLowerCase();
    return profiles.filter((profile) => {
      return (
        profile.name?.toLowerCase().includes(query) ||
        profile.investorType?.toLowerCase().includes(query) ||
        profile.preferredIndustries?.some((ind) => ind.toLowerCase().includes(query))
      );
    });
  };

  const filteredInvestors = filterProfiles(investors);
  const filteredEntrepreneurs = filterProfiles(entrepreneurs);

  return (
    <div className="flex flex-col min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="p-4 bg-peerbridge-500 text-white">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-xl">Search</h1>
          <Button variant="ghost" size="icon" className="text-white">
            <Bell size={20} />
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search by name, industry, or type"
            className="pl-10 bg-white text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">
        <Tabs defaultValue="investors" className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="investors" className="flex-1">Investors</TabsTrigger>
            <TabsTrigger value="entrepreneurs" className="flex-1">Entrepreneurs</TabsTrigger>
          </TabsList>

          <TabsContent value="investors">
            {loading ? (
              <p className="text-center py-8">Loading investors...</p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {filteredInvestors.length > 0 ? (
                  filteredInvestors.map((investor) => (
                    <InvestorCard key={investor.id} investor={investor} />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-muted-foreground">No investors found matching your search.</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="entrepreneurs">
            {loading ? (
              <p className="text-center py-8">Loading entrepreneurs...</p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {filteredEntrepreneurs.length > 0 ? (
                  filteredEntrepreneurs.map((entrepreneur) => (
                    <InvestorCard key={entrepreneur.id} investor={entrepreneur} />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-muted-foreground">No entrepreneurs found matching your search.</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
};

export default SearchPage;
