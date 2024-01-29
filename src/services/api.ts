import { Ingredient, RegisterCredentials, Recipe } from "@/utils/types";

export async function logIn(email: string, password: string) {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      window.location.replace("/home");
    }
  } catch (error) {
    throw new Error("Could not log in");
  }
}

export async function register(user: RegisterCredentials): Promise<Boolean> {
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(user),
    });

    if (res != null) {
      const payload = await res.json();
      return payload;
    } else {
      throw new Error("User registration failed");
    }
  } catch (error) {
    throw new Error("An error occurred while trying to register");
  }
}

//Currently not working, problem with logic in Spring Boot
export async function getRecipesWithIngredients(ingredients: Ingredient[]) {
  const stringArray: String[] = ingredients.map(
    (ingredient) => ingredient.name
  );

  try {
    const res = await fetch("/api/recipes/search", {
      method: "POST",
      body: JSON.stringify(stringArray),
    });

    if (res != null) {
      const payload = await res.json();
      return payload;
    } else {
      throw new Error("Failed to fetch recipes with ingredients array");
    }
  } catch (error) {
    throw new Error("An error occurred while trying to fetch recipes");
  }
}

export async function getAllRecipes() {
  const res = await fetch("/api/recipes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res != null) {
    const payload = await res.json();
    return payload;
  } else {
    throw new Error("Failed to fetch all recipes");
  }
}

export async function getAllIngredients() {
  const res = await fetch("/api/ingredients", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res != null) {
    const payload = await res.json();
    return payload;
  } else {
    throw new Error("Failed to fetch all recipes");
  }
}

export async function addNewRecipe(recipe: Recipe) {
  try {
    const res = await fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Tpye": "application/json",
      },
      body: JSON.stringify(recipe),
    });

    if (res != null) {
      const payload = await res.json();
      return payload;
    } else {
      throw new Error("Failed to create recipe");
    }
  } catch (error) {
    throw new Error("An error occurred while trying to create recipe");
  }
}

export async function fetchRecipeParams() {
  try {
    const [categoriesRes, dishesRes, dietsRes] = await Promise.all([
      fetch("/api/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      fetch("/api/dishes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      fetch("/api/diets", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    ]);

    if (categoriesRes != null && dishesRes != null && dietsRes != null) {
      const categories = await categoriesRes.json();
      const dishes = await dishesRes.json();
      const diets = await dietsRes.json();

      return {
        categories,
        dishes,
        diets,
      };
    } else {
      throw new Error(
        "Failed to fetch one or more categories, dishes, or diets"
      );
    }
  } catch (error) {
    throw new Error(
      "An error occurred while trying to fetch categories, dishes, and diets"
    );
  }
}

export async function getNewIngredients(req: string) {
  try {
    const res = await fetch("/api/ingredients/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    if (req != null) {
      const data = await res.json();
      return data;
    } else {
      throw new Error("Failed to fetch one or mroe ingredients");
    }
  } catch (error) {
    throw new Error("An error occurred while trying to fetch ingredients");
  }
}
