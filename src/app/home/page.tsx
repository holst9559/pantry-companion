import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RecipeResults from "@/components/recipe/RecipeResults";
import { Ingredient } from "@/utils/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const jwt = cookies().get("JWT-TOKEN")?.value;

  if (!jwt) {
    redirect("/login");
  }
  const ingredients: Ingredient[] = [
    { id: 1, name: "Chicken Breast" },
    { id: 2, name: "Panko" },
    { id: 3, name: "Curry" },
    { id: 4, name: "Tofu" },
    { id: 5, name: "Beef" },
  ];

  return (
    <>
      <Header />
      <RecipeResults ingredients={ingredients} />
      <Footer />
    </>
  );
}
