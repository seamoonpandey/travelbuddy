const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

type RequestOptions = Omit<RequestInit, "body"> & { body?: unknown };

async function apiRequest<T>(path: string, options: RequestOptions = {}) {
  const { body, headers, ...rest } = options;
  const response = await fetch(`${baseUrl}${path}`, {
    ...rest,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  if (!response.ok) {
    const error = new Error("Request failed");
    (error as Error & { status?: number }).status = response.status;
    throw error;
  }

  return (await response.json()) as T;
}

const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("isLoggedIn") === "true";
};

const auth = {
  login: async (email: string, password: string) => {
    const data = await apiRequest<{ email: string; name?: string }>(
      "/auth/sign_in",
      {
        method: "POST",
        body: { email, password },
      }
    );
    if (typeof window !== "undefined") {
      localStorage.setItem("isLoggedIn", "true");
    }
    return data;
  },

  register: async (userData: {
    email: string;
    password: string;
    name: string;
  }) => {
    const data = await apiRequest<{ email: string; name?: string }>("/auth", {
      method: "POST",
      body: userData,
    });
    if (typeof window !== "undefined") {
      localStorage.setItem("isLoggedIn", "true");
    }
    return data;
  },

  logout: async () => {
    const data = await apiRequest("/auth/sign_out", { method: "DELETE" });
    if (typeof window !== "undefined") {
      localStorage.removeItem("isLoggedIn");
    }
    return data;
  },

  checkAuth: async () => {
    try {
      const data = await apiRequest("/users", { method: "GET" });
      if (typeof window !== "undefined") {
        localStorage.setItem("isLoggedIn", "true");
      }
      return data;
    } catch (error) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("isLoggedIn");
      }
      throw error;
    }
  },
};

const downloadImageFromUrl = async (url: string): Promise<File | null> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const blob = await response.blob();

    let filename = "image.jpg";
    try {
      const urlObj = new URL(url);
      const lastSegment = urlObj.pathname.split("/").pop();
      if (lastSegment) {
        filename = lastSegment;
      }
    } catch {
      filename = "image.jpg";
    }

    return new File([blob], filename, { type: blob.type });
  } catch (error) {
    console.error("Error downloading image:", error);
    return null;
  }
};

export { auth, isAuthenticated, downloadImageFromUrl };
