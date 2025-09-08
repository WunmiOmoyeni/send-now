interface TokenResponse {
  access: string;
  refresh: string;
}

export class AuthService {
  private static baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Get CSRF token from cookies
  private static getCookie(name: string): string | undefined {
    if (typeof window === "undefined") return undefined;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()!.split(";").shift();
  }

  // Get tokens from session storage
  static getTokens() {
    if (typeof window === "undefined")
      return { accessToken: null, refreshToken: null };
    return {
      accessToken: sessionStorage.getItem("access_token"),
      refreshToken: sessionStorage.getItem("refresh_token"),
    };
  }

  // Save tokens to session storage
  static saveTokens(access: string, refresh: string) {
    if (typeof window === "undefined") return;
    sessionStorage.setItem("access_token", access);
    sessionStorage.setItem("refresh_token", refresh);
  }

  // Clear tokens from session storage
  static clearTokens() {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
  }

  static async refreshToken(): Promise<TokenResponse | null> {
    const { refreshToken } = this.getTokens();

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    try {
      const csrfToken = this.getCookie("csrfToken");
      const response = await fetch(`${this.baseUrl}/users/auth/refresh-token`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken || "",
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data: TokenResponse = await response.json();

      // Save the new tokens
      this.saveTokens(data.access, data.refresh);

      return data;
    } catch (error) {
      console.error("Error refreshing token:", error);
      // Clear invalid tokens
      this.clearTokens();
      throw error;
    }
  }
}
