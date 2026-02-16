import { APIRequest, APIRequestContext, expect } from "@playwright/test";

export async function login(apiContext: APIRequestContext, email: string, password: string) {
    const res = await apiContext.post('/api/auth/login', {
        data: { email, password, remember: true }
    });

    console.log('Login response text', await res.text());
    expect(res.ok()).toBeTruthy();
    return res.json();
}
