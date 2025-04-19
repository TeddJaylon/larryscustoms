import { useState } from "react";
import { Card, CardContent } from "@components/ui/card";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@components/ui/tabs";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  const login = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    if (username === "boss" && password === "admin") {
      setUser({ role: "admin", name: "Boss" });
    } else {
      setUser({ role: "employee", name: username });
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <form onSubmit={login} className="bg-white shadow p-6 rounded-xl space-y-4">
          <h1 className="text-xl font-bold">Connexion Garage</h1>
          <Input name="username" placeholder="Nom d'utilisateur" required />
          <Input type="password" name="password" placeholder="Mot de passe" required />
          <Button type="submit">Se connecter</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bienvenue, {user.name}</h1>
      {user.role === "admin" ? <AdminPanel /> : <EmployeePanel name={user.name} />}
    </div>
  );
}

function AdminPanel() {
  return (
    <Tabs defaultValue="employees">
      <TabsList>
        <TabsTrigger value="employees">Employés</TabsTrigger>
        <TabsTrigger value="stats">Statistiques</TabsTrigger>
      </TabsList>

      <TabsContent value="employees">
        <Card className="mt-4">
          <CardContent className="space-y-2 p-4">
            <h2 className="text-xl font-semibold">Suivi des employés</h2>
            <p>Nom: Jean - Customs: 5 - Prime: 150$</p>
            <p>Nom: Léo - Customs: 3 - Prime: 90$</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="stats">
        <Card className="mt-4">
          <CardContent className="space-y-2 p-4">
            <h2 className="text-xl font-semibold">Statistiques globales</h2>
            <p>Total customs: 12</p>
            <p>Revenus: 12000$</p>
            <p>Coût usine: 8000$</p>
            <p>Marge: 4000$</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

function EmployeePanel({ name }) {
  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <h2 className="text-xl font-semibold">Suivi de tes customs, {name}</h2>
        <p>Client: Max - Plaque: LSPD23 - Custom: Full black - Prime: 30$</p>
        <p>Client: Tania - Plaque: D3MON - Custom: Néons roses - Prime: 25$</p>
      </CardContent>
    </Card>
  );
}
